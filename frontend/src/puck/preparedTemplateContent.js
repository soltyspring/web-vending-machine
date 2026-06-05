const templateBase = {
  business: {
    templateType: "business",
    brandName: "Volt.X",
    category: "비즈니스 홍보",
    previewLabel: "Business Template",
    setupEyebrow: "Business Setup",
    setupTitle: "회사와 서비스에 맞춰 홍보 페이지를 구성하세요",
    setupDescription: "업종, 핵심 강점, 고객 유형을 반영해 비즈니스 랜딩 구조를 저장합니다.",
    setupSubmitLabel: "비즈니스 초안 만들기",
    siteNameLabel: "회사 / 서비스명",
    siteNamePlaceholder: "예: Volt.X",
    typeLabel: "업종",
    typeOptions: [
      { value: "saas", label: "SaaS / IT 서비스" },
      { value: "agency", label: "브랜딩 / 마케팅 에이전시" },
      { value: "consulting", label: "컨설팅 / 전문 서비스" },
      { value: "startup", label: "스타트업 / 투자 홍보" },
    ],
    goalsLabel: "강조할 강점",
    goals: ["전문성", "성과 지표", "도입 문의", "고객 사례", "빠른 상담"],
    audienceLabel: "주요 고객",
    audiencePlaceholder: "예: B2B 의사결정자와 실무 리더",
    scheduleLabel: "대표 제안",
    schedulePlaceholder: "예: 2주 안에 진단 리포트 제공",
    moodLabel: "표현 톤",
    moodOptions: [
      { value: "sharp", label: "Sharp · 선명한" },
      { value: "trust", label: "Trust · 신뢰감 있는" },
      { value: "bold", label: "Bold · 강한" },
    ],
    colors: {
      background: "#f7f7f2",
      surface: "#ffffff",
      ink: "#151515",
      muted: "#62635f",
      primary: "#ff4d2e",
      secondary: "#111111",
      accent: "#ffd166",
    },
    navItems: ["홈", "서비스", "성과", "문의"],
    heroTitle: "브랜드의 다음 성장을 만드는 실행형 파트너",
    heroDescription: "Volt.X는 전략, 디자인, 운영을 하나의 흐름으로 묶어 고객이 이해하기 쉬운 비즈니스 페이지를 완성합니다.",
    primaryCta: "상담 시작하기",
    secondaryCta: "성과 보기",
    stats: [
      { label: "Launch", value: "14D" },
      { label: "Projects", value: "120+" },
      { label: "Growth", value: "3.8x" },
    ],
    features: [
      { title: "서비스 포지셔닝", description: "무엇을 제공하는지 첫 화면에서 바로 이해되도록 메시지와 구조를 정리합니다." },
      { title: "성과 중심 섹션", description: "숫자, 사례, 프로세스를 함께 보여줘 문의 전환의 근거를 만듭니다." },
      { title: "문의 흐름", description: "고객이 다음 행동을 망설이지 않도록 상담 CTA와 연락 정보를 고정합니다." },
    ],
    packages: [
      { title: "Starter", price: "₩1.9M", description: "서비스 소개와 문의 중심의 기본 홍보 페이지" },
      { title: "Growth", price: "₩4.8M", description: "고객 사례, 성과 지표, 전환 CTA까지 포함" },
      { title: "Scale", price: "Custom", description: "다중 서비스와 채용/IR 섹션까지 확장" },
    ],
    process: ["진단", "메시지 설계", "페이지 구성", "문의 전환 최적화"],
    subpages: {
      홈: {
        title: "첫 화면에서 신뢰를 만드는 구조",
        description: "강점, 수치, 핵심 CTA가 한 화면에서 이어지는 비즈니스 랜딩입니다.",
      },
      서비스: {
        title: "서비스를 명확하게 비교합니다",
        description: "패키지와 업무 범위를 나란히 보여줘 고객이 빠르게 선택하게 돕습니다.",
      },
      성과: {
        title: "성과 지표와 사례를 전면에 둡니다",
        description: "도입 전후 변화, 고객 후기, 주요 지표를 편집 가능한 블록으로 제공합니다.",
      },
      문의: {
        title: "문의 전환을 마지막까지 유지합니다",
        description: "상담 안내, 예상 일정, 연락 정보를 하단 CTA와 함께 제공합니다.",
      },
    },
  },
  reservation: {
    templateType: "reservation",
    brandName: "Stayline",
    category: "예약 · 숙박",
    previewLabel: "Reservation Template",
    setupEyebrow: "Reservation Setup",
    setupTitle: "공간과 예약 흐름에 맞춰 숙박 페이지를 구성하세요",
    setupDescription: "객실 유형, 예약 혜택, 고객층을 반영해 예약형 웹사이트 초안을 저장합니다.",
    setupSubmitLabel: "예약 초안 만들기",
    siteNameLabel: "숙소 / 공간명",
    siteNamePlaceholder: "예: Stayline",
    typeLabel: "공간 유형",
    typeOptions: [
      { value: "hotel", label: "호텔 / 리조트" },
      { value: "stay", label: "스테이 / 펜션" },
      { value: "rental", label: "공간 대여" },
      { value: "wellness", label: "웰니스 / 글램핑" },
    ],
    goalsLabel: "강조할 예약 포인트",
    goals: ["실시간 예약", "객실 비교", "패키지 혜택", "주변 여행", "문의 응대"],
    audienceLabel: "주요 방문객",
    audiencePlaceholder: "예: 주말 휴식을 찾는 커플과 가족",
    scheduleLabel: "예약 혜택",
    schedulePlaceholder: "예: 평일 2박 예약 시 조식 제공",
    moodLabel: "공간 무드",
    moodOptions: [
      { value: "calm", label: "Calm · 편안한" },
      { value: "premium", label: "Premium · 고급스러운" },
      { value: "nature", label: "Nature · 자연스러운" },
    ],
    colors: {
      background: "#f5f1ea",
      surface: "#fffaf3",
      ink: "#1e2421",
      muted: "#68736d",
      primary: "#2f6f67",
      secondary: "#d8c6a5",
      accent: "#f0a45d",
    },
    navItems: ["홈", "객실", "예약", "오시는 길"],
    heroTitle: "머무는 순간이 여행이 되는 예약 페이지",
    heroDescription: "Stayline은 객실, 혜택, 예약 안내를 한 흐름으로 묶어 방문자가 빠르게 날짜와 공간을 선택하게 돕습니다.",
    primaryCta: "예약 문의하기",
    secondaryCta: "객실 보기",
    stats: [
      { label: "Rooms", value: "12" },
      { label: "Check-in", value: "15:00" },
      { label: "Rating", value: "4.9" },
    ],
    features: [
      { title: "객실 카드", description: "객실 유형, 가격, 핵심 편의시설을 편집 가능한 카드로 제공합니다." },
      { title: "예약 안내", description: "체크인, 환불, 혜택을 예약 전에 확인할 수 있게 정리합니다." },
      { title: "위치 정보", description: "주변 명소와 이동 안내를 한 페이지 안에서 자연스럽게 연결합니다." },
    ],
    packages: [
      { title: "Standard Stay", price: "₩180K", description: "기본 객실과 조식 옵션을 포함한 데일리 예약" },
      { title: "Family Suite", price: "₩320K", description: "가족 여행객을 위한 넓은 객실과 키즈 어메니티" },
      { title: "Private Package", price: "₩490K", description: "프라이빗 스파와 레이트 체크아웃 포함" },
    ],
    process: ["날짜 선택", "객실 비교", "예약 문의", "체크인 안내"],
    subpages: {
      홈: {
        title: "공간의 분위기를 첫 화면에서 보여줍니다",
        description: "숙소의 무드, 대표 혜택, 예약 CTA가 자연스럽게 이어집니다.",
      },
      객실: {
        title: "객실별 장점과 가격을 비교합니다",
        description: "대표 객실, 편의시설, 패키지 구성을 카드형으로 제공합니다.",
      },
      예약: {
        title: "예약 전 필요한 정보를 줄입니다",
        description: "혜택, 체크인 시간, 문의 흐름을 명확히 보여줍니다.",
      },
      "오시는 길": {
        title: "방문 전 위치와 주변 경험을 안내합니다",
        description: "교통, 주차, 주변 여행 코스를 함께 구성할 수 있습니다.",
      },
    },
  },
  blog: {
    templateType: "blog",
    brandName: "ZIGULAB",
    category: "블로그 · 미디어",
    previewLabel: "Blog Template",
    setupEyebrow: "Media Setup",
    setupTitle: "콘텐츠 주제와 독자에 맞춰 미디어 페이지를 구성하세요",
    setupDescription: "발행 주제, 독자층, 콘텐츠 목표를 반영해 블로그형 웹사이트를 저장합니다.",
    setupSubmitLabel: "미디어 초안 만들기",
    siteNameLabel: "블로그 / 매거진명",
    siteNamePlaceholder: "예: ZIGULAB",
    typeLabel: "콘텐츠 유형",
    typeOptions: [
      { value: "magazine", label: "브랜드 매거진" },
      { value: "personal", label: "개인 블로그" },
      { value: "newsletter", label: "뉴스레터 허브" },
      { value: "knowledge", label: "지식 아카이브" },
    ],
    goalsLabel: "강조할 콘텐츠 목표",
    goals: ["구독 전환", "추천 글", "카테고리 탐색", "작성자 브랜딩", "아카이브"],
    audienceLabel: "주요 독자",
    audiencePlaceholder: "예: 디자인과 기술 트렌드를 읽는 실무자",
    scheduleLabel: "발행 주기",
    schedulePlaceholder: "예: 매주 화요일 인사이트 발행",
    moodLabel: "콘텐츠 톤",
    moodOptions: [
      { value: "editorial", label: "Editorial · 잡지 같은" },
      { value: "clean", label: "Clean · 읽기 쉬운" },
      { value: "playful", label: "Playful · 생동감 있는" },
    ],
    colors: {
      background: "#f3f7df",
      surface: "#ffffff",
      ink: "#182012",
      muted: "#65705d",
      primary: "#b8f331",
      secondary: "#101510",
      accent: "#ff6b35",
    },
    navItems: ["홈", "글", "토픽", "구독"],
    heroTitle: "읽히는 콘텐츠를 모아 브랜드의 목소리를 만듭니다",
    heroDescription: "ZIGULAB은 대표 글, 카테고리, 구독 CTA를 한 화면에 담아 독자가 다음 글까지 계속 이동하게 만듭니다.",
    primaryCta: "구독하기",
    secondaryCta: "추천 글 보기",
    stats: [
      { label: "Articles", value: "48" },
      { label: "Topics", value: "6" },
      { label: "Weekly", value: "Tue" },
    ],
    features: [
      { title: "추천 글 구조", description: "첫 화면에 대표 글과 최신 글을 분리해 독자의 클릭 흐름을 만듭니다." },
      { title: "토픽 탐색", description: "카테고리와 태그를 눈에 띄게 배치해 콘텐츠 탐색을 쉽게 합니다." },
      { title: "구독 전환", description: "뉴스레터, 이메일, 커뮤니티 연결 CTA를 편집 가능한 섹션으로 제공합니다." },
    ],
    packages: [
      { title: "Feature Article", price: "Lead", description: "대표 콘텐츠를 크게 노출하는 에디토리얼 섹션" },
      { title: "Topic Board", price: "Explore", description: "주제별 글 묶음과 태그 탐색 영역" },
      { title: "Subscribe", price: "Convert", description: "구독 폼과 발행 주기 안내를 담은 CTA" },
    ],
    process: ["대표 글", "최신 글", "토픽 탐색", "구독 유도"],
    subpages: {
      홈: {
        title: "대표 콘텐츠를 첫 화면에 배치합니다",
        description: "브랜드가 지금 가장 말하고 싶은 주제를 크게 보여줍니다.",
      },
      글: {
        title: "최신 글과 추천 글을 분리합니다",
        description: "읽을거리를 카드형으로 구성해 체류 시간을 늘립니다.",
      },
      토픽: {
        title: "카테고리별 탐색을 빠르게 만듭니다",
        description: "태그, 주제, 시리즈를 한 번에 발견할 수 있습니다.",
      },
      구독: {
        title: "독자를 구독자로 전환합니다",
        description: "발행 주기와 혜택을 명확히 보여주는 구독 CTA를 제공합니다.",
      },
    },
  },
};

const typeCopy = {
  business: {
    saas: "SaaS 성장팀",
    agency: "브랜드 실행팀",
    consulting: "전문 컨설팅",
    startup: "스케일업 파트너",
  },
  reservation: {
    hotel: "호텔 예약",
    stay: "프라이빗 스테이",
    rental: "공간 예약",
    wellness: "웰니스 여행",
  },
  blog: {
    magazine: "브랜드 매거진",
    personal: "퍼스널 저널",
    newsletter: "뉴스레터 허브",
    knowledge: "지식 아카이브",
  },
};

const moodCopy = {
  sharp: "선명하게",
  trust: "신뢰감 있게",
  bold: "강하게",
  calm: "편안하게",
  premium: "고급스럽게",
  nature: "자연스럽게",
  editorial: "잡지처럼",
  clean: "읽기 쉽게",
  playful: "생동감 있게",
};

export const preparedTemplateContent = templateBase;

export function getPreparedTemplateContent(templateType) {
  return preparedTemplateContent[templateType] || preparedTemplateContent.business;
}

export function buildPreparedTemplateContent(templateType, form = {}) {
  const base = getPreparedTemplateContent(templateType);
  const siteName = form.siteName?.trim() || form.brandName?.trim() || base.brandName;
  const goals = form.goals?.length ? form.goals : base.goals.slice(0, 3);
  const audience = form.targetAudience?.trim();
  const offer = form.mainOffer?.trim();
  const customRequest = form.customRequest?.trim();
  const typeLabel = typeCopy[templateType]?.[form.templateStyle] || base.category;
  const moodLabel = moodCopy[form.mood] || "명확하게";

  return {
    ...base,
    brandName: siteName,
    heroTitle: `${siteName}의 가치를 ${moodLabel} 보여주는 ${typeLabel} 페이지`,
    heroDescription: [
      audience ? `${audience}를 대상으로 설계했습니다.` : base.heroDescription,
      `${goals.join(", ")} 흐름이 첫 화면과 서브페이지에 이어집니다.`,
      offer ? `대표 제안: ${offer}.` : "",
      customRequest || "",
    ]
      .filter(Boolean)
      .join(" "),
    primaryCta: goals[0] || base.primaryCta,
    secondaryCta: base.secondaryCta,
    stats: [
      { label: "Type", value: typeLabel },
      { label: "Focus", value: goals[0] || base.stats[1].value },
      { label: "Offer", value: offer || base.stats[2].value },
    ],
    features: base.features.map((item, index) => ({
      ...item,
      title: index === 0 ? `${goals[0] || item.title} 중심 구성` : item.title,
    })),
    process: goals.slice(0, 4).length >= 4 ? goals.slice(0, 4) : base.process,
  };
}
