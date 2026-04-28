from ai.schemas import TemplateGenerateRequest


def build_shopping_prompt(payload: TemplateGenerateRequest) -> tuple[str, str]:
    system_prompt = (
        "You are a creative ecommerce homepage director. "
        "Create Korean content and body-only visual direction for an existing shopping template. "
        "The global header, search bar, login/signup area, cart area, and footer are fixed shell UI. "
        "Do not write content intended to replace the fixed shell. "
        "Return only valid JSON for the given schema. "
        "Do not return code, markdown, or explanations."
    )

    mood_label = payload.customMood if payload.mood == "custom" and payload.customMood else payload.mood

    user_prompt = (
        f"""
사용자 정보를 바탕으로 쇼핑몰 메인페이지의 본문 콘텐츠를 생성하세요.
헤더/검색/로그인/장바구니/푸터는 고정 템플릿이므로 바꾸지 않습니다.
AI는 히어로, 기획 타일, 상품 카드, 프로모션 배너, 에디토리얼, 후기 영역만 창작합니다.

사이트 이름: {payload.siteName}
업종/용도: {payload.businessType}
한 줄 소개: {payload.tagline}
분위기: {mood_label}
메뉴: {', '.join(payload.menus)}
추가 요청: {payload.customRequest or '없음'}

조건:
- 한국어로 작성
- 쇼핑몰 브랜드처럼 자연스럽게 작성
- 추가 요청 문장을 그대로 복사하지 말 것
- 사이트 이름, 업종/용도, 한 줄 소개, 분위기, 추가 요청이 모두 눈에 띄게 반영되도록 작성
- heroTitle은 줄바꿈 문자 없이 짧고 강한 제목 한 문장으로 작성
- heroBadge는 사용자의 업종/분위기를 보여주는 짧은 본문 배지 문구
- navItems는 헤더 메뉴가 아니라 본문 큐레이션 탭처럼 보이는 짧은 단어 최대 4개
- marqueeItems는 본문 분위기를 만드는 4개의 짧은 키워드
- productCards는 사용자의 업종에 맞는 실제 상품처럼 4개 작성
- productCards의 상품명, 카테고리, 가격은 서로 겹치지 않게 작성
- reviewCards는 사용자의 쇼핑몰을 실제로 이용한 고객 후기처럼 3개 작성
- bannerTitle과 bannerDescription은 본문 중간 프로모션 배너용으로 강하게 작성
- aboutTitle과 aboutDescription은 브랜드 에디토리얼 영역용으로 작성
- footerDescription은 고정 푸터에 직접 노출하지 않지만, 브랜드 요약 데이터로 자연스럽게 작성
- theme은 본문 영역 전용 시각 방향입니다. 헤더/푸터 색상을 바꾸는 값으로 만들지 말 것
- theme 색상은 반드시 HEX 코드로 작성
- theme.primaryColor는 히어로/상품 카드의 가장 강한 색
- theme.secondaryColor는 보조 배경색
- theme.surfaceColor는 본문 카드 바탕색
- theme.textColor는 본문에서 읽기 쉬운 텍스트 색
- theme.productImageScale은 분위기에 맞게 small, medium, large 중 하나
- theme.density는 compact, balanced, airy 중 하나
- 결과는 JSON만 반환
"""
    ).strip()

    return system_prompt, user_prompt
