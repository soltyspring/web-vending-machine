from ai.schemas import TemplateGenerateRequest


def build_shopping_prompt(payload: TemplateGenerateRequest) -> tuple[str, str]:
    system_prompt = (
        "You are a senior Korean ecommerce creative director and conversion-focused homepage strategist. "
        "Generate a demo-ready shopping homepage concept that visibly changes by mood, business type, and user request. "
        "Prioritize specificity over generic marketing copy: product names, category labels, promo copy, reviews, and colors must feel made for this exact store. "
        "The global shell UI exists, but the generated body and Puck editor data will use your visual theme values. "
        "Return only valid JSON matching the schema. Do not return code, markdown, or explanations."
    )

    mood_label = payload.customMood if payload.mood == "custom" and payload.customMood else payload.mood
    mood_directives = {
        "minimal": "절제된 여백, 흑백/저채도, 또렷한 타이포, 간결한 상품명",
        "luxury": "짙은 배경, 금속감 포인트, 프리미엄 편집숍 톤, 고가 라벨",
        "warm": "따뜻한 크림/코랄/우드 톤, 부드러운 문장, 생활감 있는 상품",
        "trendy": "강한 대비, 선명한 블루/네온 포인트, 짧고 빠른 카피, 스트리트 감성",
        "custom": "사용자가 직접 입력한 분위기를 최우선으로 색/문구/밀도/상품명에 강하게 반영",
    }
    mood_direction = mood_directives.get(payload.mood, mood_directives["custom"])

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
- 사이트 이름, 업종/용도, 한 줄 소개, 분위기, 추가 요청이 모두 첫 화면과 상품 카드에서 눈에 띄게 반영되도록 작성
- 같은 입력에서 분위기만 바꿔도 색, 카피 톤, 상품명, 배지, 레이아웃 밀도가 확연히 달라져야 함
- 데모 시연용으로 "분위기가 바뀌었다"가 즉시 보이도록 theme과 moodKeywords를 과감하게 선택
- heroTitle은 줄바꿈 문자 없이 짧고 강한 제목 한 문장으로 작성
- heroBadge는 사용자의 업종/분위기를 보여주는 짧은 본문 배지 문구
- navItems는 헤더 메뉴가 아니라 본문 큐레이션 탭처럼 보이는 짧은 단어 최대 4개
- marqueeItems는 본문 분위기를 만드는 4개의 짧은 키워드
- productCards는 사용자의 업종에 맞는 실제 상품처럼 6개 작성
- productCards의 상품명, 카테고리, 가격은 서로 겹치지 않게 작성
- reviewCards는 사용자의 쇼핑몰을 실제로 이용한 고객 후기처럼 3개 작성
- bannerTitle과 bannerDescription은 본문 중간 프로모션 배너용으로 강하게 작성
- aboutTitle과 aboutDescription은 브랜드 에디토리얼 영역용으로 작성
- footerDescription은 고정 푸터에 직접 노출하지 않지만, 브랜드 요약 데이터로 자연스럽게 작성
- visualSummary는 이번 결과의 시각 방향을 한국어 한 문장으로 설명
- moodKeywords는 시연 화면에서 보여줄 수 있는 짧은 분위기 키워드 3~5개
- theme은 본문 영역 전용 시각 방향입니다. 헤더/푸터 색상을 바꾸는 값으로 만들지 말 것
- theme 색상은 반드시 HEX 코드로 작성
- theme.primaryColor는 히어로/상품 카드의 가장 강한 색이며 mood와 customRequest에 맞게 과감하게 선택
- theme.secondaryColor는 보조 배경색
- theme.backgroundColor는 프로모션/에디토리얼에 쓰일 진한 무드 색
- theme.surfaceColor는 본문 카드 바탕색
- theme.textColor는 본문에서 읽기 쉬운 텍스트 색
- theme.textColor와 theme.surfaceColor는 반드시 명확히 대비되어야 하며, 비슷한 밝기/채도/색상 계열을 함께 쓰지 말 것
- 어두운 backgroundColor 또는 surfaceColor에는 밝은 textColor를, 밝은 backgroundColor 또는 surfaceColor에는 어두운 textColor를 사용할 것
- 상품 이미지용으로 쓰일 secondaryColor는 surfaceColor와 충분히 달라야 하며, 흰색 도형이 묻힐 정도로 밝은 색만 반복하지 말 것
- primaryColor와 secondaryColor도 너무 유사한 계열로 만들지 말고, 데모 화면에서 서로 구분되어야 함
- theme.heroPattern은 분위기에 맞는 히어로 질감입니다:
  soft-gradient=부드러운 그라데이션, editorial-spotlight=고급 화보 조명, neon-grid=트렌디/테크, paper-cut=따뜻한 수공예, mono-luxury=절제된 럭셔리, pop-block=대담한 블록 컬러
- theme.shapeStyle은 sharp, soft, pill, organic 중 분위기에 맞게 선택
- theme.contrastLevel은 low, medium, high 중 선택
- theme.productImageScale은 분위기에 맞게 small, medium, large 중 하나
- theme.density는 compact, balanced, airy 중 하나
- 분위기 선택 가이드: {mood_direction}
- 결과는 JSON만 반환
"""
    ).strip()

    return system_prompt, user_prompt
