from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
from pydantic import BaseModel, Field
import os
import json
from urllib import request, error

load_dotenv()

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def root():
    return {"message": "Vending API Server"}

@app.get("/health")
def health():
    return {"status": "ok"}


class TemplateGenerateRequest(BaseModel):
    templateId: str = Field(default="shopping")
    siteName: str
    businessType: str
    tagline: str
    mood: str
    menus: list[str]
    customRequest: str = ""


class TemplateGenerateResponse(BaseModel):
    brandName: str
    heroBadge: str
    heroTitle: str
    heroDescription: str
    navItems: list[str]
    marqueeItems: list[str]
    featuredEyebrow: str
    featuredTitle: str
    primaryCtaLabel: str
    secondaryCtaLabel: str
    bannerTitle: str
    bannerDescription: str
    aboutTitle: str
    aboutDescription: str
    footerDescription: str
    productCards: list[dict]
    reviewCards: list[dict]


def _build_prompt(payload: TemplateGenerateRequest) -> tuple[str, str]:
    system_prompt = (
        "You create concise Korean marketing copy for a shopping website template. "
        "Your job is to generate content for an existing ecommerce layout, not to create code. "
        "Do not generate HTML, JSX, CSS, markdown, explanations, or extra text. "
        "Return only valid JSON matching the schema. "
        "Keep the writing polished, modern, realistic, and suitable for a real online shopping brand."
    )

    mood_guide = {
        "minimal": "절제되고 세련된 표현을 사용하고, 짧고 깔끔한 문장을 우선하세요.",
        "luxury": "고급스럽고 우아한 어조를 사용하고, 프리미엄 브랜드처럼 보이게 작성하세요.",
        "warm": "부드럽고 따뜻한 표현을 사용하고, 친근하면서 감성적인 분위기를 살리세요.",
        "trendy": "감각적이고 젊은 톤을 사용하고, 세련되고 가벼운 리듬감을 살리세요.",
    }

    selected_mood_guide = mood_guide.get(
        payload.mood,
        "자연스럽고 세련된 쇼핑몰 카피로 작성하세요."
    )

    user_prompt = (
        "사용자 입력을 바탕으로 쇼핑몰 메인페이지 템플릿에 들어갈 문구를 생성하세요.\n\n"
        "[사용자 입력]\n"
        f"- 사이트 이름: {payload.siteName}\n"
        f"- 업종/용도: {payload.businessType}\n"
        f"- 한 줄 소개: {payload.tagline}\n"
        f"- 분위기: {payload.mood}\n"
        f"- 필요한 메뉴: {', '.join(payload.menus)}\n"
        f"- 추가 요청: {payload.customRequest or '없음'}\n\n"
        "[템플릿 설명]\n"
        "- 이 템플릿은 쇼핑몰 랜딩 페이지입니다.\n"
        "- brandName은 상단 로고/브랜드명에 사용됩니다.\n"
        "- heroBadge는 메인 비주얼 위의 짧은 보조 문구입니다.\n"
        "- heroTitle은 첫 화면의 큰 제목입니다.\n"
        "- heroDescription은 첫 화면의 보조 설명입니다.\n"
        "- navItems는 상단 네비게이션 메뉴입니다.\n"
        "- marqueeItems는 중간 흐르는 키워드 문구입니다.\n"
        "- featuredEyebrow와 featuredTitle은 상품 섹션 제목입니다.\n"
        "- primaryCtaLabel과 secondaryCtaLabel은 히어로 버튼 문구입니다.\n"
        "- bannerTitle과 bannerDescription은 중간 프로모션 배너에 사용됩니다.\n"
        "- aboutTitle과 aboutDescription은 브랜드 소개 섹션에 사용됩니다.\n"
        "- footerDescription은 푸터의 짧은 브랜드 소개 문구입니다.\n\n"
        "[분위기 가이드]\n"
        f"- {selected_mood_guide}\n\n"
        "[작성 규칙]\n"
        "- 모든 결과는 한국어로 작성하세요.\n"
        "- 브랜드명은 사이트 이름을 최대한 반영하세요.\n"
        "- navItems는 최대 4개까지만 작성하세요.\n"
        "- 메뉴명은 짧고 직관적으로 작성하세요.\n"
        "- heroTitle은 2~3줄로 자연스럽게 나눌 수 있는 짧은 문구로 작성하세요.\n"
        "- heroDescription은 1~2문장 길이로 작성하세요.\n"
        "- bannerTitle은 짧고 강한 프로모션 문구로 작성하세요.\n"
        "- aboutTitle은 브랜드 정체성이 느껴지게 작성하세요.\n"
        "- aboutDescription은 2~3문장 이내로 작성하세요.\n"
        "- footerDescription은 짧고 요약된 한두 줄 문구로 작성하세요.\n"
        "- marqueeItems는 4개를 작성하고, 각 문구는 2단어 이내로 짧게 작성하세요.\n"
        "- featuredTitle은 쇼핑몰 느낌이 나게 자연스럽게 작성하세요.\n"
        "- primaryCtaLabel과 secondaryCtaLabel은 버튼용으로 짧게 작성하세요.\n"
        "- productCards는 정확히 4개 작성하세요.\n"
        "- 각 productCards 항목은 category, name, priceLabel, badge를 포함하세요.\n"
        "- priceLabel은 예: 89,000원 형식으로 작성하세요.\n"
        "- badge는 NEW, BEST, 또는 빈 문자열만 사용하세요.\n"
        "- reviewCards는 정확히 3개 작성하세요.\n"
        "- 각 reviewCards 항목은 name, role, text를 포함하세요.\n"
        "- 후기 문구도 업종과 브랜드 톤에 맞게 자연스럽게 작성하세요.\n"
        "- 사용자의 추가 요청이 있으면 가능한 범위에서 반영하세요.\n"
        "- 사용자의 추가 요청 문장을 화면 문구로 직접 복사하거나 요약해서 쓰지 마세요.\n"
        "- 추가 요청은 내부 방향 지시로만 사용하고, 결과 문구는 실제 쇼핑몰 브랜드 카피처럼 자연스럽게 작성하세요.\n"
        "- heroBadge, heroTitle, bannerTitle에는 작업 지시형 표현을 쓰지 마세요.\n"
        "- '집중', '강조', '반영', '요청', '리뷰 중심', '베스트셀러 중심' 같은 표현은 사용자 노출 문구에 쓰지 마세요.\n"
        "- 코드, 설명, 따옴표 바깥 텍스트 없이 JSON만 반환하세요.\n"
    )
    return system_prompt, user_prompt


def _call_openai(payload: TemplateGenerateRequest) -> TemplateGenerateResponse:
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=500, detail="OPENAI_API_KEY is not configured.")

    system_prompt, user_prompt = _build_prompt(payload)
    schema = {
        "name": "shopping_template_content",
        "strict": True,
        "schema": {
            "type": "object",
            "additionalProperties": False,
            "properties": {
                "brandName": {"type": "string"},
                "heroBadge": {"type": "string"},
                "heroTitle": {"type": "string"},
                "heroDescription": {"type": "string"},
                "navItems": {
                    "type": "array",
                    "items": {"type": "string"},
                    "minItems": 1,
                    "maxItems": 4,
                },
                "marqueeItems": {
                    "type": "array",
                    "items": {"type": "string"},
                    "minItems": 4,
                    "maxItems": 4,
                },
                "featuredEyebrow": {"type": "string"},
                "featuredTitle": {"type": "string"},
                "primaryCtaLabel": {"type": "string"},
                "secondaryCtaLabel": {"type": "string"},
                "bannerTitle": {"type": "string"},
                "bannerDescription": {"type": "string"},
                "aboutTitle": {"type": "string"},
                "aboutDescription": {"type": "string"},
                "footerDescription": {"type": "string"},
                "productCards": {
                    "type": "array",
                    "minItems": 4,
                    "maxItems": 4,
                    "items": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "category": {"type": "string"},
                            "name": {"type": "string"},
                            "priceLabel": {"type": "string"},
                            "badge": {"type": "string"},
                        },
                        "required": ["category", "name", "priceLabel", "badge"],
                    },
                },
                "reviewCards": {
                    "type": "array",
                    "minItems": 3,
                    "maxItems": 3,
                    "items": {
                        "type": "object",
                        "additionalProperties": False,
                        "properties": {
                            "name": {"type": "string"},
                            "role": {"type": "string"},
                            "text": {"type": "string"},
                        },
                        "required": ["name", "role", "text"],
                    },
                },
            },
            "required": [
                "brandName",
                "heroBadge",
                "heroTitle",
                "heroDescription",
                "navItems",
                "marqueeItems",
                "featuredEyebrow",
                "featuredTitle",
                "primaryCtaLabel",
                "secondaryCtaLabel",
                "bannerTitle",
                "bannerDescription",
                "aboutTitle",
                "aboutDescription",
                "footerDescription",
                "productCards",
                "reviewCards",
            ],
        },
    }

    request_body = {
        "model": "gpt-4.1-mini",
        "messages": [
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt},
        ],
        "response_format": {
            "type": "json_schema",
            "json_schema": schema,
        },
    }

    req = request.Request(
        "https://api.openai.com/v1/chat/completions",
        data=json.dumps(request_body).encode("utf-8"),
        headers={
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
        },
        method="POST",
    )

    try:
        with request.urlopen(req, timeout=60) as response:
            raw = json.loads(response.read().decode("utf-8"))
    except error.HTTPError as exc:
        detail = exc.read().decode("utf-8", errors="ignore")
        raise HTTPException(status_code=502, detail=f"OpenAI request failed: {detail}")
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"OpenAI request failed: {exc}")

    try:
        content = raw["choices"][0]["message"]["content"]
        parsed = json.loads(content)
        return TemplateGenerateResponse(**parsed)
    except Exception as exc:
        raise HTTPException(status_code=502, detail=f"Failed to parse OpenAI response: {exc}")


@app.post("/generate-template", response_model=TemplateGenerateResponse)
def generate_template(payload: TemplateGenerateRequest):
    return _call_openai(payload)
