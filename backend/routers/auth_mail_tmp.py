import os
import random
import smtplib
import ssl
from datetime import datetime, timedelta, timezone
from email.message import EmailMessage
from pathlib import Path

import pymysql
from dotenv import load_dotenv
from fastapi import APIRouter, HTTPException, Query
from jose import jwt
from passlib.context import CryptContext
from pydantic import BaseModel, EmailStr

# 2026-04-13:
# 이메일 인증 상태를 메모리 딕셔너리 대신
# email_verifications 테이블에 저장하도록 변경.
# 2026-04-13:
# 인증코드를 실제 이메일로 발송하도록 SMTP 전송 로직 추가.
BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env")

router = APIRouter(prefix="/api/auth", tags=["auth"])


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
            detail=f"SMTP settings are missing: {', '.join(missing)}",
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
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"이메일 발송에 실패했습니다: {exc}")


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
        raise HTTPException(status_code=400, detail="비밀번호 형식이 올바르지 않습니다.")


def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)


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

        access_token = create_access_token({
            "sub": user["username"],
            "user_no": user["user_no"],
        })

        return {
            "access_token": access_token,
            "token_type": "bearer",
        }
    finally:
        conn.close()


@router.post("/send-email")
def send_email(data: EmailRequest):
    conn = get_connection()
    code = f"{random.randint(100000, 999999)}"

    try:
        cursor = conn.cursor()
        # 2026-04-13:
        # 인증코드 요청 시 이메일별 인증 row를 insert/update 하도록 변경.
        cursor.execute(
            "SELECT id FROM email_verifications WHERE email = %s",
            (data.email,),
        )
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
        return {"message": "인증 코드 발송 완료"}
    finally:
        conn.close()


@router.post("/verify-email")
def verify_email(data: VerifyEmailRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        # 2026-04-13:
        # 이메일 + 코드 + 만료시간을 함께 검증한 뒤 verified 값을 1로 갱신.
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

        return {"message": "인증 완료"}
    finally:
        conn.close()


@router.get("/check-email")
def check_email(email: str = Query(...)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        cursor.execute("SELECT user_no FROM users WHERE email = %s", (email,))
        user = cursor.fetchone()

        if user:
            return {"available": False}

        return {"available": True}
    finally:
        conn.close()


@router.post("/register")
def register(data: RegisterRequest):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        # 2026-04-13:
        # 회원가입 전 email_verifications 테이블에서 인증 완료 여부를 확인.
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
        existing_username = cursor.fetchone()
        if existing_username:
            raise HTTPException(status_code=400, detail="이미 사용 중인 아이디입니다.")

        cursor.execute("SELECT user_no FROM users WHERE email = %s", (data.email,))
        existing_user = cursor.fetchone()
        if existing_user:
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

        access_token = create_access_token({
            "sub": data.username,
            "user_no": cursor.lastrowid,
        })

        return {
            "message": "회원가입이 완료되었습니다.",
            "access_token": access_token,
            "token_type": "bearer",
        }
    finally:
        conn.close()
