import logging
logging.basicConfig(level=logging.INFO)
import os
import random
import smtplib
import ssl
import re
import secrets
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from pathlib import Path

import pymysql
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Query
from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env", override=True)

router = APIRouter(prefix="/api/auth", tags=["auth"])
logger = logging.getLogger(__name__)


class EmailRequest(BaseModel):
    email: EmailStr


class VerifyEmailRequest(BaseModel):
    email: EmailStr
    code: str


class RegisterRequest(BaseModel):
    username: str
    email: EmailStr
    password: str


class LoginRequest(BaseModel):
    username: str
    password: str


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "login-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60
EMAIL_CODE_EXPIRE_MINUTES = 10

#리셋 토큰 추가 5-12일
RESET_TOKEN_EXPIRE_MINUTES = 10

COMMON_MESSAGES = {
    "FOUND_USERNAME": "아이디를 찾았습니다.",
    "FOUND_EMAIL": "이메일을 찾았습니다.",
    "SEND_CODE": "인증코드를 이메일로 발송했습니다.",
    "VERIFIED": "인증이 완료되었습니다.",
    "RESET_PASSWORD": "비밀번호가 재설정되었습니다.",
    "NOT_FOUND": "가입된 계정을 찾을 수 없습니다.",
    "INVALID_EMAIL": "이메일 형식이 올바르지 않습니다.",
    "INVALID_CODE": "인증코드가 올바르지 않습니다.",
    "EXPIRED_CODE": "인증코드가 만료되었습니다.",
    "INVALID_PASSWORD": "새 비밀번호 형식이 올바르지 않습니다.",
    "SERVER_ERROR": "잠시 후 다시 시도해 주세요.",
}

EMAIL_PATTERN = re.compile(r"^[^\s@]+@[^\s@]+\.[^\s@]+$")
PASSWORD_PATTERN = re.compile(r"^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$")

password_reset_tokens = {}


class FindUsernameRequest(BaseModel):
    email: str


class SendFindUsernameCodeRequest(BaseModel):
    email: str


class VerifyFindUsernameCodeRequest(BaseModel):
    email: str
    code: str


class FindEmailRequest(BaseModel):
    username: str


class SendPasswordResetCodeRequest(BaseModel):
    email: str


class VerifyPasswordResetCodeRequest(BaseModel):
    email: str
    code: str


class ResetPasswordRequest(BaseModel):
    email: str
    resetToken: str
    newPassword: str


def validate_email_format(email: str):
    if not EMAIL_PATTERN.match(email):
        raise HTTPException(status_code=400, detail=COMMON_MESSAGES["INVALID_EMAIL"])


def validate_new_password(password: str):
    if not PASSWORD_PATTERN.match(password):
        raise HTTPException(status_code=400, detail=COMMON_MESSAGES["INVALID_PASSWORD"])

    validate_password_length(password)


def mask_username(username: str) -> str:
    length = len(username)

    if length < 3:
        visible_count = 1
    elif length < 5:
        visible_count = 3
    elif length >= 7:
        visible_count = 5
    else:
        visible_count = 3

    return username[:visible_count] + "*" * (length - visible_count)


def mask_email(email: str) -> str:
    local_part, domain = email.split("@", 1)
    return f"{mask_username(local_part)}@{domain}"


def save_recovery_code(cursor, email: str, code: str):
    cursor.execute("SELECT id FROM email_verifications WHERE email = %s", (email,))
    existing = cursor.fetchone()

    if existing:
        cursor.execute(
            """
            UPDATE email_verifications
            SET code = %s,
                verified = 0,
                expires_at = DATE_ADD(NOW(), INTERVAL %s MINUTE),
                updated_at = NOW()
            WHERE email = %s
            """,
            (code, EMAIL_CODE_EXPIRE_MINUTES, email),
        )
    else:
        cursor.execute(
            """
            INSERT INTO email_verifications
                (email, code, verified, expires_at, created_at, updated_at)
            VALUES
                (%s, %s, 0, DATE_ADD(NOW(), INTERVAL %s MINUTE), NOW(), NOW())
            """,
            (email, code, EMAIL_CODE_EXPIRE_MINUTES),
        )


def check_recovery_code(cursor, email: str, code: str):
    cursor.execute(
        """
        SELECT id, code, expires_at
        FROM email_verifications
        WHERE email = %s
        """,
        (email,),
    )
    verification = cursor.fetchone()

    if not verification or verification["code"] != code:
        raise HTTPException(status_code=400, detail=COMMON_MESSAGES["INVALID_CODE"])

    if verification["expires_at"] <= datetime.now():
        raise HTTPException(status_code=400, detail=COMMON_MESSAGES["EXPIRED_CODE"])

    return verification


def get_connection():
    return pymysql.connect(
        host="127.0.0.1",
        user="admin",
        password=os.getenv("Database_Password"),
        port=13306,
        database="vending",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True,
    )


#<< 2026-04-14: SMTP 실제 발송, 요청 이메일 수신 처리, 발송 로그 추가
def send_verification_email(recipient_email: str, code: str):
    smtp_host = os.getenv("SMTP_HOST")
    smtp_port = int(os.getenv("SMTP_PORT", "587"))
    smtp_username = os.getenv("SMTP_USERNAME")
    smtp_password = os.getenv("SMTP_PASSWORD")
    smtp_from_email = os.getenv("SMTP_FROM_EMAIL", smtp_username or "")
    smtp_from_name = os.getenv("SMTP_FROM_NAME", "Web Vending Machine")
    smtp_use_tls = os.getenv("SMTP_USE_TLS", "true").lower() == "true"
    smtp_use_ssl = os.getenv("SMTP_USE_SSL", "false").lower() == "true"

    required = {
        "SMTP_HOST": smtp_host,
        "SMTP_USERNAME": smtp_username,
        "SMTP_PASSWORD": smtp_password,
        "SMTP_FROM_EMAIL": smtp_from_email,
    }
    missing = [key for key, value in required.items() if not value]
    if missing:
        raise HTTPException(
            status_code=500,
            detail="잠시 후 다시 시도해 주세요.",
        )

    message = EmailMessage()
    message["Subject"] = "[Web Vending Machine] 이메일 인증코드"
    message["From"] = f"{smtp_from_name} <{smtp_from_email}>"
    message["To"] = recipient_email
    message.set_content(
        (
            "안녕하세요.\n\n"
            "Web Vending Machine 이메일 인증코드는 아래와 같습니다.\n\n"
            f"인증코드: {code}\n"
            f"유효시간: {EMAIL_CODE_EXPIRE_MINUTES}분\n\n"
            "본인이 요청하지 않았다면 이 메일을 무시해 주세요."
        )
    )

    try:
        logger.info(
            "이메일 인증코드 발송 시도: to=%s from=%s smtp_host=%s port=%s",
            recipient_email,
            smtp_from_email,
            smtp_host,
            smtp_port,
        )
        if smtp_use_ssl:
            with smtplib.SMTP_SSL(
                smtp_host,
                smtp_port,
                context=ssl.create_default_context(),
            ) as server:
                server.login(smtp_username, smtp_password)
                server.send_message(message)
        else:
            with smtplib.SMTP(smtp_host, smtp_port) as server:
                if smtp_use_tls:
                    server.starttls(context=ssl.create_default_context())
                server.login(smtp_username, smtp_password)
                server.send_message(message)
        logger.info(
            "이메일 인증코드 발송 성공: to=%s from=%s",
            recipient_email,
            smtp_from_email,
        )
    except Exception as exc:
        logger.exception(
            "이메일 인증코드 발송 실패: to=%s from=%s",
            recipient_email,
            smtp_from_email,
        )
        raise HTTPException(status_code=500, detail="잠시 후 다시 시도해 주세요.")
#>> 2026-04-14: SMTP 실제 발송, 요청 이메일 수신 처리, 발송 로그 추가


def validate_password_length(password: str):
    if len(password.encode("utf-8")) > 72:
        raise HTTPException(status_code=400, detail="비밀번호는 72바이트 이하로 입력해 주세요.")


def hash_password(password: str) -> str:
    validate_password_length(password)
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    validate_password_length(plain_password)
    try:
        return pwd_context.verify(plain_password, hashed_password)
    except ValueError:
        raise HTTPException(
         status_code=400,
         detail="새 비밀번호 형식이 올바르지 않습니다."
)


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


#<< 2026-04-14: 회원가입 프론트 연동용 아이디 중복 확인 API 추가
@router.get("/check-username")
def check_username(username: str = Query(...)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT user_no FROM users WHERE username = %s", (username,))
        user = cursor.fetchone()
        return {"available": user is None}
    finally:
        conn.close()
#>> 2026-04-14: 회원가입 프론트 연동용 아이디 중복 확인 API 추가


@router.post("/login")
def login(data: LoginRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT * FROM users WHERE username = %s", (data.username,))
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail="아이디가 존재하지 않습니다.")

        if not verify_password(data.password, user["password_hash"]):
            raise HTTPException(status_code=400, detail="비밀번호가 올바르지 않습니다.")

        access_token = create_access_token(
            {"sub": user["username"], "user_no": user["user_no"]}
        )
        return {"access_token": access_token, "token_type": "bearer"}
    finally:
        conn.close()


#<< 2026-04-14: email_verifications 테이블 기준 인증코드 저장 및 이메일 발송 처리로 변경
@router.post("/send-email")
def send_email(data: EmailRequest):
    conn = get_connection()
    code = f"{random.randint(100000, 999999)}"

    try:
        logger.info("인증코드 요청 수신: email=%s", data.email)
        cursor = conn.cursor()
        cursor.execute("SELECT id FROM email_verifications WHERE email = %s", (data.email,))
        existing = cursor.fetchone()

        if existing:
            cursor.execute(
                """
                UPDATE email_verifications
                SET code = %s,
                    verified = 0,
                    expires_at = DATE_ADD(NOW(), INTERVAL %s MINUTE),
                    updated_at = NOW()
                WHERE email = %s
                """,
                (code, EMAIL_CODE_EXPIRE_MINUTES, data.email),
            )
        else:
            cursor.execute(
                """
                INSERT INTO email_verifications (email, code, verified, expires_at, created_at, updated_at)
                VALUES (%s, %s, 0, DATE_ADD(NOW(), INTERVAL %s MINUTE), NOW(), NOW())
                """,
                (data.email, code, EMAIL_CODE_EXPIRE_MINUTES),
            )

        send_verification_email(data.email, code)
        return {"message": "인증 코드를 이메일로 발송했습니다."}
    finally:
        conn.close()
#>> 2026-04-14: email_verifications 테이블 기준 인증코드 저장 및 이메일 발송 처리로 변경


#<< 2026-04-14: 이메일+코드+만료시간 검증 후 verified=1 업데이트 처리
@router.post("/verify-email")
def verify_email(data: VerifyEmailRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id
            FROM email_verifications
            WHERE email = %s
              AND code = %s
              AND expires_at > NOW()
            """,
            (data.email, data.code),
        )
        verification = cursor.fetchone()

        if not verification:
            raise HTTPException(status_code=400, detail="인증 코드가 올바르지 않거나 만료되었습니다.")

        cursor.execute(
            """
            UPDATE email_verifications
            SET verified = 1,
                updated_at = NOW()
            WHERE id = %s
            """,
            (verification["id"],),
        )

        return {"message": "이메일 인증이 완료되었습니다."}
    finally:
        conn.close()
#>> 2026-04-14: 이메일+코드+만료시간 검증 후 verified=1 업데이트 처리


@router.get("/check-email")
def check_email(email: str = Query(...)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT user_no FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()
        return {"available": user is None}
    finally:
        conn.close()


#<< 2026-04-14: 회원가입 시 DB 인증 완료 이메일만 가입 허용하도록 변경
@router.post("/register")
def register(data: RegisterRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            """
            SELECT id
            FROM email_verifications
            WHERE email = %s
              AND verified = 1
              AND expires_at > NOW()
            """,
            (data.email,),
        )
        verification = cursor.fetchone()

        if not verification:
            raise HTTPException(status_code=400, detail="이메일 인증이 필요합니다.")

        cursor.execute("SELECT user_no FROM users WHERE username = %s", (data.username,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="이미 사용 중인 아이디입니다.")

        cursor.execute("SELECT user_no FROM users WHERE email = %s", (data.email,))
        if cursor.fetchone():
            raise HTTPException(status_code=400, detail="이미 가입한 이메일입니다.")

        hashed_password = hash_password(data.password)
        cursor.execute(
            """
            INSERT INTO users (username, email, password_hash, email_verified, role, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
            """,
            (data.username, data.email, hashed_password, 1, "user"),
        )

        cursor.execute(
            """
            UPDATE email_verifications
            SET updated_at = NOW()
            WHERE id = %s
            """,
            (verification["id"],),
        )

        access_token = create_access_token(
            {"sub": data.username, "user_no": cursor.lastrowid}
        )
        return {
            "message": "회원가입이 완료되었습니다.",
            "access_token": access_token,
            "token_type": "bearer",
        }
    finally:
        conn.close()
#>> 2026-04-14: 회원가입 시 DB 인증 완료 이메일만 가입 허용하도록 변경

#api 7개 추가 5-12일
@router.post("/find-username")
def find_username(data: FindUsernameRequest):
    validate_email_format(data.email)
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT username FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        return {
            "message": COMMON_MESSAGES["FOUND_USERNAME"],
            "maskedUsername": mask_username(user["username"]),
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail="잠시 후 다시 시도해 주세요.")
    finally:
        conn.close()


@router.post("/send-find-username-code")
def send_find_username_code(data: SendFindUsernameCodeRequest):
    validate_email_format(data.email)
    conn = get_connection()
    code = f"{random.randint(100000, 999999)}"

    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user_no FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        save_recovery_code(cursor, data.email, code)
        send_verification_email(data.email, code)

        return {"message": "인증코드를 이메일로 발송했습니다."}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()


@router.post("/verify-find-username-code")
def verify_find_username_code(data: VerifyFindUsernameCodeRequest):
    validate_email_format(data.email)
    conn = get_connection()

    try:
        cursor = conn.cursor()

        cursor.execute(
            "SELECT username FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        verification = check_recovery_code(cursor, data.email, data.code)

        cursor.execute(
            """
            UPDATE email_verifications
            SET verified = 0,
                expires_at = NOW(),
                updated_at = NOW()
            WHERE id = %s
            """,
            (verification["id"],),
        )

        return {
            "message": COMMON_MESSAGES["VERIFIED"],
            "username": user["username"],
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()


@router.post("/find-email")
def find_email(data: FindEmailRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT email FROM users WHERE username = %s",
            (data.username,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        return {
            "message": COMMON_MESSAGES["FOUND_EMAIL"],
            "maskedEmail": mask_email(user["email"]),
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()


@router.post("/send-password-reset-code")
def send_password_reset_code(data: SendPasswordResetCodeRequest):
    validate_email_format(data.email)
    conn = get_connection()
    code = f"{random.randint(100000, 999999)}"

    try:
        cursor = conn.cursor()
        cursor.execute(
            "SELECT user_no FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        save_recovery_code(cursor, data.email, code)
        send_verification_email(data.email, code)

        return {"message": COMMON_MESSAGES["SEND_CODE"]}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()


@router.post("/verify-password-reset-code")
def verify_password_reset_code(data: VerifyPasswordResetCodeRequest):
    validate_email_format(data.email)
    conn = get_connection()

    try:
        cursor = conn.cursor()

        cursor.execute(
            "SELECT user_no FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        verification = check_recovery_code(cursor, data.email, data.code)

        reset_token = secrets.token_urlsafe(32)
        password_reset_tokens[reset_token] = {
            "email": data.email,
            "expires_at": datetime.now() + timedelta(minutes=RESET_TOKEN_EXPIRE_MINUTES),
            "used": False,
        }

        cursor.execute(
            """
            UPDATE email_verifications
            SET verified = 0,
                expires_at = NOW(),
                updated_at = NOW()
            WHERE id = %s
            """,
            (verification["id"],),
        )

        return {
            "message": COMMON_MESSAGES["VERIFIED"],
            "resetToken": reset_token,
        }
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()


@router.post("/reset-password")
def reset_password(data: ResetPasswordRequest):
    validate_email_format(data.email)
    validate_new_password(data.newPassword)

    token_info = password_reset_tokens.get(data.resetToken)

    if (
        not token_info
        or token_info["email"] != data.email
        or token_info["used"]
        or token_info["expires_at"] <= datetime.now()
    ):
        raise HTTPException(status_code=400, detail=COMMON_MESSAGES["EXPIRED_CODE"])

    conn = get_connection()

    try:
        cursor = conn.cursor()

        cursor.execute(
            "SELECT user_no FROM users WHERE email = %s",
            (data.email,),
        )
        user = cursor.fetchone()

        if not user:
            raise HTTPException(status_code=400, detail=COMMON_MESSAGES["NOT_FOUND"])

        hashed_password = hash_password(data.newPassword)

        cursor.execute(
            """
            UPDATE users
            SET password_hash = %s,
                updated_at = NOW()
            WHERE email = %s
            """,
            (hashed_password, data.email),
        )

        password_reset_tokens[data.resetToken]["used"] = True

        return {"message": COMMON_MESSAGES["RESET_PASSWORD"]}
    except HTTPException:
        raise
    except Exception:
        raise HTTPException(status_code=500, detail=COMMON_MESSAGES["SERVER_ERROR"])
    finally:
        conn.close()
