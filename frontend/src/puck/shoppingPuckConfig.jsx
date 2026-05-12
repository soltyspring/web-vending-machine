export const shoppingPuckConfig = {
  components: {
    HeroSection: {
      fields: {
        badge: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        primaryButtonText: { type: "text" },
        secondaryButtonText: { type: "text" },
        backgroundColor: { type: "text" },
        accentColor: { type: "text" },
        textColor: { type: "text" },
      },
      defaultProps: {
        badge: "AI GENERATED",
        title: "감각적인 데일리 룩",
        description: "사용자 입력을 바탕으로 만든 쇼핑몰 메인 초안입니다.",
        primaryButtonText: "지금 쇼핑하기",
        secondaryButtonText: "룩북 보기",
        backgroundColor: "#111214",
        accentColor: "#ff7a59",
        textColor: "#ffffff",
      },
      render: ({
        badge,
        title,
        description,
        primaryButtonText,
        secondaryButtonText,
        backgroundColor,
        accentColor,
        textColor,
      }) => (
        <section
          className="min-h-[520px] px-8 py-16"
          style={{
            background: `linear-gradient(135deg, ${backgroundColor}, ${accentColor})`,
            color: textColor,
          }}
        >
          <div className="mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[1fr_0.85fr]">
            <div>
              <p className="text-xs font-black tracking-[0.22em] opacity-70">{badge}</p>
              <h1 className="mt-5 max-w-2xl text-6xl font-black leading-[0.95] tracking-[-0.08em]">
                {title}
              </h1>
              <p className="mt-6 max-w-xl whitespace-pre-line text-base font-semibold leading-8 opacity-75">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <button className="rounded-full bg-white px-5 py-3 text-sm font-black text-black">
                  {primaryButtonText}
                </button>
                <button className="rounded-full border border-white/35 px-5 py-3 text-sm font-black">
                  {secondaryButtonText}
                </button>
              </div>
            </div>
            <div className="rounded-[2rem] bg-white/20 p-8 shadow-2xl shadow-black/20">
              <div className="flex aspect-[4/5] items-center justify-center rounded-[1.5rem] bg-white/20">
                <div className="h-28 w-28 rounded-3xl bg-white/60" />
              </div>
            </div>
          </div>
        </section>
      ),
    },

    ProductGrid: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
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
        eyebrow: "CURATED",
        title: "베스트 상품",
        backgroundColor: "#f6f6f7",
        textColor: "#111111",
        products: [],
      },
      render: ({ eyebrow, title, backgroundColor, textColor, products = [] }) => (
        <section className="px-8 py-16" style={{ backgroundColor, color: textColor }}>
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[0.18em] opacity-45">{eyebrow}</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{title}</h2>
            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {products.map((item, index) => (
                <article key={`${item.name}-${index}`}>
                  <div className="flex aspect-[4/5] items-center justify-center rounded-3xl bg-black/10 p-4">
                    <div className={`${index % 2 ? "rounded-full" : "rounded-3xl"} h-20 w-20 bg-white/70`} />
                  </div>
                  <div className="mt-4 flex items-center justify-between gap-2">
                    <p className="text-xs font-black opacity-40">{item.category}</p>
                    {item.badge ? (
                      <span className="rounded-full bg-black px-2 py-1 text-[10px] font-black text-white">
                        {item.badge}
                      </span>
                    ) : null}
                  </div>
                  <h3 className="mt-1 text-lg font-black tracking-[-0.04em]">{item.name}</h3>
                  <p className="mt-1 text-sm font-black opacity-70">{item.priceLabel}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    BannerSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: "SPECIAL OFFER",
        title: "이번 주 추천 기획전",
        description: "브랜드의 핵심 혜택과 메시지를 강조하는 배너입니다.",
        buttonText: "자세히 보기",
        backgroundColor: "#111214",
        textColor: "#ffffff",
      },
      render: ({ eyebrow, title, description, buttonText, backgroundColor, textColor }) => (
        <section className="px-8 py-12">
          <div
            className="mx-auto max-w-6xl rounded-[2rem] p-10 shadow-2xl shadow-black/10"
            style={{ backgroundColor, color: textColor }}
          >
            <p className="text-xs font-black tracking-[0.18em] opacity-55">{eyebrow}</p>
            <h2 className="mt-4 max-w-3xl text-5xl font-black leading-[0.98] tracking-[-0.07em]">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl whitespace-pre-line text-sm font-semibold leading-7 opacity-70">
              {description}
            </p>
            <button className="mt-8 rounded-full bg-white px-5 py-3 text-sm font-black text-black">
              {buttonText}
            </button>
          </div>
        </section>
      ),
    },

    BrandIntroSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        description: { type: "textarea" },
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: "BRAND STORY",
        title: "브랜드 소개",
        description: "브랜드가 전달하고 싶은 가치와 분위기를 설명합니다.",
        backgroundColor: "#ffffff",
        textColor: "#111111",
      },
      render: ({ eyebrow, title, description, backgroundColor, textColor }) => (
        <section className="px-8 py-16" style={{ backgroundColor, color: textColor }}>
          <div className="mx-auto max-w-6xl rounded-[2rem] border border-black/10 p-10">
            <p className="text-xs font-black tracking-[0.18em] opacity-45">{eyebrow}</p>
            <h2 className="mt-4 text-4xl font-black tracking-[-0.06em]">{title}</h2>
            <p className="mt-5 max-w-3xl whitespace-pre-line text-sm font-semibold leading-8 opacity-70">
              {description}
            </p>
          </div>
        </section>
      ),
    },

    ReviewSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
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
        eyebrow: "REVIEWS",
        title: "고객 후기",
        backgroundColor: "#111214",
        textColor: "#ffffff",
        reviews: [],
      },
      render: ({ eyebrow, title, backgroundColor, textColor, reviews = [] }) => (
        <section className="px-8 py-16" style={{ backgroundColor, color: textColor }}>
          <div className="mx-auto max-w-6xl">
            <p className="text-xs font-black tracking-[0.18em] opacity-45">{eyebrow}</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.06em]">{title}</h2>
            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {reviews.map((review, index) => (
                <article key={`${review.name}-${index}`} className="rounded-3xl bg-white/10 p-6">
                  <p className="text-lg font-black leading-7">"{review.text}"</p>
                  <p className="mt-6 text-sm font-black">{review.name}</p>
                  <p className="text-xs opacity-50">{review.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
  },
};

export const initialShoppingPuckData = {
  root: {
    props: {
      title: "무블리 AI 쇼핑몰 초안",
    },
  },
  content: [
    {
      type: "HeroSection",
      props: {
        id: "hero-1",
        badge: "MOOD SELECT",
        title: "매일 입고 싶은 감각적인 데일리 룩",
        description: "무블리만의 따뜻한 무드로 완성한 여성 의류 셀렉트샵 초안입니다.",
        primaryButtonText: "지금 쇼핑하기",
        secondaryButtonText: "룩북 보기",
        backgroundColor: "#191514",
        accentColor: "#f3b6a5",
        textColor: "#ffffff",
      },
    },
    {
      type: "ProductGrid",
      props: {
        id: "products-1",
        eyebrow: "CURATED",
        title: "지금 가장 많이 보는 아이템",
        backgroundColor: "#fff5ef",
        textColor: "#181412",
        products: [
          { category: "OUTER", name: "라이트 트렌치 코트", priceLabel: "129,000원", badge: "BEST" },
          { category: "TOP", name: "소프트 니트 탑", priceLabel: "59,000원", badge: "NEW" },
          { category: "BOTTOM", name: "와이드 코튼 팬츠", priceLabel: "74,000원", badge: "" },
          { category: "ACC", name: "미니 레더 백", priceLabel: "89,000원", badge: "BEST" },
        ],
      },
    },
    {
      type: "BannerSection",
      props: {
        id: "banner-1",
        eyebrow: "SPECIAL CURATION",
        title: "이번 주 무블리 단독 추천",
        description: "데일리룩에 바로 적용할 수 있는 컬러와 실루엣 중심으로 구성했습니다.",
        buttonText: "기획전 보기",
        backgroundColor: "#2b211f",
        textColor: "#ffffff",
      },
    },
    {
      type: "BrandIntroSection",
      props: {
        id: "brand-1",
        eyebrow: "BRAND STORY",
        title: "무블리의 스타일 제안",
        description: "과하지 않은 감도와 편안한 착용감을 기준으로 매일 입기 좋은 상품을 큐레이션합니다.",
        backgroundColor: "#ffffff",
        textColor: "#181412",
      },
    },
    {
      type: "ReviewSection",
      props: {
        id: "reviews-1",
        eyebrow: "REVIEWS",
        title: "고객들이 남긴 이야기",
        backgroundColor: "#181412",
        textColor: "#ffffff",
        reviews: [
          { name: "지은", role: "직장인", text: "색감이 과하지 않고 데일리로 입기 좋아요." },
          { name: "민서", role: "대학생", text: "상품 구성이 깔끔해서 원하는 옷을 찾기 쉬웠어요." },
          { name: "수진", role: "프리랜서", text: "따뜻한 분위기와 상품 이미지가 잘 어울려요." },
        ],
      },
    },
  ],
};
