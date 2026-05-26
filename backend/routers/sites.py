import json
from typing import Any

from fastapi import APIRouter, Depends, Header, HTTPException
from jose import JWTError, jwt
from pydantic import BaseModel

from routers.auth import ALGORITHM, SECRET_KEY, get_connection

router = APIRouter(prefix="/api/sites", tags=["sites"])
FREE_GENERATION_LIMIT = 5


class SiteCreateRequest(BaseModel):
    templateType: str
    siteName: str
    aiRequest: dict[str, Any] | None = None
    aiResponse: dict[str, Any] | None = None
    puckData: dict[str, Any] | None = None


class PuckSaveRequest(BaseModel):
    puckData: dict[str, Any]


class SiteRenameRequest(BaseModel):
    siteName: str


def ensure_user_sites_table(cursor):
    cursor.execute(
        """
        CREATE TABLE IF NOT EXISTS user_sites (
            site_id BIGINT AUTO_INCREMENT PRIMARY KEY,
            user_no BIGINT NOT NULL,
            template_type VARCHAR(50) NOT NULL,
            site_name VARCHAR(100) NOT NULL,
            status VARCHAR(30) NOT NULL DEFAULT 'draft',
            ai_request_json JSON NULL,
            ai_response_json JSON NULL,
            puck_data_json JSON NULL,
            created_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
            updated_at DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
            INDEX idx_user_sites_user_no (user_no)
        )
        """
    )


def json_dumps(value):
    if value is None:
        return None
    return json.dumps(value, ensure_ascii=False)


def json_loads(value):
    if value in (None, ""):
        return None
    if isinstance(value, dict):
        return value
    return json.loads(value)


def serialize_site(row):
    return {
        "siteId": row["site_id"],
        "templateType": row["template_type"],
        "siteName": row["site_name"],
        "status": row["status"],
        "aiRequest": json_loads(row.get("ai_request_json")),
        "aiResponse": json_loads(row.get("ai_response_json")),
        "puckData": json_loads(row.get("puck_data_json")),
        "createdAt": row["created_at"].isoformat() if row.get("created_at") else None,
        "updatedAt": row["updated_at"].isoformat() if row.get("updated_at") else None,
    }


def count_user_sites(cursor, user_no: int) -> int:
    cursor.execute("SELECT COUNT(*) AS total FROM user_sites WHERE user_no = %s", (user_no,))
    row = cursor.fetchone()
    return int(row["total"] if row else 0)


def build_usage_meta(total_count: int):
    remaining = max(FREE_GENERATION_LIMIT - total_count, 0)
    return {
        "freeLimit": FREE_GENERATION_LIMIT,
        "usedCount": total_count,
        "remainingCount": remaining,
        "canCreate": remaining > 0,
    }


def get_current_user_no(authorization: str | None = Header(default=None)):
    if not authorization or not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="로그인이 필요합니다.")

    token = authorization.replace("Bearer ", "", 1).strip()

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="로그인이 만료되었습니다.")

    user_no = payload.get("user_no")
    if not user_no:
        raise HTTPException(status_code=401, detail="로그인이 필요합니다.")

    return user_no


@router.post("")
def create_site(payload: SiteCreateRequest, user_no: int = Depends(get_current_user_no)):
    site_name = payload.siteName.strip()
    if not site_name:
        raise HTTPException(status_code=400, detail="템플릿 이름을 입력해 주세요.")

    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        current_count = count_user_sites(cursor, user_no)

        if current_count >= FREE_GENERATION_LIMIT:
            raise HTTPException(
                status_code=403,
                detail=f"무료 생성은 최대 {FREE_GENERATION_LIMIT}회까지 가능합니다.",
            )

        cursor.execute(
            """
            INSERT INTO user_sites
                (user_no, template_type, site_name, ai_request_json, ai_response_json, puck_data_json)
            VALUES
                (%s, %s, %s, %s, %s, %s)
            """,
            (
                user_no,
                payload.templateType,
                site_name,
                json_dumps(payload.aiRequest),
                json_dumps(payload.aiResponse),
                json_dumps(payload.puckData),
            ),
        )
        site_id = cursor.lastrowid

        cursor.execute(
            "SELECT * FROM user_sites WHERE site_id = %s AND user_no = %s",
            (site_id, user_no),
        )
        site = serialize_site(cursor.fetchone())
        site["usage"] = build_usage_meta(current_count + 1)
        return site
    finally:
        conn.close()


@router.get("")
def list_sites(user_no: int = Depends(get_current_user_no)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        cursor.execute(
            """
            SELECT *
            FROM user_sites
            WHERE user_no = %s
            ORDER BY updated_at DESC, site_id DESC
            """,
            (user_no,),
        )
        sites = [serialize_site(row) for row in cursor.fetchall()]
        return {
            "sites": sites,
            "usage": build_usage_meta(len(sites)),
        }
    finally:
        conn.close()


@router.get("/{site_id}")
def get_site(site_id: int, user_no: int = Depends(get_current_user_no)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        cursor.execute(
            "SELECT * FROM user_sites WHERE site_id = %s AND user_no = %s",
            (site_id, user_no),
        )
        site = cursor.fetchone()

        if not site:
            raise HTTPException(status_code=404, detail="저장된 웹페이지를 찾을 수 없습니다.")

        return serialize_site(site)
    finally:
        conn.close()


@router.patch("/{site_id}/name")
def rename_site(
    site_id: int,
    payload: SiteRenameRequest,
    user_no: int = Depends(get_current_user_no),
):
    site_name = payload.siteName.strip()
    if not site_name:
        raise HTTPException(status_code=400, detail="템플릿 이름을 입력해 주세요.")

    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        cursor.execute(
            """
            UPDATE user_sites
            SET site_name = %s,
                updated_at = NOW()
            WHERE site_id = %s
              AND user_no = %s
            """,
            (site_name, site_id, user_no),
        )

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="저장된 웹페이지를 찾을 수 없습니다.")

        cursor.execute(
            "SELECT * FROM user_sites WHERE site_id = %s AND user_no = %s",
            (site_id, user_no),
        )
        return serialize_site(cursor.fetchone())
    finally:
        conn.close()


@router.put("/{site_id}/puck")
def save_puck_data(
    site_id: int,
    payload: PuckSaveRequest,
    user_no: int = Depends(get_current_user_no),
):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        cursor.execute(
            """
            UPDATE user_sites
            SET puck_data_json = %s,
                status = 'editing',
                updated_at = NOW()
            WHERE site_id = %s
              AND user_no = %s
            """,
            (json_dumps(payload.puckData), site_id, user_no),
        )

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="저장된 웹페이지를 찾을 수 없습니다.")

        cursor.execute(
            "SELECT * FROM user_sites WHERE site_id = %s AND user_no = %s",
            (site_id, user_no),
        )
        return serialize_site(cursor.fetchone())
    finally:
        conn.close()


@router.delete("/{site_id}")
def delete_site(site_id: int, user_no: int = Depends(get_current_user_no)):
    conn = get_connection()

    try:
        cursor = conn.cursor()
        ensure_user_sites_table(cursor)
        cursor.execute(
            "DELETE FROM user_sites WHERE site_id = %s AND user_no = %s",
            (site_id, user_no),
        )

        if cursor.rowcount == 0:
            raise HTTPException(status_code=404, detail="저장된 웹페이지를 찾을 수 없습니다.")

        return {"message": "웹페이지가 삭제되었습니다."}
    finally:
        conn.close()
