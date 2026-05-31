const defaultProducts = [
  { category: "상의", name: "에센셜 로고 스웨트", priceLabel: "69,000원", badge: "BEST" },
  { category: "아우터", name: "라이트 후드 점퍼", priceLabel: "119,000원", badge: "NEW" },
  { category: "신발", name: "러너 스니커즈", priceLabel: "98,000원", badge: "" },
  { category: "팬츠", name: "와이드 데님 팬츠", priceLabel: "79,000원", badge: "BEST" },
];

const defaultReviews = [
  { name: "지은", role: "직장인", text: "상품 구성이 깔끔해서 원하는 옷을 찾기 쉬웠어요." },
  { name: "민서", role: "대학생", text: "색감이 과하지 않고 데일리로 입기 좋아요." },
  { name: "수진", role: "프리랜서", text: "전체 분위기가 브랜드와 잘 맞아요." },
];

const textLines = (value) =>
  String(value || "")
    .split("\n")
    .filter(Boolean);

const isHexColor = (value) => /^#[0-9a-fA-F]{6}$/.test(value || "");

const safeColor = (value, fallback) => (isHexColor(value) ? value : fallback);

const defaultTopNavigation = ["STORE", "BEAUTY", "SPORTS", "OUTLET", "BOUTIQUE", "KICKS", "KIDS", "USED", "SNAP"].map((label) => ({
  label,
}));

const defaultUtilityNavigation = ["오프라인 스토어", "검색", "좋아요", "마이", "장바구니"].map((label) => ({
  label,
}));

const defaultSubNavigation = ["콘텐츠", "추천", "랭킹", "세일", "신상", "브랜드", "기획전", "후기"].map((label) => ({
  label,
}));

const defaultQuickFilters = ["전체", "여성", "남성", "잡화", "스니커즈", "라이프"].map((label) => ({
  label,
}));

const defaultFooterMenus = ["추천", "랭킹", "세일", "신상"].map((label) => ({
  label,
}));

const defaultFooterServices = ["추천 큐레이션", "브랜드 소개", "상품 리스트", "리뷰"].map((label) => ({
  label,
}));

const defaultFooterSupport = ["공지사항", "고객센터", "이용약관", "개인정보처리방침"].map((label) => ({
  label,
}));

export const shoppingPuckConfig = {
  components: {
    CommerceHeader: {
      fields: {
        brandName: { type: "text" },
        notice: { type: "text" },
        badgeLabel: { type: "text" },
        topNavigation: {
          type: "array",
          min: 1,
          max: 12,
          getItemSummary: (item) => item.label || "상단 메뉴",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "MENU" },
        },
        utilityNavigation: {
          type: "array",
          min: 0,
          max: 8,
          getItemSummary: (item) => item.label || "유틸 메뉴",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "메뉴" },
        },
        loginText: { type: "text" },
        signupText: { type: "text" },
        subNavigation: {
          type: "array",
          min: 1,
          max: 12,
          getItemSummary: (item) => item.label || "하위 탭",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "탭" },
        },
        activeSubNavigation: { type: "text" },
        backgroundColor: { type: "text" },
        pointColor: { type: "text" },
      },
      defaultProps: {
        brandName: "MOOD SHOP",
        notice: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
        badgeLabel: "오늘의 추천 셀렉션",
        topNavigation: defaultTopNavigation,
        utilityNavigation: defaultUtilityNavigation,
        loginText: "로그인",
        signupText: "회원가입",
        subNavigation: defaultSubNavigation,
        activeSubNavigation: "추천",
        backgroundColor: "#101113",
        pointColor: "#3868ff",
      },
      render: ({
        brandName,
        notice,
        badgeLabel,
        topNavigation = defaultTopNavigation,
        utilityNavigation = defaultUtilityNavigation,
        loginText,
        signupText,
        subNavigation = defaultSubNavigation,
        activeSubNavigation,
        backgroundColor,
        pointColor,
      }) => (
        <header className="border-b border-white/10 text-white" style={{ backgroundColor }}>
          <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between px-5 py-3 text-sm font-black md:px-8">
            <div className="scrollbar-hide flex items-center gap-5 overflow-x-auto whitespace-nowrap text-white/80">
              <span className="text-lg">☰</span>
              <span className="font-black text-white">{brandName}</span>
              {topNavigation.map((item, index) => (
                <span key={`${item.label}-${index}`}>{item.label}</span>
              ))}
            </div>
            <div className="hidden items-center gap-4 text-xs text-white/70 lg:flex">
              {utilityNavigation.map((item, index) => (
                <span key={`${item.label}-${index}`}>{item.label}</span>
              ))}
              <span className="rounded-md border border-white/15 px-3 py-1.5">{loginText}</span>
              <span className="rounded-md bg-white px-3 py-1.5 text-black">{signupText}</span>
            </div>
          </div>
          <div className="mx-auto flex w-full max-w-[1400px] items-center gap-3 px-5 py-3 md:px-8">
            <div className="rounded-md px-3 py-2 text-xs font-black text-white" style={{ backgroundColor: pointColor }}>
              {badgeLabel}
            </div>
            <div className="flex-1 rounded-md bg-[#f3f4f6] px-4 py-3 text-sm font-semibold text-[#121212]">
              {notice}
            </div>
          </div>
          <nav className="scrollbar-hide mx-auto flex w-full max-w-[1400px] items-center gap-5 overflow-x-auto px-5 pb-3 text-sm font-bold text-white/55 md:px-8">
            {subNavigation.map((item, index) => (
              <span key={`${item.label}-${index}`} className={item.label === activeSubNavigation ? "border-b-2 border-white pb-2 text-white" : "pb-2"}>
                {item.label}
              </span>
            ))}
          </nav>
        </header>
      ),
    },

    CommerceHeroGrid: {
      fields: {
        badge: { type: "text" },
        title: { type: "textarea" },
        description: { type: "textarea" },
        primaryButtonText: { type: "text" },
        secondaryButtonText: { type: "text" },
        backgroundColor: { type: "text" },
        secondaryColor: { type: "text" },
        textColor: { type: "text" },
        products: {
          type: "array",
          min: 3,
          max: 3,
          getItemSummary: (item) => item.name || "히어로 상품",
          arrayFields: {
            category: { type: "text" },
            name: { type: "text" },
            description: { type: "textarea" },
          },
          defaultItemProps: {
            category: "상품",
            name: "추천 아이템",
            description: "큐레이션된 스타일을 확인해 보세요.",
          },
        },
      },
      defaultProps: {
        badge: "오늘의 추천 컬렉션",
        title: "매일 입고 싶은\n감각적인 데일리 룩",
        description: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
        primaryButtonText: "지금 쇼핑하기",
        secondaryButtonText: "더 보기",
        backgroundColor: "#d8d8d5",
        secondaryColor: "#b8b8b2",
        textColor: "#ffffff",
        products: defaultProducts.slice(0, 3).map((item) => ({
          category: item.category,
          name: item.name,
          description: "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
        })),
      },
      render: ({
        badge,
        title,
        description,
        primaryButtonText,
        secondaryButtonText,
        backgroundColor,
        secondaryColor,
        textColor,
        products = [],
      }) => (
        <section className="bg-black">
          <div className="mx-auto grid w-full max-w-[1400px] gap-px md:grid-cols-3">
            {(products.length ? products : defaultProducts.slice(0, 3)).map((item, index) => (
              <article
                key={`${item.name}-${index}`}
                className="relative min-h-[430px] overflow-hidden p-6"
                style={{
                  background: `linear-gradient(180deg, ${backgroundColor}, ${secondaryColor})`,
                  color: textColor,
                }}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_24%,rgba(255,255,255,0.78),rgba(255,255,255,0.12)_42%,transparent_43%)] opacity-80" />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                  <p className="text-xs font-black tracking-[0.15em] text-white/75">
                    {index === 0 ? badge : item.category}
                  </p>
                  <h1 className="mt-2 max-w-[370px] text-[2rem] font-black leading-[1.02] tracking-[-0.06em] md:text-[2.35rem]">
                    {index === 0
                      ? textLines(title).map((line) => <span key={line} className="block">{line}</span>)
                      : item.name}
                  </h1>
                  <p className="mt-3 max-w-[340px] text-sm font-semibold leading-6 text-white/80">
                    {index === 0 ? description : item.description}
                  </p>
                  {index === 0 ? (
                    <div className="mt-5 flex flex-wrap gap-2">
                      <span className="rounded-full bg-white px-4 py-2 text-xs font-black text-black">{primaryButtonText}</span>
                      <span className="rounded-full border border-white/30 px-4 py-2 text-xs font-black text-white">{secondaryButtonText}</span>
                    </div>
                  ) : null}
                </div>
              </article>
            ))}
          </div>
        </section>
      ),
    },

    BrandTileGrid: {
      fields: {
        tiles: {
          type: "array",
          min: 1,
          max: 12,
          getItemSummary: (item) => item.label || "타일",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "BRAND TILE" },
        },
        backgroundColor: { type: "text" },
        tileColor: { type: "text" },
      },
      defaultProps: {
        tiles: ["신상품 EDIT 1", "MOOD SHOP CURATION 1", "베스트 EDIT 2", "MOOD SHOP CURATION 2"].map((label) => ({ label })),
        backgroundColor: "#f2f2f3",
        tileColor: "#ffffff",
      },
      render: ({ tiles = [], backgroundColor, tileColor }) => (
        <section style={{ backgroundColor }}>
          <div className="mx-auto grid w-full max-w-[1400px] gap-2 px-3 py-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
            {tiles.map((item, index) => (
              <div
                key={`${item.label}-${index}`}
                className="rounded-md border border-black/10 px-4 py-4 text-center text-sm font-black text-black shadow-sm"
                style={{ backgroundColor: tileColor }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </section>
      ),
    },

    CommerceProductGrid: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        viewAllText: { type: "text" },
        filters: {
          type: "array",
          min: 0,
          max: 10,
          getItemSummary: (item) => item.label || "필터",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "필터" },
        },
        backgroundColor: { type: "text" },
        imageColor: { type: "text" },
        products: {
          type: "array",
          min: 1,
          max: 8,
          getItemSummary: (item) => item.name || "상품",
          arrayFields: {
            category: { type: "text" },
            name: { type: "text" },
            priceLabel: { type: "text" },
            badge: { type: "text" },
          },
          defaultItemProps: {
            category: "TOP",
            name: "새 상품",
            priceLabel: "89,000원",
            badge: "NEW",
          },
        },
      },
      defaultProps: {
        eyebrow: "베스트셀러",
        title: "지금 가장 많이 보는 아이템",
        backgroundColor: "#f6f6f7",
        imageColor: "#d8d8d5",
        viewAllText: "View All",
        filters: defaultQuickFilters,
        products: defaultProducts,
      },
      render: ({ eyebrow, title, viewAllText, filters = defaultQuickFilters, backgroundColor, imageColor, products = [] }) => (
        <section className="px-5 py-10 text-black md:px-8" style={{ backgroundColor }}>
          <div className="mx-auto w-full max-w-[1400px]">
            <div className="flex items-end justify-between">
              <div>
                <p className="text-xs font-black tracking-[0.16em] text-black/45">{eyebrow}</p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{title}</h2>
              </div>
              <span className="text-sm font-bold text-black/50 underline underline-offset-4">{viewAllText}</span>
            </div>
            <div className="scrollbar-hide mt-6 flex items-center gap-2 overflow-x-auto pb-2">
              {filters.map((item, index) => (
                <span key={`${item.label}-${index}`} className={`rounded-full px-4 py-2 text-sm font-bold ${index === 0 ? "bg-black text-white" : "bg-white text-black/60"}`}>
                  {item.label}
                </span>
              ))}
            </div>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
              {(products.length ? products : defaultProducts).map((item, index) => (
                <article key={`${item.name}-${index}`}>
                  <div className="flex aspect-[4/5] items-center justify-center rounded-md p-3 shadow-sm" style={{ backgroundColor: imageColor }}>
                    <div className="flex h-full w-full items-center justify-center rounded-md bg-white/35">
                      <div className={`${index % 2 ? "rounded-full" : "rounded-2xl"} h-20 w-20 bg-white/70`} />
                    </div>
                  </div>
                  <div className="mt-3">
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[11px] font-bold tracking-[0.08em] text-black/40">{item.category}</p>
                      {item.badge ? <span className="rounded-full bg-black px-2 py-0.5 text-[10px] font-bold text-white">{item.badge}</span> : null}
                    </div>
                    <p className="mt-1 text-[15px] font-bold leading-5 text-black">{item.name}</p>
                    <p className="mt-1 text-base font-black text-black">{item.priceLabel}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    CommercePromoSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        tags: {
          type: "array",
          min: 0,
          max: 8,
          getItemSummary: (item) => item.label || "태그",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "태그" },
        },
        backgroundColor: { type: "text" },
        products: {
          type: "array",
          min: 1,
          max: 4,
          getItemSummary: (item) => item.name || "상품",
          arrayFields: {
            category: { type: "text" },
            name: { type: "text" },
            priceLabel: { type: "text" },
          },
          defaultItemProps: {
            category: "상품",
            name: "추천 상품",
            priceLabel: "89,000원",
          },
        },
      },
      defaultProps: {
        eyebrow: "SPECIAL CURATION",
        title: "이번 주 추천 브랜드",
        description: "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
        tags: defaultSubNavigation.slice(1, 5),
        backgroundColor: "#111214",
        products: defaultProducts.slice(0, 4),
      },
      render: ({ eyebrow, title, description, tags = [], backgroundColor, products = [] }) => (
        <section className="bg-[#f6f6f7] px-5 py-8 text-black md:px-8">
          <div className="mx-auto grid w-full max-w-[1400px] overflow-hidden rounded-3xl text-white shadow-2xl shadow-black/10 lg:grid-cols-[1.1fr_0.9fr]" style={{ backgroundColor }}>
            <div className="bg-black/35 p-8 md:p-12">
              <p className="text-xs font-black tracking-[0.18em] text-white/55">{eyebrow}</p>
              <h2 className="mt-4 max-w-[560px] text-4xl font-black leading-[0.98] tracking-[-0.06em] md:text-6xl">{title}</h2>
              <p className="mt-5 max-w-[520px] text-sm font-semibold leading-7 text-white/75">{description}</p>
              {tags.length ? (
                <div className="mt-8 flex flex-wrap gap-3">
                  {tags.map((item, index) => (
                    <span key={`${item.label}-${index}`} className="rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-bold text-white/80">
                      {item.label}
                    </span>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="grid grid-cols-2 gap-px bg-white/10 p-px">
              {(products.length ? products : defaultProducts.slice(0, 4)).map((item, index) => (
                <div key={`${item.name}-${index}`} className="min-h-[150px] bg-black/20 p-5">
                  <p className="text-[11px] font-black tracking-[0.12em] text-white/45">{item.category}</p>
                  <p className="mt-3 text-lg font-black leading-5 text-white">{item.name}</p>
                  <p className="mt-2 text-sm font-bold text-white/60">{item.priceLabel}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    CommerceReviewSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        backgroundColor: { type: "text" },
        reviews: {
          type: "array",
          min: 1,
          max: 6,
          getItemSummary: (item) => item.name || "후기",
          arrayFields: {
            name: { type: "text" },
            role: { type: "text" },
            text: { type: "textarea" },
          },
          defaultItemProps: {
            name: "고객",
            role: "구매자",
            text: "상품과 분위기가 마음에 들어요.",
          },
        },
      },
      defaultProps: {
        eyebrow: "EDITORIAL NOTE",
        title: "고객들이 남긴 이야기",
        description: "브랜드의 분위기와 상품 경험을 리뷰로 보여줍니다.",
        backgroundColor: "#111214",
        reviews: defaultReviews,
      },
      render: ({ eyebrow, title, description, backgroundColor, reviews = [] }) => (
        <section className="border-t border-white/10 px-5 py-10 text-white md:px-8" style={{ backgroundColor }}>
          <div className="mx-auto grid w-full max-w-[1400px] gap-6 lg:grid-cols-[1.3fr_0.7fr]">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-black/10">
              <p className="text-xs font-black tracking-[0.16em] text-white/45">{eyebrow}</p>
              <h2 className="mt-3 text-3xl font-black tracking-[-0.05em]">{title}</h2>
              <p className="mt-4 whitespace-pre-line text-sm leading-7 text-white/75">{description}</p>
            </div>
            <div className="grid gap-4">
              {(reviews.length ? reviews : defaultReviews).slice(0, 3).map((review) => (
                <div key={`${review.name}-${review.role}`} className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-xl shadow-black/10">
                  <p className="text-sm font-semibold leading-6 text-white/80">"{review.text}"</p>
                  <p className="mt-4 text-sm font-black">{review.name}</p>
                  <p className="text-xs text-white/45">{review.role}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    CommerceFooter: {
      fields: {
        brandName: { type: "text" },
        description: { type: "textarea" },
        menuTitle: { type: "text" },
        menus: {
          type: "array",
          min: 0,
          max: 8,
          getItemSummary: (item) => item.label || "메뉴",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "메뉴" },
        },
        serviceTitle: { type: "text" },
        services: {
          type: "array",
          min: 0,
          max: 8,
          getItemSummary: (item) => item.label || "서비스",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "서비스" },
        },
        supportTitle: { type: "text" },
        supports: {
          type: "array",
          min: 0,
          max: 8,
          getItemSummary: (item) => item.label || "지원",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "지원" },
        },
        copyrightText: { type: "text" },
        backgroundColor: { type: "text" },
      },
      defaultProps: {
        brandName: "MOOD SHOP",
        description: "Web Vending Machine에서 제공하는 커머스형 쇼핑몰 템플릿입니다.",
        menuTitle: "MENU",
        menus: defaultFooterMenus,
        serviceTitle: "SERVICE",
        services: defaultFooterServices,
        supportTitle: "SUPPORT",
        supports: defaultFooterSupport,
        copyrightText: "© 2026 Web Vending Machine. All rights reserved.",
        backgroundColor: "#000000",
      },
      render: ({
        brandName,
        description,
        menuTitle,
        menus = defaultFooterMenus,
        serviceTitle,
        services = defaultFooterServices,
        supportTitle,
        supports = defaultFooterSupport,
        copyrightText,
        backgroundColor,
      }) => (
        <footer className="border-t border-white/10 px-5 py-12 text-white md:px-8" style={{ backgroundColor }}>
          <div className="mx-auto flex w-full max-w-[1400px] flex-col gap-8 md:flex-row md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-xs font-black text-black">WVM</div>
                <div>
                  <p className="text-lg font-black tracking-[-0.04em]">{brandName}</p>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-white/40">CURATED COMMERCE TEMPLATE</p>
                </div>
              </div>
              <p className="mt-4 max-w-[360px] whitespace-pre-line text-[13px] font-medium leading-7 text-white/55">{description}</p>
            </div>
            <div className="flex flex-wrap gap-12">
              {[
                { title: menuTitle, items: menus },
                { title: serviceTitle, items: services },
                { title: supportTitle, items: supports },
              ].map((group) => (
                <div key={group.title}>
                  <p className="text-[11px] font-bold tracking-[0.16em] text-white/35">{group.title}</p>
                  <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-white/60">
                    {group.items.map((item, index) => (
                      <span key={`${item.label}-${index}`}>{item.label}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-10 w-full max-w-[1400px] border-t border-white/10 pt-5">
            <p className="text-[11px] text-white/30">{copyrightText}</p>
          </div>
        </footer>
      ),
    },
  },
};

export const initialShoppingPuckData = createShoppingPuckDataFromTemplate({
  brandName: "MOOD SHOP",
  heroBadge: "오늘의 추천 컬렉션",
  heroTitle: "매일 입고 싶은\n감각적인 데일리 룩",
  heroDescription: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
  featuredEyebrow: "베스트셀러",
  featuredTitle: "지금 가장 많이 보는 아이템",
  bannerTitle: "이번 주 추천 브랜드",
  bannerDescription: "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
  aboutTitle: "고객들이 남긴 이야기",
  aboutDescription: "브랜드의 분위기와 상품 경험을 리뷰로 보여줍니다.",
  productCards: defaultProducts,
  reviewCards: defaultReviews,
});

export function isLegacyShoppingPuckData(data = {}) {
  return Boolean(
    data?.content?.some((item) =>
      ["HeroSection", "ProductGrid", "BannerSection", "BrandIntroSection", "ReviewSection"].includes(item.type)
    )
  );
}

export function createShoppingPuckDataFromTemplate(content = {}) {
  const theme = content.theme || {};
  const primaryColor = safeColor(theme.primaryColor, "#d8d8d5");
  const secondaryColor = safeColor(theme.secondaryColor, "#b8b8b2");
  const backgroundColor = safeColor(theme.backgroundColor, "#101113");
  const surfaceColor = safeColor(theme.surfaceColor, "#f6f6f7");
  const accentColor = safeColor(theme.accentColor, "#ffffff");
  const brandName = content.brandName || "MOOD SHOP";
  const products = content.productCards?.length ? content.productCards : defaultProducts;
  const reviews = content.reviewCards?.length ? content.reviewCards : defaultReviews;
  const moodKeywords = content.moodKeywords?.length ? content.moodKeywords : [];
  const tiles = (moodKeywords.length ? moodKeywords : content.marqueeItems?.length ? content.marqueeItems : ["신상품", "베스트", "세일", "스타일"])
    .flatMap((item, index) => [
      { label: `${item} EDIT ${index + 1}` },
      { label: `${brandName} CURATION ${index + 1}` },
    ])
    .slice(0, 12);

  return {
    root: {
      props: {
        title: `${brandName} 쇼핑몰 초안`,
      },
    },
    content: [
      {
        type: "CommerceHeader",
        props: {
          id: "commerce-header",
          brandName,
          notice: "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
          backgroundColor,
          pointColor: safeColor(theme.primaryColor, "#3868ff"),
        },
      },
      {
        type: "CommerceHeroGrid",
        props: {
          id: "commerce-hero",
          badge: content.heroBadge || "오늘의 추천 컬렉션",
          title: content.heroTitle || "매일 입고 싶은\n감각적인 데일리 룩",
          description: content.heroDescription || "트렌드와 실용성을 함께 담은 셀렉트숍 메인 화면입니다.",
          primaryButtonText: content.primaryCtaLabel || "지금 쇼핑하기",
          secondaryButtonText: content.secondaryCtaLabel || "더 보기",
          backgroundColor: primaryColor,
          secondaryColor,
          textColor: accentColor,
          products: products.slice(0, 3).map((item, index) => ({
            category: index === 0 ? content.heroBadge || "오늘의 추천 컬렉션" : item.category,
            name: index === 0 ? content.heroTitle || item.name : item.name,
            description: index === 0 ? content.heroDescription || "" : content.bannerDescription || "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
          })),
        },
      },
      {
        type: "BrandTileGrid",
        props: {
          id: "brand-tiles",
          tiles,
          backgroundColor: surfaceColor,
          tileColor: "#ffffff",
        },
      },
      {
        type: "CommerceProductGrid",
        props: {
          id: "commerce-products",
          viewAllText: content.viewAllText || "View All",
          filters: (content.quickMenus?.length ? content.quickMenus : defaultQuickFilters.map((item) => item.label)).map((label) => ({ label })),
          eyebrow: content.featuredEyebrow || "베스트셀러",
          title: content.featuredTitle || "지금 가장 많이 보는 아이템",
          backgroundColor: surfaceColor,
          imageColor: secondaryColor,
          products: products.slice(0, 8),
        },
      },
      {
        type: "CommercePromoSection",
        props: {
          id: "commerce-promo",
          eyebrow: content.bannerEyebrow || "SPECIAL CURATION",
          title: content.bannerTitle || "이번 주 추천 브랜드",
          description: content.visualSummary
            ? `${content.bannerDescription || "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요."}\n\n${content.visualSummary}`
            : content.bannerDescription || "큐레이션된 스타일과 브랜드를 한 번에 확인해 보세요.",
          tags: (content.navItems?.length ? content.navItems : defaultSubNavigation.slice(1, 5).map((item) => item.label)).map((label) => ({ label })),
          backgroundColor,
          products: products.slice(0, 4),
        },
      },
      {
        type: "CommerceReviewSection",
        props: {
          id: "commerce-reviews",
          eyebrow: content.aboutEyebrow || "EDITORIAL NOTE",
          title: content.aboutTitle || "고객들이 남긴 이야기",
          description: content.aboutDescription || "브랜드의 분위기와 상품 경험을 리뷰로 보여줍니다.",
          backgroundColor,
          reviews,
        },
      },
      {
        type: "CommerceFooter",
        props: {
          id: "commerce-footer",
          brandName,
          description: content.footerDescription || "Web Vending Machine에서 제공하는 커머스형 쇼핑몰 템플릿입니다.",
          menuTitle: "MENU",
          menus: defaultFooterMenus,
          serviceTitle: "SERVICE",
          services: defaultFooterServices,
          supportTitle: "SUPPORT",
          supports: defaultFooterSupport,
          copyrightText: "© 2026 Web Vending Machine. All rights reserved.",
          backgroundColor: "#000000",
        },
      },
    ],
  };
}
