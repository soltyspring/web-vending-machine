export const neonTemplateContent = {
  brandName: "NEON DROP",
  eyebrow: "LAUNCH TEMPLATE",
  heroTitle: "새로운 브랜드를\n가장 크게 터뜨리는 첫 화면",
  heroDescription:
    "제품 출시, 앱 공개, 크리에이터 캠페인처럼 강한 첫인상이 필요한 페이지를 위해 만든 네온 무드 템플릿입니다.",
  primaryCta: "런칭 시작하기",
  secondaryCta: "하이라이트 보기",
  stats: [
    { label: "Launch", value: "D-07" },
    { label: "Signal", value: "98%" },
    { label: "Drop", value: "24H" },
  ],
  features: [
    {
      title: "강한 첫인상",
      description: "풀스크린 히어로와 큼직한 타이포로 방문자가 바로 기억하는 랜딩을 구성합니다.",
    },
    {
      title: "캠페인 흐름",
      description: "소개, 핵심 수치, 하이라이트, CTA가 한 번에 이어지도록 설계했습니다.",
    },
    {
      title: "모바일 집중",
      description: "작은 화면에서도 버튼과 핵심 메시지가 먼저 보이도록 밀도 있게 정리했습니다.",
    },
  ],
  highlights: [
    "Pre-order",
    "Creator Pack",
    "AI Showcase",
    "Limited Drop",
  ],
  ctaTitle: "지금 공개할 준비가 됐다면",
  ctaDescription: "네온 템플릿으로 첫 화면부터 강하게 밀어붙이세요.",
};

const lineBreak = (value) => String(value || "").split("\n");

const defaultStats = neonTemplateContent.stats;
const defaultFeatures = neonTemplateContent.features;
const defaultHighlights = neonTemplateContent.highlights;

export const neonPuckConfig = {
  components: {
    NeonHero: {
      fields: {
        brandName: { type: "text" },
        eyebrow: { type: "text" },
        title: { type: "textarea" },
        description: { type: "textarea" },
        primaryCta: { type: "text" },
        secondaryCta: { type: "text" },
        stats: {
          type: "array",
          min: 1,
          max: 4,
          getItemSummary: (item) => item.label || "Stat",
          arrayFields: {
            label: { type: "text" },
            value: { type: "text" },
          },
          defaultItemProps: { label: "Signal", value: "100%" },
        },
      },
      defaultProps: {
        brandName: neonTemplateContent.brandName,
        eyebrow: neonTemplateContent.eyebrow,
        title: neonTemplateContent.heroTitle,
        description: neonTemplateContent.heroDescription,
        primaryCta: neonTemplateContent.primaryCta,
        secondaryCta: neonTemplateContent.secondaryCta,
        stats: defaultStats,
      },
      render: ({
        brandName,
        eyebrow,
        title,
        description,
        primaryCta,
        secondaryCta,
        stats = defaultStats,
      }) => (
        <section className="relative min-h-screen overflow-hidden bg-[#05060a] px-5 pb-16 pt-24 text-white md:px-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.28),transparent_34%),radial-gradient(circle_at_78%_18%,rgba(236,72,153,0.24),transparent_30%),radial-gradient(circle_at_50%_86%,rgba(163,230,53,0.18),transparent_32%)]" />
          <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:42px_42px]" />
          <div className="relative mx-auto flex min-h-[calc(100vh-160px)] w-full max-w-[1280px] flex-col justify-between">
            <header className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-cyan-300/60 bg-cyan-300/10 text-xs font-black text-cyan-200 shadow-[0_0_30px_rgba(34,211,238,0.35)]">
                  ND
                </span>
                <span className="text-sm font-black tracking-[0.24em] text-white/80">{brandName}</span>
              </div>
              <span className="rounded-full border border-white/15 px-4 py-2 text-xs font-black text-white/70">
                LIVE PREVIEW
              </span>
            </header>

            <div className="grid gap-10 py-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
              <div>
                <p className="text-xs font-black tracking-[0.32em] text-cyan-200">{eyebrow}</p>
                <h1 className="mt-5 max-w-4xl text-5xl font-black leading-[0.95] tracking-[-0.06em] md:text-7xl lg:text-8xl">
                  {lineBreak(title).map((line, index) => (
                    <span key={`${line}-${index}`}>
                      {line}
                      {index < lineBreak(title).length - 1 ? <br /> : null}
                    </span>
                  ))}
                </h1>
                <p className="mt-6 max-w-2xl text-base font-semibold leading-7 text-white/62 md:text-lg">
                  {description}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <span className="rounded-full bg-cyan-300 px-6 py-3 text-sm font-black text-black shadow-[0_0_36px_rgba(34,211,238,0.45)]">
                    {primaryCta}
                  </span>
                  <span className="rounded-full border border-white/20 px-6 py-3 text-sm font-black text-white">
                    {secondaryCta}
                  </span>
                </div>
              </div>

              <div className="relative min-h-[420px] rounded-[34px] border border-white/10 bg-white/[0.04] p-5 shadow-[0_30px_100px_rgba(0,0,0,0.55)] backdrop-blur">
                <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-fuchsia-400/30 blur-3xl" />
                <div className="absolute -bottom-8 left-10 h-32 w-32 rounded-full bg-cyan-300/25 blur-3xl" />
                <div className="relative flex h-full flex-col justify-between rounded-[28px] border border-white/10 bg-black/35 p-6">
                  <div className="grid grid-cols-3 gap-3">
                    {stats.map((item, index) => (
                      <div key={`${item.label}-${index}`} className="rounded-3xl border border-white/10 bg-white/[0.06] p-4">
                        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-white/35">
                          {item.label}
                        </p>
                        <p className="mt-3 text-2xl font-black text-white">{item.value}</p>
                      </div>
                    ))}
                  </div>
                  <div className="mt-8 aspect-[1.15] rounded-[30px] border border-cyan-200/25 bg-[conic-gradient(from_140deg,#22d3ee,#ec4899,#a3e635,#22d3ee)] p-[1px]">
                    <div className="flex h-full flex-col justify-between rounded-[29px] bg-[#070911] p-6">
                      <div className="flex items-center justify-between">
                        <span className="h-3 w-3 rounded-full bg-lime-300 shadow-[0_0_22px_rgba(190,242,100,0.9)]" />
                        <span className="text-xs font-black tracking-[0.2em] text-white/40">DROP CARD</span>
                      </div>
                      <div>
                        <p className="text-6xl font-black tracking-[-0.08em] text-white">01</p>
                        <p className="mt-2 text-sm font-bold leading-6 text-white/55">
                          움직이는 듯한 네온 패널로 런칭의 에너지를 보여줍니다.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    NeonFeatureGrid: {
      fields: {
        title: { type: "text" },
        features: {
          type: "array",
          min: 1,
          max: 6,
          getItemSummary: (item) => item.title || "Feature",
          arrayFields: {
            title: { type: "text" },
            description: { type: "textarea" },
          },
          defaultItemProps: { title: "Feature", description: "핵심 강점을 입력하세요." },
        },
      },
      defaultProps: {
        title: "왜 이 템플릿이 튀는가",
        features: defaultFeatures,
      },
      render: ({ title, features = defaultFeatures }) => (
        <section className="bg-[#05060a] px-5 py-20 text-white md:px-10">
          <div className="mx-auto max-w-[1280px]">
            <h2 className="max-w-3xl text-4xl font-black tracking-[-0.06em] md:text-6xl">{title}</h2>
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {features.map((item, index) => (
                <article key={`${item.title}-${index}`} className="rounded-[30px] border border-white/10 bg-white/[0.04] p-6">
                  <p className="text-xs font-black text-cyan-200">0{index + 1}</p>
                  <h3 className="mt-8 text-2xl font-black tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 text-white/55">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    NeonShowcase: {
      fields: {
        title: { type: "text" },
        highlights: {
          type: "array",
          min: 1,
          max: 8,
          getItemSummary: (item) => item.label || "Highlight",
          arrayFields: { label: { type: "text" } },
          defaultItemProps: { label: "Highlight" },
        },
      },
      defaultProps: {
        title: "한 화면에서 보이는 런칭 포인트",
        highlights: defaultHighlights.map((label) => ({ label })),
      },
      render: ({ title, highlights = defaultHighlights.map((label) => ({ label })) }) => (
        <section className="bg-lime-300 px-5 py-20 text-black md:px-10">
          <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <h2 className="text-5xl font-black leading-[0.95] tracking-[-0.07em] md:text-7xl">{title}</h2>
            <div className="grid gap-3 sm:grid-cols-2">
              {highlights.map((item, index) => (
                <div key={`${item.label}-${index}`} className="rounded-[26px] border-2 border-black bg-white px-5 py-6 shadow-[8px_8px_0_#000]">
                  <p className="text-xs font-black text-black/45">POINT {index + 1}</p>
                  <p className="mt-3 text-2xl font-black tracking-[-0.04em]">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    NeonCTA: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
      },
      defaultProps: {
        title: neonTemplateContent.ctaTitle,
        description: neonTemplateContent.ctaDescription,
        buttonText: neonTemplateContent.primaryCta,
      },
      render: ({ title, description, buttonText }) => (
        <section className="bg-[#05060a] px-5 py-24 text-white md:px-10">
          <div className="mx-auto max-w-[980px] rounded-[40px] border border-white/10 bg-white/[0.05] p-8 text-center shadow-[0_30px_100px_rgba(0,0,0,0.5)] md:p-14">
            <h2 className="text-4xl font-black tracking-[-0.06em] md:text-6xl">{title}</h2>
            <p className="mx-auto mt-5 max-w-2xl text-base font-semibold leading-7 text-white/55">{description}</p>
            <div className="mt-8 inline-flex rounded-full bg-white px-8 py-4 text-sm font-black text-black">
              {buttonText}
            </div>
          </div>
        </section>
      ),
    },
  },
};

export function createNeonPuckDataFromTemplate(content = neonTemplateContent) {
  const next = { ...neonTemplateContent, ...content };

  return {
    root: { props: {} },
    content: [
      {
        type: "NeonHero",
        props: {
          id: "neon-hero",
          brandName: next.brandName,
          eyebrow: next.eyebrow,
          title: next.heroTitle,
          description: next.heroDescription,
          primaryCta: next.primaryCta,
          secondaryCta: next.secondaryCta,
          stats: next.stats,
        },
      },
      {
        type: "NeonFeatureGrid",
        props: {
          id: "neon-features",
          title: "왜 이 템플릿이 튀는가",
          features: next.features,
        },
      },
      {
        type: "NeonShowcase",
        props: {
          id: "neon-showcase",
          title: "한 화면에서 보이는 런칭 포인트",
          highlights: next.highlights.map((label) => ({ label })),
        },
      },
      {
        type: "NeonCTA",
        props: {
          id: "neon-cta",
          title: next.ctaTitle,
          description: next.ctaDescription,
          buttonText: next.primaryCta,
        },
      },
    ],
  };
}

export const initialNeonPuckData = createNeonPuckDataFromTemplate();
