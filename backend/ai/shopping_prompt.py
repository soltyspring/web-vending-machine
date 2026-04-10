from ai.schemas import TemplateGenerateRequest


def build_shopping_prompt(payload: TemplateGenerateRequest) -> tuple[str, str]:
    system_prompt = (
        "You write concise Korean copy for an ecommerce landing page. "
        "Return only valid JSON for the given schema. "
        "Do not return code or explanations."
    )

    user_prompt = (
        f"""
사용자 정보를 바탕으로 쇼핑몰 메인페이지용 콘텐츠를 생성하세요.

사이트 이름: {payload.siteName}
업종/용도: {payload.businessType}
한 줄 소개: {payload.tagline}
분위기: {payload.mood}
메뉴: {', '.join(payload.menus)}
추가 요청: {payload.customRequest or '없음'}

조건:
- 한국어로 작성
- 쇼핑몰 브랜드처럼 자연스럽게 작성
- 추가 요청 문장을 그대로 복사하지 말 것
- heroTitle은 줄바꿈 문자 없이 짧고 강한 제목 한 문장으로 작성
- navItems는 최대 4개
- productCards는 4개
- reviewCards는 3개
- 결과는 JSON만 반환
"""
    ).strip()

    return system_prompt, user_prompt
