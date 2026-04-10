from fastapi import APIRouter, HTTPException, Query #라우터와 예외 처리
#APIRouter /api/auth 아래 인증 관련 api를 묶음 http 오류나면 상태코드 메세지 보냄 Quert
#GET /api/auth/check-email 에서 이메일을 쿼리 파라미터로 받을 때 사용한다
from pydantic import BaseModel, EmailStr #이메일 형식 자동 검사
import pymysql #db 연결
import os #.env 파일의 값을 읽음
import random #이메일 인증코드 값 만들때
from dotenv import load_dotenv #.env 파일 로드
from passlib.context import CryptContext #비번 암호화 검증
from jose import jwt # <<< jwt 토큰 만들기
from datetime import datetime, timedelta, timezone #토큰 만료 시간
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent
load_dotenv(BASE_DIR / ".env") #.env 파일 불러오기 os.getenv("~~~~")코드를 위한


router = APIRouter(prefix="/api/auth", tags=["auth"]) # 이 파일 안의 모든 api 앞에 /api/auth 붙임
# router.post("/login") << /api/auth/login이 된다.

#요청 형식 정의
class EmailRequest(BaseModel): #프론트에서 보낸 이메일을 FastAPI가 자동으로 data.email로 꺼낼 수 있음
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

email_codes = {} #이메일 인증코드 저장
verified_emails = {}

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "login-secret-key"
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60

def get_connection():
    conn = pymysql.connect(
        host="127.0.0.1",
        user="admin",
        password=os.getenv("Database_Password"),
        port=13306,
        database="vending",
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )
    return conn

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

        # 1. 아이디(username)로 사용자 조회
        sql = "SELECT * FROM users WHERE username = %s"
        print(f"Executing SQL: {sql} with username={data.username}")
        cursor.execute(sql, (data.username,))
        user = cursor.fetchone()

        # 2. 사용자가 없으면 실패
        if not user:
            raise HTTPException(status_code=400, detail="아이디가 존재하지 않습니다.")

        # 3. 비밀번호가 틀리면 실패
        if not verify_password(data.password, user["password_hash"]):
            raise HTTPException(status_code=400, detail="비밀번호가 틀립니다.")

        # 4. JWT 토큰 생성
        access_token = create_access_token({
            "sub": user["username"],
            "user_no": user["user_no"]
        })

        # 5. 응답 반환
        return {
            "access_token": access_token,
            "token_type": "bearer"
        }

    finally:
        conn.close()
@router.post("/send-email") #실제 주소 /api/auth/send-email
def send_email(data: EmailRequest): #프론트가 보낸 JSON 받음
    code = str(random.randint(100000, 999999))
    email_codes[data.email] = code

    print(f"{data.email} 인증코드: {code}")

    return {"message": "인증 코드 발송 완료"}
@router.post("/verify-email")
def verify_email(data: VerifyEmailRequest):
    stored_code = email_codes.get(data.email)

    if stored_code is None:
        raise HTTPException(status_code=400, detail="인증 코드가 없습니다.")

    if stored_code != data.code:
        raise HTTPException(status_code=400, detail="인증 코드가 일치하지 않습니다.")

    verified_emails[data.email] = True

    return {"message": "인증 완료"}
@router.get("/check-email")
def check_email(email: str = Query(...)):
    conn = get_connection()

    try:
        cursor = conn.cursor()

        sql = "SELECT user_no FROM users WHERE email = %s"
        cursor.execute(sql, (email,))
        user = cursor.fetchone()

        if user:
            return {"available": False}

        return {"available": True}

    finally:
        conn.close()
@router.post("/register")
def register(data: RegisterRequest):
    if not verified_emails.get(data.email):
        raise HTTPException(status_code=400, detail="이메일 인증이 필요합니다.")

    conn = get_connection()

    try:
        cursor = conn.cursor()

        # 1. 아이디 중복 확인
        check_username_sql = "SELECT user_no FROM users WHERE username = %s"
        cursor.execute(check_username_sql, (data.username,))
        existing_username = cursor.fetchone()

        if existing_username:
            raise HTTPException(status_code=400, detail="이미 사용 중인 아이디입니다.")

        # 2. 이메일 중복 확인
        check_sql = "SELECT user_no FROM users WHERE email = %s"
        cursor.execute(check_sql, (data.email,))
        existing_user = cursor.fetchone()

        if existing_user:
            raise HTTPException(status_code=400, detail="이미 가입된 이메일입니다.")

        # 3. 비밀번호 암호화
        hashed_password = hash_password(data.password)

        # 4. 회원 저장
        insert_sql = """
            INSERT INTO users (username, email, password_hash, email_verified, role, created_at, updated_at)
            VALUES (%s, %s, %s, %s, %s, NOW(), NOW())
        """
        cursor.execute(insert_sql, (data.username, data.email, hashed_password, 1, "user"))

        return {"message": "회원가입 완료"}

    finally:
        conn.close()
