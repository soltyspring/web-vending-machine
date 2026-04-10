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

export default function ShoppingTemplateStore() {
  const [showSetupModal, setShowSetupModal] = useState(false);
  const [showCTA, setShowCTA] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [appliedMood, setAppliedMood] = useState("minimal");
  const [templateContent, setTemplateContent] = useState(defaultContent);
  const [setupForm, setSetupForm] = useState({
    siteName: "무블리",
    businessType: "여성 의류 쇼핑몰",
    tagline: "감각적인 데일리 룩을 제안하는 셀렉트샵",
    mood: "minimal",
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

  const theme = themeByMood[showSetupModal ? setupForm.mood : appliedMood] || themeByMood.minimal;
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
      setShowSetupModal(false);
    } catch (error) {
      setErrorMessage(error.message || "초안 생성에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStart = () => {
    setShowSetupModal(true);
    const el = document.getElementById("shopping-template-scroll");
    if (el) el.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-[#0f1012] pt-20 text-white">
      <div id="shopping-template-scroll" className="h-[calc(100vh-80px)] overflow-auto">
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

        <div className={showSetupModal ? "flex min-h-full min-w-[1760px]" : "min-h-full"}>
          <div className={showSetupModal ? "min-w-[1340px] flex-1" : ""}>
            <header className={`border-b border-white/10 ${theme.shell}`}>
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
                  {templateContent.heroBadge}
                </div>
                <div className={`flex-1 rounded-md px-4 py-3 text-sm ${theme.search}`}>
                  {templateContent.heroDescription}
                </div>
              </div>

              <div className="mx-auto flex w-full max-w-[1400px] items-center gap-5 overflow-x-auto px-5 pb-3 text-sm font-semibold text-white/55 md:px-8">
                {subTabs.map((item, index) => (
                  <button
                    key={item}
                    className={`whitespace-nowrap border-b-2 pb-2 transition ${
                      index === 1 ? "border-white text-white" : "border-transparent hover:text-white"
                    }`}
                  >
                    {index < 4 ? templateContent.navItems[index] || item : item}
                  </button>
                ))}
              </div>
            </header>

            <section className="mx-auto grid w-full max-w-[1400px] gap-px bg-black px-0">
              <div className="grid gap-px md:grid-cols-3">
                {heroCards.map((item, index) => (
                  <article
                    key={`${item.title}-${index}`}
                    className={`relative min-h-[430px] overflow-hidden bg-gradient-to-br ${item.gradient}`}
                  >
                    <div className={`absolute inset-0 opacity-70 ${imageClassByIndex[index % imageClassByIndex.length]}`}></div>
                    <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                      <p className="text-xs font-black tracking-[0.15em] text-white/75">{item.sub}</p>
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
                    </div>
                  </article>
                ))}
              </div>
            </section>

            <section className="border-b border-white/10 bg-[#f2f2f3]">
              <div className="mx-auto grid w-full max-w-[1400px] gap-2 px-3 py-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
                {brandTiles.map((item, index) => (
                  <div
                    key={`${item}-${index}`}
                    className={`rounded-md border border-black/10 bg-gradient-to-br ${theme.tile} px-4 py-4 text-center text-sm font-bold text-black shadow-sm`}
                  >
                    {item}
                  </div>
                ))}
              </div>
            </section>

            <section className="bg-[#f6f6f7] text-black">
              <div className="mx-auto w-full max-w-[1400px] px-5 py-10 md:px-8">
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

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
                  {products.map((item, index) => (
                    <article key={`${item.name}-${index}`} className="group">
                      <div className={`aspect-[4/5] overflow-hidden rounded-md bg-gradient-to-br ${theme.product} p-3 shadow-sm`}>
                        <div className="flex h-full items-center justify-center rounded-md bg-white/35">
                          <div className={`h-20 w-20 rounded-2xl bg-white/60 ${index % 2 === 0 ? "" : "rounded-full"}`}></div>
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

            <section className="border-t border-white/10 bg-[#111214] px-5 py-10 text-white md:px-8">
              <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[1.3fr_0.7fr]">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
                  <p className="text-xs font-black tracking-[0.16em] text-white/45">EDITORIAL NOTE</p>
                  <h4 className="mt-3 text-3xl font-black tracking-[-0.05em]">{templateContent.aboutTitle}</h4>
                  <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/70">{templateContent.aboutDescription}</p>
                </div>
                <div className="grid gap-4">
                  {reviews.map((review) => (
                    <div key={`${review.name}-${review.role}`} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                      <p className="text-sm font-semibold leading-6 text-white/80">"{review.text}"</p>
                      <div className="mt-4">
                        <p className="text-sm font-black">{review.name}</p>
                        <p className="text-xs text-white/45">{review.role}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            <footer className="border-t border-white/10 bg-black px-5 py-12 text-white md:px-8">
              <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-black">
                      {templateContent.brandName.slice(0, 2)}
                    </div>
                    <div>
                      <p className="text-lg font-black tracking-[-0.04em]">{templateContent.brandName}</p>
                      <p className="text-[11px] font-bold tracking-[0.16em] text-white/40">
                        CURATED COMMERCE TEMPLATE
                      </p>
                    </div>
                  </div>
                  <p className="mt-4 max-w-[360px] text-[13px] font-medium leading-7 text-white/55">
                    {templateContent.footerDescription}
                  </p>
                </div>

                <div className="flex flex-wrap gap-12">
                  <div>
                    <p className="text-[11px] font-bold tracking-[0.16em] text-white/35">MENU</p>
                    <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-white/60">
                      {(templateContent.navItems?.length ? templateContent.navItems : defaultContent.navItems).map((item) => (
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
                  © 2026 {templateContent.brandName}. All rights reserved. — Web Vending Machine Template
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

      <div className={`fixed inset-x-0 bottom-8 z-50 flex justify-center transition-all duration-500 ${showCTA && !showSetupModal ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
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
