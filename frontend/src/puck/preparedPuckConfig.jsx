import { buildPreparedTemplateContent, getPreparedTemplateContent } from "./preparedTemplateContent";

const defaultContent = getPreparedTemplateContent("business");

const itemFields = {
  stats: {
    type: "array",
    min: 1,
    max: 4,
    getItemSummary: (item) => item.label || "지표",
    arrayFields: {
      label: { type: "text" },
      value: { type: "text" },
    },
  },
  features: {
    type: "array",
    min: 1,
    max: 6,
    getItemSummary: (item) => item.title || "섹션",
    arrayFields: {
      title: { type: "text" },
      description: { type: "textarea" },
    },
  },
  packages: {
    type: "array",
    min: 1,
    max: 6,
    getItemSummary: (item) => item.title || "카드",
    arrayFields: {
      title: { type: "text" },
      price: { type: "text" },
      description: { type: "textarea" },
    },
  },
  subpages: {
    type: "array",
    min: 1,
    max: 6,
    getItemSummary: (item) => item.label || "서브페이지",
    arrayFields: {
      label: { type: "text" },
      title: { type: "text" },
      description: { type: "textarea" },
    },
  },
  process: {
    type: "array",
    min: 1,
    max: 6,
    getItemSummary: (item) => item.label || "단계",
    arrayFields: {
      label: { type: "text" },
    },
  },
};

function sectionStyle(backgroundColor, textColor) {
  return { backgroundColor, color: textColor };
}

export const preparedPuckConfig = {
  components: {
    PreparedHeader: {
      fields: {
        brandName: { type: "text" },
        navItems: itemFields.process,
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        brandName: defaultContent.brandName,
        navItems: defaultContent.navItems.map((label) => ({ label })),
        backgroundColor: defaultContent.colors.surface,
        textColor: defaultContent.colors.ink,
        primaryColor: defaultContent.colors.primary,
      },
      render: ({ brandName, navItems = [], backgroundColor, textColor, primaryColor }) => (
        <header className="border-b border-black/10 px-5 py-4 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto flex max-w-[1320px] items-center justify-between gap-5">
            <p className="text-xl font-black">{brandName}</p>
            <nav className="hidden items-center gap-5 text-sm font-black opacity-70 md:flex">
              {navItems.map((item, index) => (
                <span key={`${item.label}-${index}`}>{item.label}</span>
              ))}
            </nav>
            <span className="rounded-lg px-4 py-2 text-xs font-black" style={{ backgroundColor: primaryColor }}>
              Start
            </span>
          </div>
        </header>
      ),
    },
    PreparedHero: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "textarea" },
        description: { type: "textarea" },
        primaryCta: { type: "text" },
        secondaryCta: { type: "text" },
        stats: itemFields.stats,
        backgroundColor: { type: "text" },
        surfaceColor: { type: "text" },
        textColor: { type: "text" },
        primaryColor: { type: "text" },
        accentColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: defaultContent.previewLabel,
        title: defaultContent.heroTitle,
        description: defaultContent.heroDescription,
        primaryCta: defaultContent.primaryCta,
        secondaryCta: defaultContent.secondaryCta,
        stats: defaultContent.stats,
        backgroundColor: defaultContent.colors.background,
        surfaceColor: defaultContent.colors.surface,
        textColor: defaultContent.colors.ink,
        primaryColor: defaultContent.colors.primary,
        accentColor: defaultContent.colors.accent,
      },
      render: ({ eyebrow, title, description, primaryCta, secondaryCta, stats = [], backgroundColor, surfaceColor, textColor, primaryColor, accentColor }) => (
        <section className="px-5 py-16 md:px-8 md:py-24" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1.05fr_0.95fr] lg:items-end">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] opacity-60">{eyebrow}</p>
              <h1 className="mt-5 max-w-4xl whitespace-pre-line break-keep text-5xl font-black leading-[1.02] md:text-7xl">
                {title}
              </h1>
              <p className="mt-6 max-w-2xl whitespace-pre-line break-keep text-base font-semibold leading-7 opacity-70 md:text-lg">
                {description}
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <span className="rounded-lg px-6 py-3 text-sm font-black" style={{ backgroundColor: primaryColor }}>
                  {primaryCta}
                </span>
                <span className="rounded-lg border border-current px-6 py-3 text-sm font-black opacity-75">
                  {secondaryCta}
                </span>
              </div>
            </div>
            <div className="rounded-lg border border-black/10 p-4 shadow-xl shadow-black/10" style={{ backgroundColor: surfaceColor }}>
              <div className="grid gap-3 sm:grid-cols-3">
                {stats.map((item, index) => (
                  <div key={`${item.label}-${index}`} className="rounded-lg border border-black/10 p-4">
                    <p className="text-xs font-black uppercase opacity-45">{item.label}</p>
                    <p className="mt-3 break-keep text-2xl font-black">{item.value}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 flex aspect-[1.4] items-end rounded-lg p-5" style={{ backgroundColor: accentColor }}>
                <p className="max-w-sm text-3xl font-black leading-tight text-black">
                  Structured pages, editable content, ready to publish.
                </p>
              </div>
            </div>
          </div>
        </section>
      ),
    },
    PreparedFeatureGrid: {
      fields: {
        title: { type: "text" },
        features: itemFields.features,
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
      },
      defaultProps: {
        title: "핵심 기능",
        features: defaultContent.features,
        backgroundColor: defaultContent.colors.surface,
        textColor: defaultContent.colors.ink,
      },
      render: ({ title, features = [], backgroundColor, textColor }) => (
        <section className="px-5 py-16 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto max-w-[1320px]">
            <h2 className="text-4xl font-black md:text-6xl">{title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {features.map((item, index) => (
                <article key={`${item.title}-${index}`} className="rounded-lg border border-black/10 p-6">
                  <p className="text-xs font-black opacity-35">0{index + 1}</p>
                  <h3 className="mt-8 text-2xl font-black">{item.title}</h3>
                  <p className="mt-4 text-sm font-semibold leading-6 opacity-65">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    PreparedSubpageGrid: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        subpages: itemFields.subpages,
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Detail Pages",
        title: "서브페이지 구성",
        subpages: Object.entries(defaultContent.subpages).map(([label, page]) => ({
          label,
          ...page,
        })),
        backgroundColor: defaultContent.colors.surface,
        textColor: defaultContent.colors.ink,
        primaryColor: defaultContent.colors.primary,
      },
      render: ({ eyebrow, title, subpages = [], backgroundColor, textColor, primaryColor }) => (
        <section className="px-5 py-16 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto max-w-[1320px]">
            <p className="text-xs font-black uppercase tracking-[0.16em] opacity-45">{eyebrow}</p>
            <h2 className="mt-3 text-4xl font-black md:text-6xl">{title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-4">
              {subpages.map((item, index) => (
                <article key={`${item.label}-${index}`} className="rounded-lg border border-black/10 bg-white p-5 text-black">
                  <p className="text-sm font-black" style={{ color: primaryColor }}>{item.label}</p>
                  <h3 className="mt-4 break-keep text-xl font-black">{item.title}</h3>
                  <p className="mt-3 break-keep text-sm font-semibold leading-6 opacity-65">{item.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    PreparedPackageGrid: {
      fields: {
        title: { type: "text" },
        packages: itemFields.packages,
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        title: "선택 가능한 구성",
        packages: defaultContent.packages,
        backgroundColor: defaultContent.colors.background,
        textColor: defaultContent.colors.ink,
        primaryColor: defaultContent.colors.primary,
      },
      render: ({ title, packages = [], backgroundColor, textColor, primaryColor }) => (
        <section className="px-5 py-16 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto max-w-[1320px]">
            <h2 className="text-4xl font-black md:text-6xl">{title}</h2>
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {packages.map((item, index) => (
                <article key={`${item.title}-${index}`} className="rounded-lg border border-black/10 bg-white p-6 text-black">
                  <p className="text-sm font-black opacity-45">{item.title}</p>
                  <p className="mt-5 text-4xl font-black">{item.price}</p>
                  <p className="mt-5 text-sm font-semibold leading-6 opacity-65">{item.description}</p>
                  <span className="mt-8 inline-flex rounded-lg px-4 py-2 text-xs font-black" style={{ backgroundColor: primaryColor }}>
                    자세히 보기
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    PreparedProcessSection: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "text" },
        process: itemFields.process,
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: "Process",
        title: "사용자가 따라가는 흐름",
        process: defaultContent.process.map((label) => ({ label })),
        backgroundColor: defaultContent.colors.surface,
        textColor: defaultContent.colors.ink,
        primaryColor: defaultContent.colors.primary,
      },
      render: ({ eyebrow, title, process = [], backgroundColor, textColor, primaryColor }) => (
        <section className="px-5 py-16 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto grid max-w-[1320px] gap-8 lg:grid-cols-[1fr_1fr] lg:items-center">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.16em] opacity-45">{eyebrow}</p>
              <h2 className="mt-3 text-4xl font-black md:text-6xl">{title}</h2>
            </div>
            <div className="grid gap-3">
              {process.map((item, index) => (
                <article key={`${item.label}-${index}`} className="flex items-center gap-4 rounded-lg border border-black/10 bg-white p-4 text-black">
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg text-sm font-black" style={{ backgroundColor: primaryColor }}>
                    {index + 1}
                  </span>
                  <p className="text-lg font-black">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },
    PreparedFooter: {
      fields: {
        brandName: { type: "text" },
        description: { type: "textarea" },
        backgroundColor: { type: "text" },
        textColor: { type: "text" },
      },
      defaultProps: {
        brandName: defaultContent.brandName,
        description: defaultContent.heroDescription,
        backgroundColor: defaultContent.colors.secondary,
        textColor: "#ffffff",
      },
      render: ({ brandName, description, backgroundColor, textColor }) => (
        <footer className="px-5 py-12 md:px-8" style={sectionStyle(backgroundColor, textColor)}>
          <div className="mx-auto flex max-w-[1320px] flex-col justify-between gap-8 md:flex-row">
            <div>
              <p className="text-2xl font-black">{brandName}</p>
              <p className="mt-4 max-w-xl whitespace-pre-line text-sm font-semibold leading-7 opacity-65">{description}</p>
            </div>
            <p className="text-xs font-black opacity-45">© 2026 Web Vending Machine.</p>
          </div>
        </footer>
      ),
    },
  },
};

export function createPreparedPuckDataFromTemplate(content = defaultContent) {
  const next =
    content.heroTitle && content.colors && content.navItems
      ? content
      : buildPreparedTemplateContent(content.templateType || "business", content);
  const colors = next.colors;

  return {
    root: {
      props: {
        title: `${next.brandName} ${next.category} 초안`,
      },
    },
    content: [
      {
        type: "PreparedHeader",
        props: {
          id: "prepared-header",
          brandName: next.brandName,
          navItems: next.navItems.map((label) => ({ label })),
          backgroundColor: colors.surface,
          textColor: colors.ink,
          primaryColor: colors.primary,
        },
      },
      {
        type: "PreparedHero",
        props: {
          id: "prepared-hero",
          eyebrow: next.previewLabel,
          title: next.heroTitle,
          description: next.heroDescription,
          primaryCta: next.primaryCta,
          secondaryCta: next.secondaryCta,
          stats: next.stats,
          backgroundColor: colors.background,
          surfaceColor: colors.surface,
          textColor: colors.ink,
          primaryColor: colors.primary,
          accentColor: colors.accent,
        },
      },
      {
        type: "PreparedFeatureGrid",
        props: {
          id: "prepared-features",
          title: "핵심 기능",
          features: next.features,
          backgroundColor: colors.surface,
          textColor: colors.ink,
        },
      },
      {
        type: "PreparedSubpageGrid",
        props: {
          id: "prepared-subpages",
          eyebrow: "Detail Pages",
          title: "서브페이지 구성",
          subpages: Object.entries(next.subpages).map(([label, page]) => ({
            label,
            ...page,
          })),
          backgroundColor: colors.surface,
          textColor: colors.ink,
          primaryColor: colors.primary,
        },
      },
      {
        type: "PreparedPackageGrid",
        props: {
          id: "prepared-packages",
          title: "선택 가능한 구성",
          packages: next.packages,
          backgroundColor: colors.background,
          textColor: colors.ink,
          primaryColor: colors.primary,
        },
      },
      {
        type: "PreparedProcessSection",
        props: {
          id: "prepared-process",
          eyebrow: "Process",
          title: "사용자가 따라가는 흐름",
          process: next.process.map((label) => ({ label })),
          backgroundColor: colors.surface,
          textColor: colors.ink,
          primaryColor: colors.primary,
        },
      },
      {
        type: "PreparedFooter",
        props: {
          id: "prepared-footer",
          brandName: next.brandName,
          description: next.heroDescription,
          backgroundColor: colors.secondary,
          textColor: "#ffffff",
        },
      },
    ],
  };
}

export const initialBusinessPuckData = createPreparedPuckDataFromTemplate(getPreparedTemplateContent("business"));
export const initialReservationPuckData = createPreparedPuckDataFromTemplate(getPreparedTemplateContent("reservation"));
export const initialBlogPuckData = createPreparedPuckDataFromTemplate(getPreparedTemplateContent("blog"));
