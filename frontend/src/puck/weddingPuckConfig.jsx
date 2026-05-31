const defaultServices = [
  {
    title: "Studio",
    subtitle: "스튜디오 촬영",
    description: "감성적인 콘셉트 촬영부터 본식 전 리허설 컷까지, 두 분의 분위기에 맞춘 웨딩 촬영을 제안합니다.",
  },
  {
    title: "Dress",
    subtitle: "드레스 셀렉",
    description: "로맨틱, 청순, 클래식, 머메이드까지 체형과 무드에 맞는 드레스 라인업을 준비했습니다.",
  },
  {
    title: "Makeup",
    subtitle: "헤어 · 메이크업",
    description: "또렷하지만 과하지 않게, 사진과 본식 모두 아름답게 남는 웨딩 메이크업을 완성합니다.",
  },
];

const defaultPackages = [
  {
    name: "Bloom Package",
    price: "89만원",
    badge: "기본",
    items: "스튜디오 촬영 1회\n드레스 피팅 2벌\n헤어 · 메이크업 1회",
  },
  {
    name: "Lace Signature",
    price: "149만원",
    badge: "BEST",
    items: "스튜디오 촬영 + 수정본\n드레스 피팅 4벌\n헤어 · 메이크업 리허설 포함",
  },
  {
    name: "Royal Wedding",
    price: "229만원",
    badge: "PREMIUM",
    items: "프리미엄 촬영 콘셉트 제안\n드레스 무제한 상담\n본식 당일 현장 케어",
  },
];

const defaultReviews = [
  {
    name: "김하린",
    role: "신부",
    text: "드레스 추천이 정말 세심했고, 메이크업도 과하지 않으면서 얼굴이 가장 예뻐 보이게 해주셨어요.",
  },
  {
    name: "박소윤",
    role: "예비부부",
    text: "상담할 때부터 취향을 정확히 이해해줘서 준비 과정이 훨씬 편했고, 결과도 너무 만족스러웠어요.",
  },
  {
    name: "이서현",
    role: "본식 진행",
    text: "본식 당일 동선과 디테일까지 체크해주셔서 긴장보다 설렘이 더 컸던 하루였어요.",
  },
];

const defaultProcessSteps = [
  {
    step: "01",
    title: "무드 상담",
    description: "원하는 사진 톤, 드레스 실루엣, 예식장 분위기를 함께 정리합니다.",
  },
  {
    step: "02",
    title: "스드메 구성",
    description: "예산과 일정에 맞춰 스튜디오, 드레스, 메이크업 조합을 제안합니다.",
  },
  {
    step: "03",
    title: "일정 확정",
    description: "촬영, 피팅, 리허설, 본식까지 필요한 일정을 한 번에 조율합니다.",
  },
  {
    step: "04",
    title: "당일 케어",
    description: "본식 동선과 스타일링 디테일을 확인하며 가장 빛나는 하루를 돕습니다.",
  },
];

const defaultGalleryItems = [
  { label: "Soft Bridal", tone: "#fff4f7" },
  { label: "Lace Detail", tone: "#f7eadf" },
  { label: "Studio Mood", tone: "#f6e7ee" },
  { label: "Makeup Glow", tone: "#fbf3ff" },
];

const lines = (value) =>
  String(value || "")
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);

const listToText = (items) => items.map((item) => item.label || item).join("\n");

export const weddingTemplateContent = {
  brandName: "Lumière Wedding",
  eyebrow: "BRIDAL STUDIO · DRESS · MAKEUP",
  heroTitle: "당신의 결혼식을\n가장 아름답게,\n빛나게 해드립니다",
  heroDescription: "스튜디오, 드레스, 헤어 · 메이크업, 본식 디렉팅까지 두 분의 취향과 예산에 맞춰 가장 설레는 웨딩 페이지를 제안합니다.",
  primaryButtonText: "패키지 보기",
  secondaryButtonText: "서비스 안내",
  servicesTitle: "예식의 순간마다\n우아하게 완성합니다",
  packagesTitle: "스드메 패키지",
  reviewsTitle: "고객 후기",
  ctaTitle: "당신의 취향을 담아\n가장 빛나는 하루를 준비합니다",
  ctaDescription: "화려함보다 잘 어울리는 아름다움, 유행보다 오래 기억될 무드를 제안합니다.",
  processTitle: "준비 과정도\n편안하게 이어집니다",
  galleryTitle: "웨딩 무드 미리보기",
  contactTitle: "무료 상담 예약",
  contactDescription: "예식 일정과 원하는 분위기를 남겨주시면 맞춤 스드메 구성을 제안해드립니다.",
  backgroundColor: "#fffafb",
  primaryColor: "#5e4652",
  accentColor: "#d77ea6",
  surfaceColor: "#fff4f7",
  services: defaultServices,
  packages: defaultPackages,
  reviews: defaultReviews,
  processSteps: defaultProcessSteps,
  galleryItems: defaultGalleryItems,
};

export const weddingPuckConfig = {
  components: {
    WeddingHeader: {
      fields: {
        brandName: { type: "text" },
        subtitle: { type: "text" },
        menus: { type: "textarea" },
        backgroundColor: { type: "text" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        brandName: weddingTemplateContent.brandName,
        subtitle: "Wedding Atelier",
        menus: "HOME\nSERVICES\nPACKAGES\nREVIEWS",
        backgroundColor: "#ffffff",
        primaryColor: weddingTemplateContent.primaryColor,
      },
      render: ({ brandName, subtitle, menus, backgroundColor, primaryColor }) => (
        <header className="border-b border-[#f0e5ea] px-6 py-5" style={{ backgroundColor }}>
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full text-xs font-black text-white" style={{ backgroundColor: primaryColor }}>
                L
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b199a4]">{subtitle}</p>
                <p className="text-xl font-black tracking-[-0.04em] text-[#4f3e47]">{brandName}</p>
              </div>
            </div>
            <nav className="hidden items-center gap-7 md:flex">
              {lines(menus).map((item) => (
                <span key={item} className="text-[13px] font-bold tracking-[0.08em] text-[#8f7884]">
                  {item}
                </span>
              ))}
            </nav>
          </div>
        </header>
      ),
    },

    WeddingHero: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "textarea" },
        description: { type: "textarea" },
        primaryButtonText: { type: "text" },
        secondaryButtonText: { type: "text" },
        backgroundColor: { type: "text" },
        primaryColor: { type: "text" },
        accentColor: { type: "text" },
      },
      defaultProps: {
        eyebrow: weddingTemplateContent.eyebrow,
        title: weddingTemplateContent.heroTitle,
        description: weddingTemplateContent.heroDescription,
        primaryButtonText: weddingTemplateContent.primaryButtonText,
        secondaryButtonText: weddingTemplateContent.secondaryButtonText,
        backgroundColor: weddingTemplateContent.backgroundColor,
        primaryColor: weddingTemplateContent.primaryColor,
        accentColor: weddingTemplateContent.accentColor,
      },
      render: ({ eyebrow, title, description, primaryButtonText, secondaryButtonText, backgroundColor, primaryColor, accentColor }) => (
        <section className="overflow-hidden px-6 py-20 md:px-10" style={{ backgroundColor }}>
          <div className="mx-auto grid w-full max-w-[1200px] gap-12 md:grid-cols-[1.05fr_0.95fr] md:items-center">
            <div>
              <div className="inline-flex rounded-full border border-[#f0dfe6] bg-white/80 px-4 py-2 text-[11px] font-black tracking-[0.15em] text-[#9f8591]">
                {eyebrow}
              </div>
              <h1 className="mt-6 text-[3.1rem] font-black leading-[1.02] tracking-[-0.07em] text-[#4f3e47] md:text-[4.8rem]">
                {lines(title).map((line, index) => (
                  <span key={`${line}-${index}`} className="block">
                    {line}
                  </span>
                ))}
              </h1>
              <p className="mt-5 max-w-[540px] whitespace-pre-line text-[15px] font-medium leading-[1.8] text-[#8f7884]">{description}</p>
              <div className="mt-8 flex flex-wrap gap-4">
                <span className="rounded-full px-7 py-3.5 text-[13px] font-bold text-white" style={{ backgroundColor: primaryColor }}>
                  {primaryButtonText}
                </span>
                <span className="rounded-full border border-[#e8d8df] bg-white px-7 py-3.5 text-[13px] font-bold text-[#7a6670]">
                  {secondaryButtonText}
                </span>
              </div>
            </div>
            <div className="rounded-[36px] border border-white/70 bg-gradient-to-br from-[#fff4f7] via-[#faedf2] to-[#f7eade] p-6 shadow-2xl shadow-[#ecd4dd]/60">
              <div className="flex aspect-[4/5] flex-col items-center justify-center rounded-[28px] border border-white/70 bg-white/45 p-8 text-center">
                <div className="relative flex h-64 w-52 items-center justify-center">
                  <div className="absolute top-5 h-12 w-12 rounded-full bg-white/95 shadow-sm" />
                  <div className="absolute top-16 h-12 w-16 rounded-[30px] bg-white/90 shadow-sm" />
                  <div className="absolute top-24 h-36 w-40 bg-white/95 shadow-lg" style={{ clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)", borderRadius: "28px" }} />
                  <div className="absolute bottom-4 h-10 w-44 rounded-full blur-md" style={{ backgroundColor: `${accentColor}55` }} />
                </div>
                <p className="mt-4 text-2xl font-black tracking-[-0.05em] text-[#5a4650]">Bridal Story</p>
                <p className="mt-2 text-sm font-bold text-[#9a828d]">Written In Bloom</p>
              </div>
            </div>
          </div>
        </section>
      ),
    },

    WeddingServices: {
      fields: {
        title: { type: "textarea" },
        services: {
          type: "array",
          min: 1,
          max: 6,
          getItemSummary: (item) => item.subtitle || item.title || "서비스",
          arrayFields: {
            title: { type: "text" },
            subtitle: { type: "text" },
            description: { type: "textarea" },
          },
          defaultItemProps: defaultServices[0],
        },
      },
      defaultProps: {
        title: weddingTemplateContent.servicesTitle,
        services: defaultServices,
      },
      render: ({ title, services = [] }) => (
        <section className="bg-white px-6 py-20 md:px-10">
          <div className="mx-auto w-full max-w-[1200px]">
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">OUR SERVICES</p>
            <h2 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-4xl">
              {lines(title).map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(services.length ? services : defaultServices).map((service, index) => (
                <article key={`${service.subtitle}-${index}`} className="rounded-[28px] bg-gradient-to-br from-[#fff3f7] to-[#f7eadf] p-6 shadow-sm">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-sm font-black text-[#8f6c7d]">0{index + 1}</div>
                  <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b18f9f]">{service.title}</p>
                  <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#56434c]">{service.subtitle}</h3>
                  <p className="mt-4 text-[14px] font-medium leading-[1.8] text-[#7d6872]">{service.description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingPackages: {
      fields: {
        title: { type: "text" },
        packages: {
          type: "array",
          min: 1,
          max: 6,
          getItemSummary: (item) => item.name || "패키지",
          arrayFields: {
            name: { type: "text" },
            price: { type: "text" },
            badge: { type: "text" },
            items: { type: "textarea" },
          },
          defaultItemProps: defaultPackages[0],
        },
      },
      defaultProps: {
        title: weddingTemplateContent.packagesTitle,
        packages: defaultPackages,
      },
      render: ({ title, packages = [] }) => (
        <section className="bg-[#fffafb] px-6 py-20 md:px-10">
          <div className="mx-auto w-full max-w-[1200px]">
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">PACKAGE</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#4f3e47]">{title}</h2>
            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {(packages.length ? packages : defaultPackages).map((item, index) => (
                <article key={`${item.name}-${index}`} className="rounded-[32px] bg-gradient-to-br from-[#fff8f1] to-[#f7eadf] p-7 shadow-sm">
                  <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#9f7f8f]">{item.badge}</span>
                  <h3 className="mt-5 text-3xl font-black tracking-[-0.05em] text-[#56434c]">{item.name}</h3>
                  <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#4f3e47]">{item.price}</p>
                  <div className="mt-6 space-y-3">
                    {lines(item.items).map((feature) => (
                      <div key={feature} className="rounded-2xl bg-white/75 px-4 py-3 text-[13px] font-semibold text-[#6f5a65]">{feature}</div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingProcess: {
      fields: {
        eyebrow: { type: "text" },
        title: { type: "textarea" },
        backgroundColor: { type: "text" },
        primaryColor: { type: "text" },
        steps: {
          type: "array",
          min: 1,
          max: 6,
          getItemSummary: (item) => item.title || item.step || "준비 과정",
          arrayFields: {
            step: { type: "text" },
            title: { type: "text" },
            description: { type: "textarea" },
          },
          defaultItemProps: defaultProcessSteps[0],
        },
      },
      defaultProps: {
        eyebrow: "BRIDAL PROCESS",
        title: weddingTemplateContent.processTitle,
        backgroundColor: "#5e4652",
        primaryColor: weddingTemplateContent.primaryColor,
        steps: defaultProcessSteps,
      },
      render: ({ eyebrow, title, backgroundColor, primaryColor, steps = [] }) => (
        <section className="px-6 py-20 text-white md:px-10" style={{ backgroundColor }}>
          <div className="mx-auto w-full max-w-[1200px]">
            <p className="text-[11px] font-bold tracking-[0.2em] text-white/55">{eyebrow}</p>
            <h2 className="mt-3 text-3xl font-black tracking-[-0.05em] md:text-5xl">
              {lines(title).map((line) => <span key={line} className="block">{line}</span>)}
            </h2>
            <div className="mt-10 grid gap-4 md:grid-cols-4">
              {(steps.length ? steps : defaultProcessSteps).map((item, index) => (
                <article key={`${item.step}-${item.title}-${index}`} className="rounded-[28px] border border-white/10 bg-white/10 p-5 backdrop-blur">
                  <p className="text-3xl font-black text-white/35">{item.step}</p>
                  <h3 className="mt-5 text-xl font-black tracking-[-0.04em]">{item.title}</h3>
                  <p className="mt-3 text-[13px] font-medium leading-6 text-white/70">{item.description}</p>
                  <div className="mt-5 h-1 rounded-full bg-white/15">
                    <div className="h-full rounded-full" style={{ width: `${Math.min((index + 1) * 24, 100)}%`, backgroundColor: primaryColor === backgroundColor ? "#ffffff" : primaryColor }} />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingGallery: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        items: {
          type: "array",
          min: 1,
          max: 8,
          getItemSummary: (item) => item.label || "무드컷",
          arrayFields: {
            label: { type: "text" },
            tone: { type: "text" },
          },
          defaultItemProps: defaultGalleryItems[0],
        },
      },
      defaultProps: {
        title: weddingTemplateContent.galleryTitle,
        description: "스튜디오, 드레스, 메이크업의 전체 톤을 한눈에 보여주는 무드 보드입니다.",
        items: defaultGalleryItems,
      },
      render: ({ title, description, items = [] }) => (
        <section className="bg-[#fffafb] px-6 py-20 md:px-10">
          <div className="mx-auto w-full max-w-[1200px]">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
              <div>
                <p className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">MOOD BOARD</p>
                <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#4f3e47]">{title}</h2>
              </div>
              <p className="max-w-[420px] whitespace-pre-line text-sm font-medium leading-7 text-[#8f7884]">{description}</p>
            </div>
            <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(items.length ? items : defaultGalleryItems).map((item, index) => (
                <article key={`${item.label}-${index}`} className="overflow-hidden rounded-[30px] border border-white/70 bg-white shadow-sm">
                  <div className="flex aspect-[4/5] items-center justify-center" style={{ background: `linear-gradient(135deg, ${item.tone || "#fff4f7"}, #ffffff)` }}>
                    <div className="h-28 w-20 rounded-t-full bg-white/80 shadow-lg" />
                  </div>
                  <p className="px-5 py-4 text-sm font-black tracking-[-0.02em] text-[#5d4752]">{item.label}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingReviews: {
      fields: {
        title: { type: "text" },
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
          defaultItemProps: defaultReviews[0],
        },
      },
      defaultProps: {
        title: weddingTemplateContent.reviewsTitle,
        reviews: defaultReviews,
      },
      render: ({ title, reviews = [] }) => (
        <section className="bg-white px-6 py-20 md:px-10">
          <div className="mx-auto w-full max-w-[1200px]">
            <p className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">BRIDAL REVIEW</p>
            <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#4f3e47]">{title}</h2>
            <div className="mt-10 grid gap-5 md:grid-cols-3">
              {(reviews.length ? reviews : defaultReviews).map((review, index) => (
                <article key={`${review.name}-${index}`} className="rounded-[28px] border border-[#f2e5ea] bg-white p-6 shadow-sm">
                  <p className="text-3xl font-black text-[#efccd9]">"</p>
                  <p className="mt-2 text-[14px] font-medium leading-[1.8] text-[#735f69]">{review.text}</p>
                  <p className="mt-5 text-[13px] font-bold text-[#5d4752]">{review.name}</p>
                  <p className="text-[11px] font-medium text-[#b199a4]">{review.role}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingCTA: {
      fields: {
        title: { type: "textarea" },
        description: { type: "textarea" },
        buttonText: { type: "text" },
        backgroundColor: { type: "text" },
      },
      defaultProps: {
        title: weddingTemplateContent.ctaTitle,
        description: weddingTemplateContent.ctaDescription,
        buttonText: "패키지 상담하기",
        backgroundColor: weddingTemplateContent.primaryColor,
      },
      render: ({ title, description, buttonText, backgroundColor }) => (
        <section className="px-6 py-20 text-center text-white md:px-10 md:py-24" style={{ backgroundColor }}>
          <p className="text-[11px] font-bold tracking-[0.2em] text-white/55">SIGNATURE MESSAGE</p>
          <h2 className="mt-4 text-3xl font-black tracking-[-0.05em] md:text-5xl">
            {lines(title).map((line) => <span key={line} className="block">{line}</span>)}
          </h2>
          <p className="mx-auto mt-5 max-w-[560px] whitespace-pre-line text-sm font-medium leading-7 text-white/75">{description}</p>
          <span className="mt-8 inline-flex rounded-full bg-white px-8 py-3.5 text-[13px] font-black text-[#5d4752]">{buttonText}</span>
        </section>
      ),
    },

    WeddingContact: {
      fields: {
        title: { type: "text" },
        description: { type: "textarea" },
        phoneLabel: { type: "text" },
        kakaoLabel: { type: "text" },
        backgroundColor: { type: "text" },
      },
      defaultProps: {
        title: weddingTemplateContent.contactTitle,
        description: weddingTemplateContent.contactDescription,
        phoneLabel: "전화 상담",
        kakaoLabel: "카카오 문의",
        backgroundColor: weddingTemplateContent.surfaceColor,
      },
      render: ({ title, description, phoneLabel, kakaoLabel, backgroundColor }) => (
        <section className="px-6 py-20 md:px-10" style={{ backgroundColor }}>
          <div className="mx-auto grid w-full max-w-[1200px] gap-6 rounded-[36px] bg-white/75 p-7 shadow-sm md:grid-cols-[1.2fr_0.8fr] md:p-10">
            <div>
              <p className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">CONTACT</p>
              <h2 className="mt-2 text-4xl font-black tracking-[-0.05em] text-[#4f3e47]">{title}</h2>
              <p className="mt-4 max-w-[560px] whitespace-pre-line text-sm font-medium leading-7 text-[#8f7884]">{description}</p>
            </div>
            <div className="grid content-center gap-3">
              {[phoneLabel, kakaoLabel].map((label) => (
                <div key={label} className="rounded-2xl border border-[#f0e5ea] bg-white px-5 py-4 text-sm font-black text-[#5d4752]">
                  {label}
                </div>
              ))}
            </div>
          </div>
        </section>
      ),
    },

    WeddingFooter: {
      fields: {
        brandName: { type: "text" },
        description: { type: "textarea" },
        primaryColor: { type: "text" },
      },
      defaultProps: {
        brandName: weddingTemplateContent.brandName,
        description: "당신의 결혼식을 가장 아름답게 빛나게 해드리는 스드메 전문 웨딩 템플릿",
        primaryColor: weddingTemplateContent.primaryColor,
      },
      render: ({ brandName, description, primaryColor }) => (
        <footer className="border-t border-[#f0e5ea] bg-white px-6 py-14 md:px-10">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-lg font-black tracking-[-0.04em] text-[#4f3e47]">{brandName}</p>
              <p className="mt-3 max-w-[420px] whitespace-pre-line text-[13px] font-medium leading-[1.8] text-[#9a828d]">{description}</p>
            </div>
            <div className="rounded-full px-5 py-3 text-xs font-black text-white" style={{ backgroundColor: primaryColor }}>
              상담 예약
            </div>
          </div>
        </footer>
      ),
    },
  },
};

export function createWeddingPuckDataFromTemplate(content = weddingTemplateContent) {
  const next = { ...weddingTemplateContent, ...content };

  return {
    root: {
      props: {
        title: `${next.brandName} 웨딩 초안`,
      },
    },
    content: [
      {
        type: "WeddingHeader",
        props: {
          id: "wedding-header",
          brandName: next.brandName,
          subtitle: "Wedding Atelier",
          menus: listToText(["HOME", "SERVICES", "PACKAGES", "REVIEWS"]),
          backgroundColor: "#ffffff",
          primaryColor: next.primaryColor,
        },
      },
      {
        type: "WeddingHero",
        props: {
          id: "wedding-hero",
          eyebrow: next.eyebrow,
          title: next.heroTitle,
          description: next.heroDescription,
          primaryButtonText: next.primaryButtonText,
          secondaryButtonText: next.secondaryButtonText,
          backgroundColor: next.backgroundColor,
          primaryColor: next.primaryColor,
          accentColor: next.accentColor,
        },
      },
      {
        type: "WeddingServices",
        props: {
          id: "wedding-services",
          title: next.servicesTitle,
          services: next.services,
        },
      },
      {
        type: "WeddingPackages",
        props: {
          id: "wedding-packages",
          title: next.packagesTitle,
          packages: next.packages,
        },
      },
      {
        type: "WeddingProcess",
        props: {
          id: "wedding-process",
          eyebrow: "BRIDAL PROCESS",
          title: next.processTitle,
          backgroundColor: next.primaryColor,
          primaryColor: next.accentColor,
          steps: next.processSteps,
        },
      },
      {
        type: "WeddingGallery",
        props: {
          id: "wedding-gallery",
          title: next.galleryTitle,
          description: "스튜디오, 드레스, 메이크업의 전체 톤을 한눈에 보여주는 무드 보드입니다.",
          items: next.galleryItems,
        },
      },
      {
        type: "WeddingReviews",
        props: {
          id: "wedding-reviews",
          title: next.reviewsTitle,
          reviews: next.reviews,
        },
      },
      {
        type: "WeddingCTA",
        props: {
          id: "wedding-cta",
          title: next.ctaTitle,
          description: next.ctaDescription,
          buttonText: "패키지 상담하기",
          backgroundColor: next.primaryColor,
        },
      },
      {
        type: "WeddingContact",
        props: {
          id: "wedding-contact",
          title: next.contactTitle,
          description: next.contactDescription,
          phoneLabel: "전화 상담",
          kakaoLabel: "카카오 문의",
          backgroundColor: next.surfaceColor,
        },
      },
      {
        type: "WeddingFooter",
        props: {
          id: "wedding-footer",
          brandName: next.brandName,
          description: "당신의 결혼식을 가장 아름답게 빛나게 해드리는 스드메 전문 웨딩 템플릿",
          primaryColor: next.primaryColor,
        },
      },
    ],
  };
}

export const initialWeddingPuckData = createWeddingPuckDataFromTemplate();
