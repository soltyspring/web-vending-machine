import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import ShoppingTemplateSetupModal from "../components/ShoppingTemplateSetupModal";

const topStores = ["STORE", "BEAUTY", "SPORTS", "OUTLET", "BOUTIQUE", "KICKS", "KIDS", "USED", "SNAP"];
const subTabs = ["콘텐츠", "추천", "랭킹", "세일", "신상", "브랜드", "기획전", "후기"];
const quickMenus = ["전체", "남성", "여성", "잡화", "스니커즈", "디지털"];

const defaultContent = {
  brandName: "MOOD SHOP",
  heroBadge: "오늘의 추천 컬렉션",
  heroTitle: "매일 입고 싶은 감각적인 데일리 룩",
  heroDescription: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
  navItems: ["추천", "랭킹", "세일", "신상"],
  marqueeItems: ["신상품", "베스트", "세일", "스타일"],
  featuredEyebrow: "베스트셀러",
  featuredTitle: "지금 가장 많이 보는 아이템",
  primaryCtaLabel: "지금 쇼핑하기",
  secondaryCtaLabel: "더 보기",
  bannerTitle: "이번 주 추천 브랜드",
  bannerDescription: "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
  aboutTitle: "지금 가장 많이 찾는 브랜드와 상품",
  aboutDescription: "메인에서 바로 탐색할 수 있도록 브랜드 타일과 추천 상품 영역을 밀도 있게 구성했습니다.",
  footerDescription: "트렌드, 브랜드, 상품을 한 화면에서 탐색하는 커머스형 템플릿",
  productCards: [
    { category: "상의", name: "에센셜 로고 스웨트", priceLabel: "69,000원", badge: "BEST" },
    { category: "아우터", name: "라이트 후드 점퍼", priceLabel: "119,000원", badge: "NEW" },
    { category: "신발", name: "러너 스니커즈", priceLabel: "98,000원", badge: "" },
    { category: "팬츠", name: "와이드 데님 팬츠", priceLabel: "79,000원", badge: "BEST" },
    { category: "가방", name: "미니 크로스 백", priceLabel: "54,000원", badge: "" },
    { category: "모자", name: "워시드 볼캡", priceLabel: "29,000원", badge: "NEW" },
  ],
  reviewCards: [
    { name: "박서진", role: "20대 직장인", text: "메인에서 바로 취향에 맞는 상품을 고르기 쉬워요." },
    { name: "이하늘", role: "대학생", text: "배너랑 타일 구성이 익숙해서 쇼핑 흐름이 편합니다." },
    { name: "정민수", role: "프리랜서", text: "브랜드 탐색과 상품 탐색이 한 화면에 있어서 좋아요." },
  ],
};

const themeByMood = {
  minimal: {
    accent: "text-white",
    point: "#e5e7eb",
    shell: "bg-[#101113]",
    search: "bg-[#f3f4f6] text-[#121212]",
    hero: [
      "from-[#d9d9d9] to-[#bcbcbc]",
      "from-[#cfcfc7] to-[#a9aaa1]",
      "from-[#d9d7d1] to-[#c3b8aa]",
    ],
    tile: "from-[#f3f4f6] to-[#e5e7eb]",
    product: "from-[#ececec] to-[#d7d7d7]",
  },
  luxury: {
    accent: "text-[#f5e7d7]",
    point: "#c59b6d",
    shell: "bg-[#151210]",
    search: "bg-[#fbf4ec] text-[#221d18]",
    hero: [
      "from-[#5f4a3a] to-[#2e241d]",
      "from-[#8c6c52] to-[#47372a]",
      "from-[#d6c2aa] to-[#8d6f56]",
    ],
    tile: "from-[#f5ede4] to-[#e6d5c1]",
    product: "from-[#ead8c5] to-[#d3b99f]",
  },
  warm: {
    accent: "text-[#fff1ec]",
    point: "#ff8d66",
    shell: "bg-[#171312]",
    search: "bg-[#fff3ee] text-[#251918]",
    hero: [
      "from-[#f4c3b8] to-[#db8c74]",
      "from-[#e8d2bf] to-[#c3a082]",
      "from-[#f0ddd1] to-[#d9bba2]",
    ],
    tile: "from-[#fff0ea] to-[#f7d7c8]",
    product: "from-[#f3dfd6] to-[#e7c0ac]",
  },
  trendy: {
    accent: "text-[#eef4ff]",
    point: "#4e7cff",
    shell: "bg-[#11131a]",
    search: "bg-[#f5f7ff] text-[#161a28]",
    hero: [
      "from-[#819bff] to-[#3749a6]",
      "from-[#67d6ff] to-[#2563eb]",
      "from-[#d5e2ff] to-[#8ab0ff]",
    ],
    tile: "from-[#eef3ff] to-[#dce7ff]",
    product: "from-[#dfe9ff] to-[#b8cfff]",
  },
  custom: {
    accent: "text-white",
    point: "#3868ff",
    shell: "bg-[#111214]",
    search: "bg-[#f5f7ff] text-[#161a28]",
    hero: [
      "from-[#d9d9d9] to-[#bcbcbc]",
      "from-[#cfcfc7] to-[#a9aaa1]",
      "from-[#d9d7d1] to-[#c3b8aa]",
    ],
    tile: "from-[#f3f4f6] to-[#e5e7eb]",
    product: "from-[#ececec] to-[#d7d7d7]",
  },
};

const imageClassByIndex = [
  "bg-[radial-gradient(circle_at_40%_22%,rgba(255,255,255,0.95),rgba(255,255,255,0.15)_42%,transparent_43%)]",
  "bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,255,255,0.18))]",
  "bg-[radial-gradient(circle_at_60%_26%,rgba(255,255,255,0.92),rgba(255,255,255,0.16)_46%,transparent_47%)]",
];

const normalizeWords = (value) =>
  (value || "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const splitTitle = (value) => {
  const normalized = normalizeWords(value);
  if (!normalized) return ["감각적인 스타일"];

  const words = normalized.split(" ");
  if (words.length <= 2) return [normalized];

  const lines = [];
  const target = normalized.length > 16 ? 3 : 2;
  const targetLength = Math.ceil(normalized.replace(/\s/g, "").length / target);
  let current = "";
  let currentLen = 0;

  words.forEach((word, index) => {
    const nextLen = currentLen + word.length;
    const shouldBreak = current && lines.length < target - 1 && nextLen > targetLength;
    if (shouldBreak) {
      lines.push(current.trim());
      current = word;
      currentLen = word.length;
    } else {
      current = current ? `${current} ${word}` : word;
      currentLen = nextLen;
    }

    if (index === words.length - 1 && current) {
      lines.push(current.trim());
    }
  });

  return lines;
};

const makeHeroCards = (content, moodTheme) => {
  const items = content.productCards?.length ? content.productCards : defaultContent.productCards;
  return items.slice(0, 3).map((item, index) => ({
    title: item.name,
    sub: item.category,
    desc: index === 0 ? content.heroDescription : content.bannerDescription,
    gradient: moodTheme.hero[index % moodTheme.hero.length],
  }));
};

const fixedShellContent = {
  badge: "오늘의 추천 셀렉션",
  description: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
  footerBrand: "MOOD SHOP",
  footerDescription: "Web Vending Machine에서 제공하는 커머스형 쇼핑몰 템플릿",
  footerMenus: ["추천", "랭킹", "세일", "신상"],
};

const isHexColor = (value) => /^#[0-9a-fA-F]{6}$/.test(value || "");

const getGeneratedTheme = (theme = {}) => ({
  primaryColor: isHexColor(theme.primaryColor) ? theme.primaryColor : "#3868ff",
  secondaryColor: isHexColor(theme.secondaryColor) ? theme.secondaryColor : "#e5e7eb",
  accentColor: isHexColor(theme.accentColor) ? theme.accentColor : "#ffffff",
  backgroundColor: isHexColor(theme.backgroundColor) ? theme.backgroundColor : "#111214",
  surfaceColor: isHexColor(theme.surfaceColor) ? theme.surfaceColor : "#f6f6f7",
  textColor: isHexColor(theme.textColor) ? theme.textColor : "#111111",
  productImageScale: ["small", "medium", "large"].includes(theme.productImageScale)
    ? theme.productImageScale
    : "medium",
  density: ["compact", "balanced", "airy"].includes(theme.density)
    ? theme.density
    : "balanced",
});

const hexToRgb = (hex) => {
  if (!isHexColor(hex)) return null;
  return {
    r: parseInt(hex.slice(1, 3), 16),
    g: parseInt(hex.slice(3, 5), 16),
    b: parseInt(hex.slice(5, 7), 16),
  };
};

const getReadableColor = (hex) => {
  const rgb = hexToRgb(hex);
  if (!rgb) return "#111111";
  const brightness = (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  return brightness > 155 ? "#111111" : "#ffffff";
};

const productImageSizeByScale = {
  small: "h-14 w-14",
  medium: "h-20 w-20",
  large: "h-28 w-28",
};

const spacingByDensity = {
  compact: {
    productSection: "px-5 py-7 md:px-8",
    productGrid: "mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    brandGrid: "mx-auto grid w-full max-w-[1400px] gap-1 px-3 py-3 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
  },
  balanced: {
    productSection: "px-5 py-10 md:px-8",
    productGrid: "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    brandGrid: "mx-auto grid w-full max-w-[1400px] gap-2 px-3 py-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
  },
  airy: {
    productSection: "px-5 py-14 md:px-8",
    productGrid: "mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6",
    brandGrid: "mx-auto grid w-full max-w-[1400px] gap-4 px-3 py-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6",
  },
};

export default function ShoppingTemplateStore() {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedMood, setAppliedMood] = useState("minimal");
  const [activeTab, setActiveTab] = useState("추천");
  const [isGenerated, setIsGenerated] = useState(false);
  const [isSitePreviewMode, setIsSitePreviewMode] = useState(false);
  const [templateContent, setTemplateContent] = useState(defaultContent);
  const [setupForm, setSetupForm] = useState({
    siteName: "무블리",
    businessType: "여성 의류 쇼핑몰",
    tagline: "감각적인 데일리 룩을 제안하는 셀렉트샵",
    mood: "minimal",
    customMood: "",
    menus: ["신상품", "베스트셀러", "룩북"],
    customRequest: "무신사처럼 촘촘한 커머스 메인 느낌으로 만들어 주세요.",
  });

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("shopping-template-scroll");
      if (!el) return;
      setShowCTA(el.scrollTop > 260);
    };

    const el = document.getElementById("shopping-template-scroll");
    if (el) el.addEventListener("scroll", handleScroll);
    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const currentMood = showSetupModal ? setupForm.mood : appliedMood;
  const theme = themeByMood[currentMood] || themeByMood.minimal;
  const hasGeneratedTheme = Boolean(
    templateContent.theme && Object.keys(templateContent.theme).length
  );
  const generatedTheme = getGeneratedTheme(templateContent.theme);
  const useGeneratedTheme = hasGeneratedTheme && !showSetupModal;
  const generatedSpacing = spacingByDensity[generatedTheme.density] || spacingByDensity.balanced;
  const generatedHeroStyle = useGeneratedTheme
    ? {
        background: `linear-gradient(135deg, ${generatedTheme.primaryColor}, ${generatedTheme.secondaryColor})`,
      }
    : undefined;
  const generatedPromoStyle = useGeneratedTheme
    ? {
        background: `linear-gradient(135deg, ${generatedTheme.backgroundColor}, ${generatedTheme.primaryColor})`,
      }
    : undefined;
  const generatedHeaderStyle = useGeneratedTheme
    ? {
        background: `linear-gradient(0deg, rgba(16,17,19,0.82), rgba(16,17,19,0.82)), ${generatedTheme.backgroundColor}`,
      }
    : undefined;
  const generatedEditorialStyle = useGeneratedTheme
    ? {
        background: `linear-gradient(135deg, ${generatedTheme.backgroundColor}, ${generatedTheme.primaryColor})`,
      }
    : undefined;
  const readableSurfaceColor = getReadableColor(generatedTheme.surfaceColor);
  const generatedSurfaceStyle = useGeneratedTheme
    ? { backgroundColor: generatedTheme.surfaceColor, color: generatedTheme.textColor }
    : undefined;
  const productImageSize =
    productImageSizeByScale[useGeneratedTheme ? generatedTheme.productImageScale : "medium"];
  const heroTitleLines = splitTitle(templateContent.heroTitle || defaultContent.heroTitle);
  const heroCards = makeHeroCards(templateContent, theme);
  const brandTiles = (templateContent.marqueeItems?.length ? templateContent.marqueeItems : defaultContent.marqueeItems)
    .flatMap((item, index) => [
      `${item} EDIT ${index + 1}`,
      `${templateContent.brandName} CURATION ${index + 1}`,
    ])
    .slice(0, 12);
  const products = templateContent.productCards?.length ? templateContent.productCards : defaultContent.productCards;
  const reviews = templateContent.reviewCards?.length ? templateContent.reviewCards : defaultContent.reviewCards;

  const handleFormChange = (key, value) => {
    setSetupForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleMenuToggle = (menu) => {
    setSetupForm((prev) => ({
      ...prev,
      menus: prev.menus.includes(menu)
        ? prev.menus.filter((item) => item !== menu)
        : [...prev.menus, menu],
    }));
  };

  const handleSetupSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch("http://localhost:8000/generate-template", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          templateId: "shopping",
          ...setupForm,
        }),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.detail || "초안 생성에 실패했습니다.");
      }

      setTemplateContent({
        ...defaultContent,
        ...data,
      });
      setAppliedMood(setupForm.mood);
      setIsGenerated(true);
      setIsSitePreviewMode(false);
      setShowSetupModal(false);
    } catch (error) {
      setErrorMessage(error.message || "초안 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStart = () => {
    setIsSitePreviewMode(false);
    setShowSetupModal(true);
    const el = document.getElementById("shopping-template-scroll");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    const el = document.getElementById("shopping-template-scroll");
    if (el) el.scrollTo({ top: 128, behavior: "smooth" });
  };

  const renderTabPage = () => {
    const pageStyle = useGeneratedTheme
      ? {
          background: `linear-gradient(135deg, ${generatedTheme.surfaceColor}, ${generatedTheme.secondaryColor})`,
          color: generatedTheme.textColor,
        }
      : undefined;
    const darkPanelStyle = useGeneratedTheme
      ? {
          background: `linear-gradient(135deg, ${generatedTheme.backgroundColor}, ${generatedTheme.primaryColor})`,
        }
      : undefined;

    if (activeTab === "콘텐츠") {
      return (
        <section className="bg-[#f6f6f7] px-5 py-10 text-black md:px-8" style={pageStyle}>
          <div className="mx-auto grid w-full max-w-[1400px] gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <article className="rounded-3xl bg-white/80 p-8 shadow-xl shadow-black/5">
              <p className="text-xs font-black tracking-[0.18em] opacity-45">CONTENTS</p>
              <h2 className="mt-4 text-5xl font-black leading-[0.98] tracking-[-0.07em]">{templateContent.aboutTitle}</h2>
              <p className="mt-6 max-w-[720px] whitespace-pre-line text-sm font-semibold leading-7 opacity-70">
                {templateContent.aboutDescription}
              </p>
            </article>
            <div className="grid gap-4">
              {brandTiles.slice(0, 4).map((item, index) => (
                <article key={`${item}-contents`} className="rounded-2xl bg-white/70 p-5 shadow-sm">
                  <p className="text-xs font-black opacity-40">EDITORIAL {index + 1}</p>
                  <h3 className="mt-3 text-2xl font-black tracking-[-0.05em]">{item}</h3>
                  <p className="mt-2 text-sm font-semibold opacity-60">{templateContent.heroDescription}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === "랭킹") {
      return (
        <section className="bg-[#f6f6f7] px-5 py-10 text-black md:px-8" style={pageStyle}>
          <div className="mx-auto w-full max-w-[1400px]">
            <p className="text-xs font-black tracking-[0.18em] opacity-45">RANKING</p>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.07em]">{templateContent.brandName} 랭킹</h2>
            <div className="mt-8 grid gap-3">
              {products.map((item, index) => (
                <article key={`${item.name}-ranking`} className="grid items-center gap-4 rounded-2xl bg-white/80 p-4 shadow-sm md:grid-cols-[70px_1fr_160px]">
                  <span className="text-4xl font-black tracking-[-0.08em] opacity-35">{String(index + 1).padStart(2, "0")}</span>
                  <div>
                    <p className="text-xs font-black opacity-40">{item.category}</p>
                    <h3 className="mt-1 text-2xl font-black tracking-[-0.05em]">{item.name}</h3>
                  </div>
                  <p className="text-lg font-black">{item.priceLabel}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    if (activeTab === "후기") {
      return (
        <section className="bg-[#111214] px-5 py-10 text-white md:px-8" style={darkPanelStyle}>
          <div className="mx-auto w-full max-w-[1400px]">
            <p className="text-xs font-black tracking-[0.18em] text-white/45">REVIEWS</p>
            <h2 className="mt-3 text-5xl font-black tracking-[-0.07em]">고객들이 남긴 이야기</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {reviews.map((review) => (
                <article key={`${review.name}-tab`} className="rounded-3xl bg-black/25 p-6 shadow-xl shadow-black/10 backdrop-blur-[1px]">
                  <p className="text-3xl text-white">★★★★★</p>
                  <p className="mt-5 text-lg font-black leading-7">"{review.text}"</p>
                  <p className="mt-6 text-sm font-black">{review.name}</p>
                  <p className="text-xs text-white/50">{review.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      );
    }

    const titleByTab = {
      세일: `${templateContent.brandName} 단독 혜택`,
      신상: "방금 업데이트된 신상품",
      브랜드: "취향별 브랜드 큐레이션",
      기획전: templateContent.bannerTitle,
    };
    const eyebrowByTab = {
      세일: "SALE",
      신상: "NEW ARRIVALS",
      브랜드: "BRAND",
      기획전: "SPECIAL EXHIBITION",
    };
    const descriptionByTab = {
      세일: templateContent.bannerDescription,
      신상: templateContent.heroDescription,
      브랜드: templateContent.aboutDescription,
      기획전: templateContent.bannerDescription,
    };

    return (
      <section className="bg-[#f6f6f7] px-5 py-10 text-black md:px-8" style={pageStyle}>
        <div className="mx-auto w-full max-w-[1400px]">
          <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-black tracking-[0.18em] opacity-45">{eyebrowByTab[activeTab]}</p>
              <h2 className="mt-3 text-5xl font-black leading-[0.98] tracking-[-0.07em]">{titleByTab[activeTab]}</h2>
              <p className="mt-4 max-w-[620px] text-sm font-semibold leading-7 opacity-65">{descriptionByTab[activeTab]}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {(templateContent.navItems?.length ? templateContent.navItems : defaultContent.navItems).map((item) => (
                <span key={`${activeTab}-${item}`} className="rounded-full bg-black px-4 py-2 text-xs font-bold text-white">
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {(activeTab === "브랜드" ? brandTiles.slice(0, 8) : products).map((item, index) => {
              const product = typeof item === "string" ? products[index % products.length] : item;
              return (
                <article key={`${activeTab}-${product.name}-${index}`} className="rounded-3xl bg-white/75 p-4 shadow-xl shadow-black/5">
                  <div
                    className={`flex aspect-[4/5] items-center justify-center rounded-2xl bg-gradient-to-br ${theme.product}`}
                    style={
                      useGeneratedTheme
                        ? {
                            background: `linear-gradient(135deg, ${generatedTheme.secondaryColor}, ${generatedTheme.primaryColor})`,
                          }
                        : undefined
                    }
                  >
                    <div className={`${productImageSize} rounded-2xl bg-white/60 ${index % 2 ? "rounded-full" : ""}`}></div>
                  </div>
                  <p className="mt-4 text-xs font-black opacity-40">{typeof item === "string" ? "CURATION" : product.category}</p>
                  <h3 className="mt-1 text-xl font-black leading-6 tracking-[-0.04em]">
                    {typeof item === "string" ? item : product.name}
                  </h3>
                  <p className="mt-2 text-sm font-black opacity-70">{product.priceLabel}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>
    );
  };

  return (
    <div className="min-h-screen bg-[#0f1012] pt-20 text-white">
      <div id="shopping-template-scroll" className="h-[calc(100vh-80px)] overflow-auto">
        {!isGenerated && !isSitePreviewMode ? (
        <div className="sticky top-0 z-40 border-b border-white/10 bg-black/90 px-4 py-2 backdrop-blur">
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
            <div className="flex items-center gap-3 text-xs text-white/60">
              <span>쇼핑몰 템플릿 미리보기</span>
              <span>·</span>
              <Link to="/templates" className="font-bold text-white/90 underline underline-offset-2">
                목록으로
              </Link>
              <span className="hidden md:inline">·</span>
              <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 md:inline-flex">
                {templateContent.brandName}
              </span>
            </div>
            {!showSetupModal ? (
              <button
                type="button"
                onClick={handleStart}
                className="rounded-full border border-white/15 bg-white px-4 py-2 text-xs font-black text-black transition hover:-translate-y-0.5"
              >
                지금 바로 시작해보세요
              </button>
            ) : null}
          </div>
        </div>
        ) : null}

        {isGenerated && !showSetupModal && !isSitePreviewMode ? (
          <div className="sticky top-0 z-40 border-b border-black/10 bg-white/95 px-4 py-3 text-black shadow-sm backdrop-blur">
            <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between gap-3">
              <div>
                <p className="text-xs font-black tracking-[0.16em] text-black/35">GENERATED DRAFT</p>
                <p className="text-sm font-black">{templateContent.brandName} 초안 생성 완료</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleStart}
                  className="rounded-full border border-black/10 px-4 py-2 text-xs font-black transition hover:bg-black hover:text-white"
                >
                  기본 정보 수정
                </button>
                <button
                  type="button"
                  onClick={() => setIsSitePreviewMode(true)}
                  className="rounded-full bg-black px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5"
                >
                  내 페이지로 보기
                </button>
              </div>
            </div>
          </div>
        ) : null}

        <div className={showSetupModal ? "flex min-h-full min-w-[1760px]" : "min-h-full"}>
          <div className={showSetupModal ? "min-w-[1340px] flex-1" : ""}>
            <header className="border-b border-white/10 bg-[#101113]" style={generatedHeaderStyle}>
              <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3 text-sm font-bold md:px-8">
                <div className="flex items-center gap-5 overflow-x-auto whitespace-nowrap text-white/75">
                  <span className="text-lg">☰</span>
                  {topStores.map((item) => (
                    <span key={item} className="transition hover:text-white">
                      {item}
                    </span>
                  ))}
                </div>
                <div className="hidden items-center gap-4 text-xs text-white/65 lg:flex">
                  <span>오프라인 스토어</span>
                  <span>검색</span>
                  <span>좋아요</span>
                  <span>마이</span>
                  <span>장바구니</span>
                  <Link to="/login" className="rounded-md border border-white/15 px-3 py-1.5 text-white transition hover:bg-white hover:text-black">
                    로그인
                  </Link>
                  <Link to="/signup" className="rounded-md bg-white px-3 py-1.5 font-bold text-black transition hover:-translate-y-0.5">
                    회원가입
                  </Link>
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-5 py-3 md:px-8">
                <div className="rounded-md bg-[#3868ff] px-3 py-2 text-xs font-bold text-white">
                  {fixedShellContent.badge}
                </div>
                <div className="flex-1 rounded-md bg-[#f3f4f6] px-4 py-3 text-sm text-[#121212]">
                  {fixedShellContent.description}
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[1400px] items-center gap-5 overflow-x-auto px-5 pb-3 text-sm font-semibold text-white/55 md:px-8">
                {subTabs.map((item) => (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleTabClick(item)}
                    className={`whitespace-nowrap border-b-2 pb-2 transition ${
                      activeTab === item ? "border-white text-white" : "border-transparent hover:text-white"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </header>

            {activeTab === "추천" ? (
              <>
            <section className="mx-auto grid w-full max-w-[1400px] gap-px bg-black px-0">
              <div className="grid gap-px md:grid-cols-3">
                {heroCards.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className={`relative min-h-[430px] overflow-hidden bg-gradient-to-br ${item.gradient}`}
                    style={useGeneratedTheme ? generatedHeroStyle : undefined}
                  >
                    <div className={`absolute inset-0 opacity-70 ${imageClassByIndex[index % imageClassByIndex.length]}`}></div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-xs font-black tracking-[0.15em] text-white/75">
                        {index === 0 ? templateContent.heroBadge : item.sub}
                      </p>
                      <h2 className="mt-2 max-w-[360px] text-[2rem] font-black leading-[1.02] tracking-[-0.06em] text-white md:text-[2.35rem]">
                        {index === 0
                          ? heroTitleLines.map((line, lineIndex) => (
                              <span key={`${line}-${lineIndex}`}>
                                {line}
                                {lineIndex < heroTitleLines.length - 1 ? <br /> : null}
                              </span>
                            ))
                          : item.title}
                      </h2>
                      <p className="mt-3 max-w-[340px] text-sm font-semibold leading-6 text-white/80">{item.desc}</p>
                      {index === 0 ? (
                        <div className="mt-5 flex flex-wrap gap-2">
                          <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-black">
                            {templateContent.primaryCtaLabel}
                          </span>
                          <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-black text-white">
                            {templateContent.secondaryCtaLabel}
                          </span>
                        </div>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-b border-white/10 bg-[#f2f2f3]" style={generatedSurfaceStyle}>
              <div className={useGeneratedTheme ? generatedSpacing.brandGrid : "mx-auto grid w-full max-w-[1400px] gap-2 px-3 py-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6"}>
                {brandTiles.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={`rounded-md border border-black/10 bg-gradient-to-br ${theme.tile} px-4 py-4 text-center text-sm font-bold text-black shadow-sm`}
                    style={
                      useGeneratedTheme
                        ? {
                            background: `linear-gradient(135deg, ${generatedTheme.surfaceColor}, ${generatedTheme.secondaryColor})`,
                            color: generatedTheme.textColor,
                          }
                        : undefined
                    }
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#f6f6f7] text-black" style={generatedSurfaceStyle}>
              <div className={`mx-auto w-full max-w-[1400px] ${useGeneratedTheme ? generatedSpacing.productSection : "px-5 py-10 md:px-8"}`}>
                <div className="flex items-end justify-between">
                  <div>
                    <p className="text-xs font-black tracking-[0.16em] text-black/45">{templateContent.featuredEyebrow}</p>
                    <h3 className="mt-2 text-4xl font-black tracking-[-0.06em]">{templateContent.featuredTitle}</h3>
                  </div>
                  <button className="text-sm font-bold text-black/50 underline underline-offset-4">View All</button>
                </div>

                <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-2">
                  {quickMenus.map((item, index) => (
                    <button
                      key={item}
                      className={`rounded-full px-4 py-2 text-sm font-bold ${
                        index === 0 ? "bg-black text-white" : "bg-white text-black/60"
                      }`}
                    >
                      {item}
                    </button>
                  ))}
                </div>

                <div className={useGeneratedTheme ? generatedSpacing.productGrid : "mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"}>
                  {products.map((item, index) => (
                    <article key={`${item.name}-${index}`} className="group">
                      <div
                        className={`aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br ${theme.product} p-3 shadow-sm`}
                        style={
                          useGeneratedTheme
                            ? {
                                background: `linear-gradient(135deg, ${generatedTheme.secondaryColor}, ${generatedTheme.primaryColor})`,
                              }
                            : undefined
                        }
                      >
                        <div className="flex h-full items-center justify-center rounded-md bg-white/35">
                          <div className={`${productImageSize} rounded-2xl bg-white/60 ${index % 2 === 0 ? "" : "rounded-full"}`}></div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between gap-2">
                          <p className="text-[11px] font-bold tracking-[0.08em] text-black/40">{item.category}</p>
                          {item.badge ? (
                            <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">
                              {item.badge}
                            </span>
                          ) : null}
                        </div>
                        <p className="mt-1 text-[15px] font-bold leading-5 text-black">{item.name}</p>
                        <p className="mt-1 text-base font-black text-black">{item.priceLabel}</p>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>

            <section className="bg-[#f6f6f7] px-5 py-8 text-black md:px-8" style={generatedSurfaceStyle}>
              <div
                className="mx-auto grid w-full max-w-[1400px] overflow-hidden rounded-3xl bg-[#111214] text-white shadow-2xl shadow-black/10 lg:grid-cols-[1.1fr_0.9fr]"
                style={generatedPromoStyle}
              >
                <div className="bg-black/35 p-8 backdrop-blur-[1px] md:p-12">
                  <p className="text-xs font-black tracking-[0.18em] text-white/55">SPECIAL CURATION</p>
                  <h3 className="mt-4 max-w-[560px] text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">
                    {templateContent.bannerTitle}
                  </h3>
                  <p className="mt-5 max-w-[520px] text-sm font-semibold leading-7 text-white/75">
                    {templateContent.bannerDescription}
                  </p>
                  <div className="mt-8 flex flex-wrap gap-3">
                    {(templateContent.navItems?.length ? templateContent.navItems : defaultContent.navItems).map((item) => (
                      <span key={item} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-px bg-white/10 p-px">
                  {products.slice(0, 4).map((item, index) => (
                    <div key={`${item.name}-promo-${index}`} className="min-h-[150px] bg-black/20 p-5 backdrop-blur-[1px]">
                      <p className="text-[11px] font-black tracking-[0.12em] text-white/45">{item.category}</p>
                      <p className="mt-3 text-lg font-black leading-5 text-white">{item.name}</p>
                      <p className="mt-2 text-sm font-bold text-white/60">{item.priceLabel}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <section className="border-t border-white/10 bg-[#111214] px-5 py-10 text-white md:px-8" style={generatedEditorialStyle}>
              <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div
                  className="rounded-2xl border border-white/10 p-6 shadow-xl shadow-black/10"
                  style={
                    useGeneratedTheme
                      ? {
                          backgroundColor: generatedTheme.surfaceColor,
                          color: readableSurfaceColor,
                        }
                      : undefined
                  }
                >
                  <p className="text-xs font-black tracking-[0.16em] opacity-45">EDITORIAL NOTE</p>
                  <h4 className="mt-3 text-3xl font-black tracking-[-0.05em]">{templateContent.aboutTitle}</h4>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 opacity-75">{templateContent.aboutDescription}</p>
                </div>
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div
                      key={`${review.name}-${review.role}`}
                      className="rounded-2xl border border-white/10 p-5 shadow-xl shadow-black/10"
                      style={
                        useGeneratedTheme
                          ? {
                              backgroundColor: generatedTheme.surfaceColor,
                              color: readableSurfaceColor,
                            }
                          : undefined
                      }
                    >
                      <p className="text-sm font-semibold leading-6 opacity-80">"{review.text}"</p>
                      <div className="mt-4">
                        <p className="text-sm font-black">{review.name}</p>
                        <p className="text-xs opacity-45">{review.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>
              </>
            ) : (
              renderTabPage()
            )}

            <footer className="border-t border-white/10 bg-black px-5 py-12 text-white md:px-8">
              <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-black">
                      WVM
                    </div>
                    <div>
                      <p className="text-lg font-black tracking-[-0.04em]">{fixedShellContent.footerBrand}</p>
                      <p className="text-[11px] font-bold tracking-[0.16em] text-white/40">
                        CURATED COMMERCE TEMPLATE
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-[360px] text-[13px] font-medium leading-7 text-white/55">
                    {fixedShellContent.footerDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-12">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-white/35">MENU</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-white/60">
                      {fixedShellContent.footerMenus.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-white/35">SERVICE</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-white/60">
                      <span>추천 큐레이션</span>
                      <span>브랜드 타일</span>
                      <span>상품 리스트</span>
                      <span>리뷰</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-white/35">SUPPORT</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-white/60">
                      <span>공지사항</span>
                      <span>고객센터</span>
                      <span>이용약관</span>
                      <span>개인정보처리방침</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mx-auto mt-10 w-full max-w-[1400px] border-t border-white/10 pt-5">
                <p className="text-[11px] text-white/30">
                  © 2026 Web Vending Machine. All rights reserved. — Shopping Template Preview
                </p>
              </div>
            </footer>
          </div>

          {showSetupModal ? (
            <ShoppingTemplateSetupModal
              open={showSetupModal}
              form={setupForm}
              onChange={handleFormChange}
              onToggleMenu={handleMenuToggle}
              onSubmit={handleSetupSubmit}
              isSubmitting={isSubmitting}
              errorMessage={errorMessage}
            />
          ) : null}
        </div>
      </div>

      {isSitePreviewMode ? (
        <button
          type="button"
          onClick={() => setIsSitePreviewMode(false)}
          className="fixed bottom-8 right-8 z-50 rounded-full bg-white px-5 py-3 text-xs font-black text-black shadow-2xl shadow-black/30 transition hover:-translate-y-0.5"
        >
          편집 화면으로 돌아가기
        </button>
      ) : null}

      <div className={`fixed inset-x-0 bottom-8 z-50 flex justify-center transition-all duration-500 ${showCTA && !showSetupModal && !isGenerated ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <button
          type="button"
          onClick={handleStart}
          className="rounded-full bg-white px-8 py-4 text-sm font-black text-black shadow-2xl shadow-black/30 transition hover:-translate-y-0.5"
        >
          이 템플릿으로 시작하기
        </button>
      </div>
    </div>
  );
}
