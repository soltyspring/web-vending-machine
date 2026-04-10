import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ShoppingTemplateSetupModal from "../components/ShoppingTemplateSetupModal";

/* ───────── 페이지 정의 ───────── */
const PAGES = {
  home: "HOME",
  shop: "SHOP",
  lookbook: "LOOKBOOK",
  about: "ABOUT",
};

/* ───────── 상품 데이터 ───────── */
const products = [
  { id: 1, name: "오버사이즈 울 코트", price: 189000, category: "OUTER", badge: "BEST", gradient: "from-[#e8e0d8] to-[#d4cbc2]" },
  { id: 2, name: "캐시미어 니트 탑", price: 78000, category: "TOP", badge: "NEW", gradient: "from-[#f0ddd6] to-[#e8cfc6]" },
  { id: 3, name: "와이드 핏 슬랙스", price: 65000, category: "BOTTOM", badge: null, gradient: "from-[#dde0e4] to-[#cdd0d6]" },
  { id: 4, name: "미니멀 레더 백", price: 128000, category: "ACC", badge: "BEST", gradient: "from-[#e8ddd0] to-[#d8ccbc]" },
  { id: 5, name: "크롭 트위드 자켓", price: 145000, category: "OUTER", badge: "NEW", gradient: "from-[#e4d8d0] to-[#d8c8be]" },
  { id: 6, name: "코튼 밴드 셔츠", price: 52000, category: "TOP", badge: null, gradient: "from-[#d8dce4] to-[#c8ccd8]" },
  { id: 7, name: "플리츠 미디 스커트", price: 58000, category: "BOTTOM", badge: null, gradient: "from-[#e0d8e4] to-[#d0c8d8]" },
  { id: 8, name: "실버 체인 네클리스", price: 42000, category: "ACC", badge: "NEW", gradient: "from-[#dce0e0] to-[#ccd4d4]" },
];

const lookbookItems = [
  { id: 1, title: "Minimal Urban", season: "SS 2026", tag: "New", gradient: "from-[#d4cbc2] to-[#c0b4a8]" },
  { id: 2, title: "Street Heritage", season: "Collaboration", tag: "Collab", gradient: "from-[#c8c0b8] to-[#b8aca0]" },
  { id: 3, title: "Modern Classic", season: "Limited Drop", tag: "Exclusive", gradient: "from-[#bcc4c8] to-[#a8b4b8]" },
  { id: 4, title: "Soft Elegance", season: "FW 2026", tag: "Coming", gradient: "from-[#d8ccc4] to-[#c8b8ac]" },
];

const reviews = [
  { name: "김서연", role: "20대 직장인", text: "배송도 빠르고 옷도 화면이랑 똑같아서 너무 만족했어요!" },
  { name: "이도윤", role: "대학생", text: "가격도 괜찮고 핏이 진짜 예뻐요. 자주 이용할 것 같아요!" },
  { name: "박지우", role: "자취생", text: "소재도 좋고 생각보다 더 편해서 데일리로 입기 좋아요 👍" }
];

const defaultTemplateContent = {
  brandName: "MOOD",
  heroBadge: "2026 S/S COLLECTION",
  heroTitle: "당신의\n무드에 맞는\n스타일",
  heroDescription: "감각적인 큐레이션으로 완성하는\n라이프스타일 쇼핑 경험",
  navItems: ["HOME", "SHOP", "LOOKBOOK", "ABOUT"],
  marqueeItems: ["FREE SHIPPING", "NEW ARRIVALS", "CURATED SELECTION", "MOOD LIFESTYLE"],
  featuredEyebrow: "CURATED",
  featuredTitle: "Best Sellers",
  primaryCtaLabel: "SHOP NOW →",
  secondaryCtaLabel: "LOOKBOOK",
  bannerTitle: "첫 구매 고객 10% 할인",
  bannerDescription: "회원가입 후 첫 주문 시 자동 적용됩니다",
  aboutTitle: "감각적인 큐레이션,\nMOOD가 제안합니다",
  aboutDescription:
    "MOOD는 단순한 쇼핑몰이 아닙니다. 우리는 라이프스타일을 큐레이션합니다. 매 시즌 엄선된 아이템만을 소개하며, 트렌드를 넘어 당신만의 무드를 완성할 수 있도록 돕습니다.",
  footerDescription: "감각적인 큐레이션으로 완성하는\n라이프스타일 쇼핑몰",
  productCards: products.slice(0, 4).map((item) => ({
    category: item.category,
    name: item.name,
    priceLabel: `${item.price.toLocaleString()}원`,
    badge: item.badge || "",
  })),
  reviewCards: reviews,
};

const uiPresetByMood = {
  minimal: {
    pageBg: "#faf9f7",
    badgeBg: "#f5f5f4",
    badgeDot: "#fb7185",
    accentFrom: "#fb7185",
    accentTo: "#f59e0b",
    heroGradient: ["#e8e0d8", "#d4c8bc"],
    glow: ["#fecdd3", "#fde68a"],
    orb: ["#e7e5e4", "#d6d3d1"],
    marqueeBg: "#fafaf9",
    marqueeBorder: "#e7e5e4",
    bannerGlowA: "rgba(244, 114, 182, 0.16)",
    bannerGlowB: "rgba(245, 158, 11, 0.14)",
    featuredGradients: [
      ["#e8e0d8", "#d4cbc2"],
      ["#f0ddd6", "#e8cfc6"],
      ["#dde0e4", "#cdd0d6"],
      ["#e8ddd0", "#d8ccbc"],
    ],
    heroWrap: "md:flex-row md:items-center md:gap-10",
    heroText: "flex-[0.82] max-w-[520px]",
    heroVisual: "mt-8 flex-[1.18] md:mt-0 md:pl-4",
    heroTitle: "text-[2.8rem] md:text-[3.8rem] lg:text-[4rem]",
    heroCard: "max-w-[340px] rounded-[28px] shadow-md shadow-stone-200/40",
    heroInner: "h-16 w-16 rounded-[18px]",
    button: "rounded-full px-6 py-3",
    sectionHeader: "items-end justify-between",
    productAspect: "aspect-[4/5]",
    productRadius: "rounded-[24px]",
    productFrame: "shadow-md shadow-stone-200/40",
    productInner: "h-16 w-16 rounded-[18px]",
    productGap: "gap-4",
    marqueeRepeat: 14,
  },
  luxury: {
    pageBg: "#f7f3ef",
    badgeBg: "#efe7df",
    badgeDot: "#c08457",
    accentFrom: "#b45309",
    accentTo: "#f59e0b",
    heroGradient: ["#d9c4ae", "#b99b7f"],
    glow: ["#fde68a", "#fdba74"],
    orb: ["#e7d7c8", "#caa787"],
    marqueeBg: "#f8f1ea",
    marqueeBorder: "#eadfce",
    bannerGlowA: "rgba(180, 83, 9, 0.18)",
    bannerGlowB: "rgba(245, 158, 11, 0.16)",
    featuredGradients: [
      ["#e7d5c4", "#d6b89c"],
      ["#edd8cc", "#d8b39c"],
      ["#ddd6d0", "#c7b8ab"],
      ["#ead9c7", "#d2b08d"],
    ],
    heroWrap: "md:flex-row md:items-start md:gap-16",
    heroText: "flex-[0.95] max-w-[640px]",
    heroVisual: "mt-12 flex-[1.05] md:mt-6",
    heroTitle: "text-[2.9rem] md:text-[4.4rem] lg:text-[5rem]",
    heroCard: "max-w-[500px] rounded-[44px] shadow-xl shadow-stone-300/45",
    heroInner: "h-36 w-36 rounded-[30px]",
    button: "rounded-full px-8 py-3.5",
    sectionHeader: "items-end justify-between",
    productAspect: "aspect-[3/4]",
    productRadius: "rounded-[32px]",
    productFrame: "shadow-xl shadow-stone-300/45",
    productInner: "h-28 w-28 rounded-[26px]",
    productGap: "gap-6",
    marqueeRepeat: 12,
  },
  warm: {
    pageBg: "#fff8f2",
    badgeBg: "#fff1eb",
    badgeDot: "#fb7185",
    accentFrom: "#fb7185",
    accentTo: "#fb923c",
    heroGradient: ["#f4d6cf", "#edc5a8"],
    glow: ["#fecaca", "#fdba74"],
    orb: ["#f5d0d0", "#f0ab86"],
    marqueeBg: "#fff7ed",
    marqueeBorder: "#fed7aa",
    bannerGlowA: "rgba(251, 113, 133, 0.18)",
    bannerGlowB: "rgba(251, 146, 60, 0.18)",
    featuredGradients: [
      ["#f3ddd4", "#ecc8bc"],
      ["#f8d7dd", "#f0b8c6"],
      ["#f3ded0", "#eac4ad"],
      ["#f6e0cf", "#edc39e"],
    ],
    heroWrap: "md:flex-row md:items-center",
    heroText: "flex-1 max-w-[580px]",
    heroVisual: "mt-10 flex-1 md:mt-0 md:pl-10",
    heroTitle: "text-[2.9rem] md:text-[4.2rem] lg:text-[4.7rem]",
    heroCard: "max-w-[430px] rounded-[34px] shadow-lg shadow-orange-100/60",
    heroInner: "h-24 w-24 rounded-[22px]",
    button: "rounded-full px-7 py-3.5",
    sectionHeader: "items-end justify-between",
    productAspect: "aspect-[3/4]",
    productRadius: "rounded-[30px]",
    productFrame: "shadow-lg shadow-orange-100/60",
    productInner: "h-20 w-20 rounded-[22px]",
    productGap: "gap-5",
    marqueeRepeat: 14,
  },
  trendy: {
    pageBg: "#f6f7fb",
    badgeBg: "#eef2ff",
    badgeDot: "#6366f1",
    accentFrom: "#6366f1",
    accentTo: "#22c55e",
    heroGradient: ["#dbe4ff", "#c8d2ff"],
    glow: ["#c4b5fd", "#86efac"],
    orb: ["#c7d2fe", "#93c5fd"],
    marqueeBg: "#f8fafc",
    marqueeBorder: "#dbeafe",
    bannerGlowA: "rgba(99, 102, 241, 0.18)",
    bannerGlowB: "rgba(34, 197, 94, 0.16)",
    featuredGradients: [
      ["#dbe4ff", "#c7d2fe"],
      ["#e9d5ff", "#d8b4fe"],
      ["#d1fae5", "#a7f3d0"],
      ["#dbeafe", "#bfdbfe"],
    ],
    heroWrap: "md:flex-row md:items-start md:gap-16",
    heroText: "flex-[0.95] max-w-[700px]",
    heroVisual: "mt-12 flex-[1.05] md:mt-6",
    heroTitle: "text-[3rem] md:text-[4.8rem] lg:text-[5.4rem]",
    heroCard: "max-w-[520px] rounded-[42px] shadow-2xl shadow-sky-100/70",
    heroInner: "h-32 w-32 rounded-full",
    button: "rounded-2xl px-8 py-3.5",
    sectionHeader: "flex-col items-start gap-3",
    productAspect: "aspect-square",
    productRadius: "rounded-[28px]",
    productFrame: "shadow-2xl shadow-sky-100/70 ring-1 ring-white/50",
    productInner: "h-24 w-24 rounded-full",
    productGap: "gap-6",
    marqueeRepeat: 18,
  },
};

const normalizeHeroTitle = (title) =>
  (title || "")
    .replace(/\n+/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const splitHeroTitleLines = (title) => {
  const normalized = normalizeHeroTitle(title);
  if (!normalized) return ["스타일"];

  const words = normalized.split(" ");
  if (words.length === 1) return [normalized];

  const targetLineCount = normalized.length > 16 || words.length > 4 ? 3 : 2;
  const targetLength = Math.ceil(normalized.replace(/\s/g, "").length / targetLineCount);
  const lines = [];
  let currentLine = "";
  let currentLength = 0;

  words.forEach((word, index) => {
    const wordLength = word.length;
    const nextLength = currentLength + wordLength;
    const shouldBreak =
      currentLine &&
      lines.length < targetLineCount - 1 &&
      nextLength > targetLength;

    if (shouldBreak) {
      lines.push(currentLine.trim());
      currentLine = word;
      currentLength = wordLength;
    } else {
      currentLine = currentLine ? `${currentLine} ${word}` : word;
      currentLength = nextLength;
    }

    if (index === words.length - 1 && currentLine) {
      lines.push(currentLine.trim());
    }
  });

  return lines.filter(Boolean);
};

/* ───────── 메인 컴포넌트 ───────── */
export default function ShoppingTemplate() {
  const [page, setPage] = useState("home");
  const [shopCategory, setShopCategory] = useState("ALL");
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedMood, setAppliedMood] = useState("minimal");
  const [appliedBusinessType, setAppliedBusinessType] = useState("여성 의류 쇼핑몰");
  const [templateContent, setTemplateContent] = useState(defaultTemplateContent);
  const [setupForm, setSetupForm] = useState({
    siteName: "무블리",
    businessType: "여성 의류 쇼핑몰",
    tagline: "감각적인 데일리 룩을 제안하는 셀렉트샵",
    mood: "minimal",
    menus: ["신상품", "베스트셀러", "룩북"],
    customRequest: "따뜻한 핑크핑클한 톤으로, 첫 화면에 베스트셀러와 리뷰를 강조해 주세요.",
  });

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("template-scroll-container");
      if (!el) return;
      setScrolled(el.scrollTop > 60);
      setShowCTA(el.scrollTop > 300);
    };
    const el = document.getElementById("template-scroll-container");
    if (el) el.addEventListener("scroll", handleScroll);
    return () => { if (el) el.removeEventListener("scroll", handleScroll); };
  }, []);

  const isPreviewLocked = showSetupModal;
  const activeMood = showSetupModal ? setupForm.mood : appliedMood;
  const ui = uiPresetByMood[activeMood] || uiPresetByMood.minimal;
  const pageLabels = templateContent.navItems.length === 4
    ? templateContent.navItems
    : defaultTemplateContent.navItems;
  const heroTitleLines = splitHeroTitleLines(
    templateContent.heroTitle || defaultTemplateContent.heroTitle
  );
  const productGradient = (index) => {
    const pair = ui.featuredGradients[index % ui.featuredGradients.length];
    return `linear-gradient(135deg, ${pair[0]}, ${pair[1]})`;
  };
  const featuredProducts = (templateContent.productCards?.length ? templateContent.productCards : defaultTemplateContent.productCards).map((item, index) => ({
    id: index + 1,
    category: item.category,
    name: item.name,
    priceLabel: item.priceLabel,
    badge: item.badge || "",
    imageShape: item.imageShape || "rounded-square",
    imageScale: item.imageScale || "medium",
  }));
  const marqueeItems = templateContent.marqueeItems?.length
    ? templateContent.marqueeItems
    : defaultTemplateContent.marqueeItems;
  const marqueeLoopItems = [...Array(ui.marqueeRepeat)].flatMap(() => marqueeItems);
  const reviewCards = templateContent.reviewCards?.length
    ? templateContent.reviewCards
    : defaultTemplateContent.reviewCards;
  const shopProducts = shopCategory === "ALL"
    ? featuredProducts
    : featuredProducts.filter((item) => item.category === shopCategory);
  const handleFormChange = (key, value) => {
    setSetupForm((prev) => ({
      ...prev,
      [key]: value,
    }));
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
        headers: {
          "Content-Type": "application/json",
        },
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
        ...defaultTemplateContent,
        ...data,
      });
      setAppliedMood(setupForm.mood);
      setAppliedBusinessType(setupForm.businessType || "여성 의류 쇼핑몰");
      setShowSetupModal(false);
    } catch (error) {
      setErrorMessage(error.message || "초안 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStartTemplate = () => {
    setShowSetupModal(true);
    setPage("home");
    const el = document.getElementById("template-scroll-container");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="relative min-h-screen" style={{ backgroundColor: ui.pageBg }}>
      {/* ── WVM 안내 바 ── */}
      <div className="fixed inset-x-0 top-20 z-50 border-b border-stone-200 bg-white/95 px-4 py-2 backdrop-blur">
        <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-stone-500">쇼핑몰 템플릿 미리보기</span>
            <span className="text-stone-300">·</span>
            <Link to="/templates" className="text-xs font-bold text-stone-700 underline underline-offset-2 hover:text-stone-900">
              목록으로
            </Link>
            <span className="hidden text-stone-300 md:inline">·</span>
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-bold text-stone-700 md:inline-flex">
              {templateContent.brandName}
            </span>
            <span className="hidden rounded-full bg-white px-3 py-1 text-xs font-medium text-stone-500 md:inline-flex">
              {appliedBusinessType}
            </span>
          </div>
          {!showSetupModal ? (
            <button
              type="button"
              onClick={handleStartTemplate}
              className="rounded-full bg-stone-900 px-4 py-2 text-xs font-black text-white transition hover:-translate-y-0.5"
            >
              지금 바로 시작해보세요
            </button>
          ) : null}
        </div>
      </div>

      {/* ── 템플릿 콘텐츠 ── */}
      <div
        id="template-scroll-container"
        className="h-[calc(100vh-80px)] overflow-auto pt-14 transition duration-300"
      >
        <div className={showSetupModal ? "flex min-h-full min-w-[1540px]" : "min-h-full"}>
          <div className={showSetupModal ? "min-w-[1120px] flex-1" : ""}>

            {/* ── 쇼핑몰 NAV ── */}
            <nav className={`sticky top-14 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
              <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
                <button
                  onClick={() => {
                    if (!isPreviewLocked) setPage("home");
                  }}
                  className="flex items-center gap-3"
                  disabled={isPreviewLocked}
                >
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-[10px] font-black text-white">M</div>
                  <div className="text-left">
                    <p className="text-xl font-black leading-none tracking-[-0.04em] text-stone-900">
                      {templateContent.brandName}
                    </p>
                    <p className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-stone-400">
                      {appliedBusinessType}
                    </p>
                  </div>
                </button>

                <div className="hidden items-center gap-8 md:flex">
                  {Object.entries(PAGES).map(([key], index) => (
                    <button
                      key={key}
                      onClick={() => {
                        if (!isPreviewLocked) setPage(key);
                      }}
                      disabled={isPreviewLocked}
                      className={`text-[13px] font-semibold tracking-[0.04em] transition ${
                        page === key ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                      }`}
                    >
                      {pageLabels[index] || defaultTemplateContent.navItems[index]}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-5">
                  <button disabled={isPreviewLocked} className="text-xs font-semibold text-stone-500 transition hover:text-stone-900 disabled:cursor-default disabled:opacity-60">검색</button>
                  <button disabled={isPreviewLocked} className="relative text-xs font-semibold text-stone-500 transition hover:text-stone-900 disabled:cursor-default disabled:opacity-60">
                    BAG
                    <span className="absolute -right-3 -top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-stone-900 text-[9px] font-bold text-white">0</span>
                  </button>
                </div>
              </div>
            </nav>

        {/* ════════ HOME ════════ */}
        {page === "home" && (
          <>
            {/* Hero */}
            <section className="relative overflow-hidden">
              <div className={`mx-auto flex w-full max-w-[1200px] flex-col px-6 pb-20 pt-12 md:px-10 md:pb-28 md:pt-20 ${ui.heroWrap}`}>
                <div className={ui.heroText}>
                  <div
                    className="inline-flex items-center gap-2 rounded-full px-4 py-1.5"
                    style={{ backgroundColor: ui.badgeBg }}
                  >
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: ui.badgeDot }}></span>
                    <span className="text-[11px] font-bold tracking-[0.12em] text-stone-500">
                      {templateContent.heroBadge} {appliedBusinessType ? `· ${appliedBusinessType}` : ""}
                    </span>
                  </div>

                  <h1 className={`mt-6 text-[3rem] font-black leading-[1.02] tracking-[-0.06em] text-stone-900 ${ui.heroTitle}`}>
                    {heroTitleLines.slice(0, -1).map((line, index) => (
                      <span key={line + index}>
                        {line}
                        <br />
                      </span>
                    ))}
                    <span
                      className="bg-clip-text text-transparent"
                      style={{
                        backgroundImage: `linear-gradient(90deg, ${ui.accentFrom}, ${ui.accentTo})`,
                      }}
                    >
                      {heroTitleLines[heroTitleLines.length - 1] || "스타일"}
                    </span>
                  </h1>

                  <p className="mt-5 max-w-[360px] whitespace-pre-line text-[15px] font-medium leading-[1.7] text-stone-400">
                    {templateContent.heroDescription}
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <button
                      onClick={() => {
                        if (!isPreviewLocked) setPage("shop");
                      }}
                      disabled={isPreviewLocked}
                      className={`${ui.button} bg-stone-900 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/20 disabled:cursor-default disabled:opacity-60`}
                    >
                      {templateContent.primaryCtaLabel}
                    </button>
                    <button
                      onClick={() => {
                        if (!isPreviewLocked) setPage("lookbook");
                      }}
                      disabled={isPreviewLocked}
                      className={`${ui.button} border border-stone-300 text-[13px] font-bold text-stone-600 transition hover:-translate-y-0.5 hover:border-stone-400 disabled:cursor-default disabled:opacity-60`}
                    >
                      {templateContent.secondaryCtaLabel}
                    </button>
                  </div>
                </div>

                <div className={ui.heroVisual}>
                  <div className="relative">
                    <div
                      className={`aspect-[3/4] w-full ${ui.heroCard}`}
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${ui.heroGradient[0]}, ${ui.heroGradient[1]})`,
                      }}
                    >
                      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
                        <div className={`${ui.heroInner} bg-white/40 shadow-inner`}></div>
                        <span className="text-xs font-bold tracking-[0.15em] text-stone-500/60">FEATURED ITEM</span>
                      </div>
                    </div>
                    <div
                      className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl opacity-60 blur-sm"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${ui.glow[0]}, ${ui.glow[1]})`,
                      }}
                    ></div>
                    <div
                      className="absolute -right-4 -top-4 h-20 w-20 rounded-xl opacity-40"
                      style={{
                        backgroundImage: `linear-gradient(135deg, ${ui.orb[0]}, ${ui.orb[1]})`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Marquee */}
            <div
              className="overflow-hidden border-y py-3"
              style={{
                borderColor: ui.marqueeBorder,
                backgroundColor: ui.marqueeBg,
              }}
            >
              <div className="flex min-w-max animate-[marquee_40s_linear_infinite] items-center gap-8 whitespace-nowrap pl-8">
                {marqueeLoopItems.map((item, index) => (
                  <div key={`${item}-${index}`} className="flex items-center gap-8">
                    <span className="text-sm font-bold tracking-[0.1em] text-stone-300">{item}</span>
                    <span className="text-stone-200">✦</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <div className={`flex ${ui.sectionHeader}`}>
                <div>
                  <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">{templateContent.featuredEyebrow}</span>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-4xl">{templateContent.featuredTitle}</h2>
                </div>
                <button
                  onClick={() => {
                    if (!isPreviewLocked) setPage("shop");
                  }}
                  disabled={isPreviewLocked}
                  className="text-[13px] font-bold text-stone-500 underline underline-offset-4 transition hover:text-stone-900 disabled:cursor-default disabled:opacity-60"
                >
                  View All →
                </button>
              </div>

              <div className={`mt-10 grid ${ui.productGap} sm:grid-cols-2 lg:grid-cols-4`}>
                {featuredProducts.map((p, index) => (
                  <article key={p.id} className="group cursor-pointer">
                    <div
                      className={`relative overflow-hidden ${ui.productAspect} ${ui.productRadius} ${ui.productFrame} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-stone-200/60`}
                      style={{ backgroundImage: productGradient(index) }}
                    >
                      <div className="flex h-full items-center justify-center">
                        <div className={`${ui.productInner} bg-white/40 shadow-inner transition duration-300 group-hover:scale-105`}></div>
                      </div>
                      {p.badge ? (
                        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white ${p.badge === "NEW" ? "bg-rose-400" : "bg-stone-800"}`}>
                          {p.badge}
                        </span>
                      ) : null}
                      <div className="absolute inset-x-3 bottom-3 flex justify-between rounded-xl bg-white/80 px-3 py-2 opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                        <span className="text-[11px] font-bold text-stone-700">자세히 보기</span>
                        <span className="text-[11px] font-bold text-stone-400">→</span>
                      </div>
                    </div>
                    <div className="mt-3 px-0.5">
                      <p className="text-[10px] font-semibold tracking-[0.08em] text-stone-400">{p.category}</p>
                      <p className="mt-0.5 text-[15px] font-bold text-stone-800">{p.name}</p>
                      <p className="mt-0.5 text-base font-black text-stone-900">{p.priceLabel}</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Banner */}
            <section className="relative overflow-hidden bg-stone-900 px-6 py-20 text-center md:px-10 md:py-24">
              <div
                className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full blur-3xl"
                style={{ backgroundColor: ui.bannerGlowA }}
              ></div>
              <div
                className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full blur-3xl"
                style={{ backgroundColor: ui.bannerGlowB }}
              ></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-stone-500">SPECIAL OFFER</span>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">{templateContent.bannerTitle}</h3>
              <p className="mt-3 text-sm font-medium text-stone-400">{templateContent.bannerDescription}</p>
              <button disabled={isPreviewLocked} className="mt-8 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold text-stone-900 transition hover:-translate-y-0.5 disabled:cursor-default disabled:opacity-60">
                회원가입 하기
              </button>
            </section>

            {/* Reviews */}
            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">REVIEWS</span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-4xl">고객 후기</h2>
              <div className={`mt-10 grid ${ui.productGap} md:grid-cols-3`}>
                {reviewCards.map((r, i) => (
                  <div key={i} className="rounded-2xl border border-stone-100 bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
                    <div className="flex gap-1">
                      {[...Array(5)].map((_, j) => (
                        <span key={j} className="text-sm text-amber-400">★</span>
                      ))}
                    </div>
                    <p className="mt-4 text-[14px] font-medium leading-[1.7] text-stone-600">"{r.text}"</p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-9 w-9 rounded-full bg-gradient-to-br from-stone-200 to-stone-300"></div>
                      <div>
                        <p className="text-[13px] font-bold text-stone-800">{r.name}</p>
                        <p className="text-[11px] font-medium text-stone-400">{r.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {/* ════════ SHOP ════════ */}
        {page === "shop" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">COLLECTION</span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-5xl">Shop All</h2>
            </div>

            <div className="mt-8 flex items-center gap-2 overflow-x-auto pb-2">
              {["ALL", "OUTER", "TOP", "BOTTOM", "ACC"].map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    if (!isPreviewLocked) setShopCategory(cat);
                  }}
                  disabled={isPreviewLocked}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-[0.04em] transition ${
                    shopCategory === cat
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  } disabled:cursor-default disabled:opacity-60`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {shopProducts.map((p, index) => (
                <article key={p.id} className="group cursor-pointer">
                  <div
                    className={`relative overflow-hidden ${ui.productAspect} ${ui.productRadius} ${ui.productFrame} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-stone-200/60`}
                    style={{ backgroundImage: productGradient(index) }}
                  >
                    <div className="flex h-full items-center justify-center">
                      <div className={`${ui.productInner} bg-white/40 shadow-inner transition duration-300 group-hover:scale-105`}></div>
                    </div>
                    {p.badge ? (
                      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white ${p.badge === "NEW" ? "bg-rose-400" : "bg-stone-800"}`}>
                        {p.badge}
                      </span>
                    ) : null}
                  </div>
                  <div className="mt-3 px-0.5">
                    <p className="text-[10px] font-semibold tracking-[0.08em] text-stone-400">{p.category}</p>
                    <p className="mt-0.5 text-[15px] font-bold text-stone-800">{p.name}</p>
                    <p className="mt-0.5 text-base font-black text-stone-900">{p.priceLabel}</p>
                  </div>
                </article>
              ))}
            </div>
          </section>
        )}

        {/* ════════ LOOKBOOK ════════ */}
        {page === "lookbook" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">SEASON</span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-5xl">Lookbook</h2>
              <p className="mt-3 text-sm font-medium text-stone-400">시즌별 스타일링을 확인하세요</p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {lookbookItems.map((item) => (
                <div key={item.id} className="group cursor-pointer">
                  <div className={`relative aspect-[4/3] overflow-hidden rounded-2xl bg-gradient-to-br ${item.gradient} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl`}>
                    <div className="flex h-full items-center justify-center">
                      <div className="h-36 w-36 rounded-3xl bg-white/30 shadow-inner"></div>
                    </div>
                    <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-[10px] font-bold text-stone-700 backdrop-blur">
                      {item.tag}
                    </span>
                    <div className="absolute inset-x-4 bottom-4 rounded-xl bg-white/90 p-4 backdrop-blur">
                      <p className="text-lg font-black text-stone-900">{item.title}</p>
                      <p className="mt-0.5 text-xs font-semibold text-stone-400">{item.season}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* ════════ ABOUT ════════ */}
        {page === "about" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">ABOUT</span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-5xl">Our Story</h2>
            </div>

            <div className="mt-10 grid gap-10 md:grid-cols-2 md:items-center">
              <div className="aspect-square rounded-3xl bg-gradient-to-br from-[#e8e0d8] to-[#d0c4b8] shadow-lg">
                <div className="flex h-full items-center justify-center">
                  <div className="h-40 w-40 rounded-3xl bg-white/30 shadow-inner"></div>
                </div>
              </div>
              <div>
                <h3 className="whitespace-pre-line text-2xl font-black tracking-[-0.04em] text-stone-900">{templateContent.aboutTitle}</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.85] text-stone-500">
                  {templateContent.aboutDescription}
                </p>
                <p className="mt-4 text-[15px] font-medium leading-[1.85] text-stone-500">
                  모든 제품은 품질과 디자인을 기준으로 직접 선별하며, 고객 한 분 한 분의 만족을 최우선으로 생각합니다.
                </p>
                <div className="mt-8 flex gap-8">
                  <div>
                    <p className="text-3xl font-black text-stone-900">200+</p>
                    <p className="mt-1 text-xs font-semibold text-stone-400">큐레이션 아이템</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-stone-900">15K+</p>
                    <p className="mt-1 text-xs font-semibold text-stone-400">누적 고객</p>
                  </div>
                  <div>
                    <p className="text-3xl font-black text-stone-900">98%</p>
                    <p className="mt-1 text-xs font-semibold text-stone-400">만족도</p>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

            {/* ── Footer ── */}
            <footer className="border-t border-stone-200 bg-white px-6 py-14 md:px-10">
              <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-md bg-stone-900 text-[9px] font-black text-white">M</div>
                    <span className="text-lg font-black tracking-[-0.04em] text-stone-900">{templateContent.brandName}</span>
                  </div>
                  <p className="mt-3 max-w-[280px] whitespace-pre-line text-[13px] font-medium leading-[1.7] text-stone-400">
                    {templateContent.footerDescription}
                  </p>
                </div>
                <div className="flex gap-12">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-stone-400">SHOP</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-stone-500">
                      {pageLabels.map((item) => (
                        <span key={item}>{item}</span>
                      ))}
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-stone-400">SUPPORT</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-stone-500">
                      <span>FAQ</span><span>배송 안내</span><span>교환/반품</span><span>고객센터</span>
                    </div>
                  </div>
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.1em] text-stone-400">SOCIAL</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-stone-500">
                      <span>Instagram</span><span>YouTube</span><span>Twitter</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="mx-auto mt-10 w-full max-w-[1200px] border-t border-stone-100 pt-6">
                <p className="text-[11px] text-stone-300">© 2026 {templateContent.brandName}. All rights reserved. — Web Vending Machine 템플릿</p>
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

      {/* ── 플로팅 CTA 버튼 ── */}
      <div className={`fixed inset-x-0 bottom-8 z-50 flex justify-center transition-all duration-500 ${showCTA && !showSetupModal ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <button
          type="button"
          onClick={handleStartTemplate}
          className="flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-stone-900/30 transition hover:-translate-y-0.5 hover:shadow-stone-900/40"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-[9px] font-black text-stone-900">W</span>
          이 템플릿으로 시작하기
        </button>
      </div>

      {/* ── 마퀴 애니메이션 ── */}
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}
