import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

const PAGES = {
  home: "HOME",
  services: "SERVICES",
  packages: "PACKAGES",
  reviews: "REVIEWS",
};

const services = [
  {
    id: 1,
    title: "Studio",
    subtitle: "스튜디오 촬영",
    desc: "감성적인 콘셉트 촬영부터 본식 전 리허설 컷까지, 두 분의 분위기에 맞춘 웨딩 촬영을 제안합니다.",
    accent: "from-[#fff1f6] to-[#f8dfe9]",
  },
  {
    id: 2,
    title: "Dress",
    subtitle: "드레스 셀렉",
    desc: "로맨틱, 청순, 클래식, 머메이드까지 체형과 무드에 맞는 드레스 라인업을 준비했습니다.",
    accent: "from-[#fff7f1] to-[#f5e5d8]",
  },
  {
    id: 3,
    title: "Makeup",
    subtitle: "헤어 · 메이크업",
    desc: "또렷하지만 과하지 않게, 사진과 본식 모두 아름답게 남는 웨딩 메이크업을 완성합니다.",
    accent: "from-[#fbf3ff] to-[#eddcf8]",
  },
  {
    id: 4,
    title: "Wedding Day",
    subtitle: "본식 디렉팅",
    desc: "부케, 베일, 입장 동선, 현장 톤까지 세심하게 체크해 가장 빛나는 하루를 도와드립니다.",
    accent: "from-[#fff6f8] to-[#f6e7ee]",
  },
];

const packages = [
  {
    id: 1,
    name: "Bloom Package",
    price: "89만원",
    badge: "기본",
    tone: "from-[#fff3f7] to-[#f9e9f0]",
    items: [
      "스튜디오 촬영 1회",
      "드레스 피팅 2벌",
      "헤어 · 메이크업 1회",
      "상담 리포트 제공",
    ],
  },
  {
    id: 2,
    name: "Lace Signature",
    price: "149만원",
    badge: "BEST",
    tone: "from-[#fff8f1] to-[#f7eadf]",
    items: [
      "스튜디오 촬영 + 수정본",
      "드레스 피팅 4벌",
      "헤어 · 메이크업 리허설 포함",
      "부케 · 베일 스타일링 제안",
    ],
  },
  {
    id: 3,
    name: "Royal Wedding",
    price: "229만원",
    badge: "PREMIUM",
    tone: "from-[#faf2ff] to-[#f0e2fa]",
    items: [
      "프리미엄 촬영 콘셉트 제안",
      "드레스 무제한 상담",
      "본식 당일 헤메 · 현장 케어",
      "전체 일정 전담 디렉팅",
    ],
  },
];

const reviews = [
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

function FlowerBadge() {
  return (
    <div className="relative h-14 w-14">
      <span className="absolute left-1/2 top-0 h-5 w-5 -translate-x-1/2 rounded-full bg-white/80 border border-white/70" />
      <span className="absolute left-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white/80 border border-white/70" />
      <span className="absolute right-0 top-1/2 h-5 w-5 -translate-y-1/2 rounded-full bg-white/80 border border-white/70" />
      <span className="absolute bottom-0 left-1/2 h-5 w-5 -translate-x-1/2 rounded-full bg-white/80 border border-white/70" />
      <span className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#f0cddb]" />
    </div>
  );
}

export default function WeddingTemplate() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [page, setPage] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

  const handleStart = () => {
    navigate(isLoggedIn ? "/ai-editor" : "/signup");
  };

  useEffect(() => {
    const handleScroll = () => {
      const el = document.getElementById("template-scroll-container");
      if (!el) return;
      setScrolled(el.scrollTop > 60);
      setShowCTA(el.scrollTop > 320);
    };

    const el = document.getElementById("template-scroll-container");
    if (el) el.addEventListener("scroll", handleScroll);

    return () => {
      if (el) el.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="min-h-screen bg-[#fffafb] pt-20 text-[#4f3e47]">
      <div
        id="template-scroll-container"
        className="h-[calc(100vh-80px)] overflow-y-auto"
      >
        <div className="sticky top-0 z-50 flex items-center justify-center gap-3 border-b border-[#f0e5ea] bg-white/95 px-4 py-2 backdrop-blur">
          <span className="text-xs font-semibold text-[#9d8a95]">스드메 템플릿 미리보기</span>
          <span className="text-[#d8c8cf]">·</span>
          <Link
            to="/templates"
            className="text-xs font-bold text-[#6d5963] underline underline-offset-2 hover:text-[#4f3e47]"
          >
            목록으로
          </Link>
        </div>

        <nav
          className={`sticky top-[37px] z-40 transition-all duration-300 ${
            scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"
          }`}
        >
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
            <button onClick={() => setPage("home")} className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-[#5e4652] text-[11px] font-black text-white">
                L
              </div>
              <div className="text-left">
                <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-[#b199a4]">
                  Wedding Atelier
                </p>
                <p className="text-lg font-black tracking-[-0.04em] text-[#4f3e47]">
                  Lumière
                </p>
              </div>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {Object.entries(PAGES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className={`text-[13px] font-semibold tracking-[0.05em] transition ${
                    page === key
                      ? "text-[#4f3e47]"
                      : "text-[#b49daa] hover:text-[#6c5862]"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button className="rounded-full border border-[#eadde3] px-4 py-2 text-[12px] font-bold text-[#7a6670] transition hover:border-[#d9c3cd] hover:text-[#4f3e47]">
                상담문의
              </button>
              <button className="rounded-full bg-[#5e4652] px-5 py-2 text-[12px] font-bold text-white shadow-lg shadow-[#5e4652]/15 transition hover:-translate-y-0.5">
                예약하기
              </button>
            </div>
          </div>
        </nav>

        {page === "home" && (
          <>
            <section className="relative overflow-hidden">
              <div className="pointer-events-none absolute left-[-60px] top-20 h-56 w-56 rounded-full bg-[#f8dfe9]/60 blur-3xl" />
              <div className="pointer-events-none absolute right-[-40px] top-10 h-64 w-64 rounded-full bg-[#f7eadc]/70 blur-3xl" />

              <div className="mx-auto flex w-full max-w-[1200px] flex-col px-6 pb-20 pt-12 md:flex-row md:items-center md:px-10 md:pb-28 md:pt-20">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#f0dfe6] bg-white/80 px-4 py-1.5">
                    <span className="h-2 w-2 rounded-full bg-[#e6b6c9]" />
                    <span className="text-[11px] font-bold tracking-[0.15em] text-[#9f8591]">
                      BRIDAL STUDIO · DRESS · MAKEUP
                    </span>
                  </div>

                  <h1 className="mt-6 text-[3.2rem] font-black leading-[1.02] tracking-[-0.07em] text-[#4f3e47] md:text-[4.8rem]">
                    당신의 결혼식을
                    <br />
                    가장 아름답게,
                    <br />
                    <span className="bg-gradient-to-r from-[#d77ea6] via-[#c993b0] to-[#c9a17a] bg-clip-text text-transparent">
                      빛나게 해드립니다
                    </span>
                  </h1>

                  <p className="mt-5 max-w-[430px] text-[15px] font-medium leading-[1.8] text-[#8f7884]">
                    스튜디오, 드레스, 헤어 · 메이크업, 본식 디렉팅까지.
                    <br />
                    두 분의 취향과 예산에 맞춰 가장 설레는 웨딩 페이지를 제안합니다.
                  </p>

                  <div className="mt-8 flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => setPage("packages")}
                      className="rounded-full bg-[#5e4652] px-7 py-3.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-xl hover:shadow-[#5e4652]/20"
                    >
                      패키지 보기 →
                    </button>
                    <button
                      onClick={() => setPage("services")}
                      className="rounded-full border border-[#e8d8df] bg-white px-7 py-3.5 text-[13px] font-bold text-[#7a6670] transition hover:-translate-y-0.5 hover:border-[#d9c3cd]"
                    >
                      서비스 안내
                    </button>
                  </div>

                  <div className="mt-10 grid max-w-[520px] grid-cols-2 gap-4 md:grid-cols-4">
                    {["1:1 무드 상담", "드레스 · 헤메 제안", "촬영 · 본식 일정 조율", "당일 디렉팅 진행"].map((item, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl border border-[#f0e3e8] bg-white/85 px-4 py-4 shadow-sm"
                      >
                        <p className="text-[12px] font-bold leading-[1.5] text-[#7d6872]">
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="mt-12 flex-1 md:mt-0 md:pl-10">
                  <div className="relative mx-auto w-full max-w-[460px]">
                    <div className="rounded-[36px] border border-white/60 bg-gradient-to-br from-[#fff4f7] via-[#faedf2] to-[#f7eade] p-5 shadow-2xl shadow-[#ecd4dd]/60">
                      <div className="relative aspect-[4/5] overflow-hidden rounded-[28px] border border-white/60 bg-white/45 p-5 backdrop-blur">
                        <div className="absolute right-3 top-3">
                          <FlowerBadge />
                        </div>

                        <div className="flex h-full flex-col justify-between">
                          <div className="flex items-center justify-between">
                            <span className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.15em] text-[#9f8591]">
                              LUMIÈRE BRIDAL
                            </span>
                            <span className="text-[11px] font-bold text-[#c49aaa]">
                              2026 COLLECTION
                            </span>
                          </div>

                          <div className="flex flex-col items-center justify-center">
                            <div className="relative flex h-64 w-52 items-center justify-center">
                              <div className="absolute top-5 h-12 w-12 rounded-full bg-white/90 shadow-sm" />
                              <div className="absolute top-16 h-12 w-16 rounded-[30px] bg-white/85 shadow-sm" />
                              <div
                                className="absolute top-24 h-36 w-40 bg-white/90 shadow-lg"
                                style={{
                                  clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)",
                                  borderRadius: "28px",
                                }}
                              />
                              <div className="absolute bottom-4 h-10 w-44 rounded-full bg-[#f2d6e3]/60 blur-md" />
                            </div>

                            <h3 className="mt-3 text-center text-2xl font-black tracking-[-0.05em] text-[#5a4650]">
                              Bridal Story,
                              <br />
                              Written In Bloom
                            </h3>
                            <p className="mt-2 text-center text-[13px] font-medium leading-[1.7] text-[#9a828d]">
                              로맨틱한 꽃결과 레이스 무드를 담은
                              <br />
                              스드메 홈페이지 템플릿
                            </p>
                          </div>

                          <div className="grid grid-cols-3 gap-3">
                            {["Studio", "Dress", "Makeup"].map((item) => (
                              <div
                                key={item}
                                className="rounded-2xl border border-white/60 bg-white/70 px-3 py-3 text-center"
                              >
                                <p className="text-[10px] font-bold tracking-[0.12em] text-[#a38894]">
                                  {item}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="absolute -bottom-5 -left-4 rounded-2xl bg-white/90 px-4 py-3 shadow-lg shadow-[#ead5de]/60">
                      <p className="text-[10px] font-bold tracking-[0.12em] text-[#b28b9c]">
                        PREMIUM BRIDAL
                      </p>
                      <p className="mt-1 text-sm font-black text-[#5a4650]">
                        웨딩 무드 맞춤 제안
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            <section className="border-y border-[#f2e6eb] bg-white/65 py-4">
              <div className="mx-auto flex w-full max-w-[1200px] flex-wrap items-center justify-center gap-5 px-6 text-center md:px-10">
                <span className="text-sm font-bold tracking-[0.18em] text-[#ccb2bd]">STUDIO</span>
                <span className="text-[#e4d4db]">✦</span>
                <span className="text-sm font-bold tracking-[0.18em] text-[#ccb2bd]">DRESS</span>
                <span className="text-[#e4d4db]">✦</span>
                <span className="text-sm font-bold tracking-[0.18em] text-[#ccb2bd]">MAKEUP</span>
                <span className="text-[#e4d4db]">✦</span>
                <span className="text-sm font-bold tracking-[0.18em] text-[#ccb2bd]">WEDDING DAY</span>
              </div>
            </section>

            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">
                    OUR SERVICES
                  </span>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-4xl">
                    예식의 순간마다
                    <br />
                    우아하게 완성합니다
                  </h2>
                </div>
                <button
                  onClick={() => setPage("services")}
                  className="text-[13px] font-bold text-[#8d7581] underline underline-offset-4 transition hover:text-[#5a4650]"
                >
                  자세히 보기 →
                </button>
              </div>

              <div className="mt-10 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
                {services.map((service) => (
                  <article
                    key={service.id}
                    className={`rounded-[28px] bg-gradient-to-br ${service.accent} p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white/80 text-sm font-black text-[#8f6c7d] shadow-sm">
                      0{service.id}
                    </div>
                    <p className="mt-6 text-[11px] font-bold uppercase tracking-[0.18em] text-[#b18f9f]">
                      {service.title}
                    </p>
                    <h3 className="mt-2 text-2xl font-black tracking-[-0.04em] text-[#56434c]">
                      {service.subtitle}
                    </h3>
                    <p className="mt-4 text-[14px] font-medium leading-[1.8] text-[#7d6872]">
                      {service.desc}
                    </p>
                  </article>
                ))}
              </div>
            </section>

            <section className="relative overflow-hidden bg-[#5d4752] px-6 py-20 text-center md:px-10 md:py-24">
              <div className="pointer-events-none absolute -left-20 top-0 h-72 w-72 rounded-full bg-[#ffffff]/5 blur-3xl" />
              <div className="pointer-events-none absolute -right-24 bottom-0 h-72 w-72 rounded-full bg-[#f8dfe9]/10 blur-3xl" />
              <span className="text-[11px] font-bold tracking-[0.2em] text-[#d5bcc8]">
                SIGNATURE MESSAGE
              </span>
              <h3 className="mt-4 text-3xl font-black tracking-[-0.05em] text-white md:text-5xl">
                당신의 취향을 담아
                <br />
                가장 빛나는 하루를 준비합니다
              </h3>
              <p className="mt-4 text-sm font-medium leading-[1.8] text-[#eadbe2]">
                화려함보다 잘 어울리는 아름다움,
                <br />
                유행보다 오래 기억될 무드를 제안합니다
              </p>
              <button
                onClick={() => setPage("packages")}
                className="mt-8 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold text-[#5d4752] transition hover:-translate-y-0.5"
              >
                패키지 확인하기
              </button>
            </section>

            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <span className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">
                BRIDAL REVIEW
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-4xl">
                고객 후기
              </h2>

              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((review, idx) => (
                  <div
                    key={idx}
                    className="rounded-[28px] border border-[#f2e5ea] bg-white p-6 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    <div className="flex gap-1 text-[#e9b85b]">
                      {[...Array(5)].map((_, i) => (
                        <span key={i}>★</span>
                      ))}
                    </div>
                    <p className="mt-4 text-[14px] font-medium leading-[1.8] text-[#735f69]">
                      "{review.text}"
                    </p>
                    <div className="mt-5 flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-gradient-to-br from-[#f9e4ed] to-[#f3d9e4]" />
                      <div>
                        <p className="text-[13px] font-bold text-[#5d4752]">{review.name}</p>
                        <p className="text-[11px] font-medium text-[#b199a4]">{review.role}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </>
        )}

        {page === "services" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">
                SERVICE DETAILS
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-5xl">
                스드메 서비스 안내
              </h2>
              <p className="mt-3 text-sm font-medium leading-[1.8] text-[#8f7884]">
                상담부터 본식 당일까지, 취향과 일정에 맞춘 웨딩 플로우를 제공합니다.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-2">
              {services.map((service) => (
                <div
                  key={service.id}
                  className={`rounded-[32px] bg-gradient-to-br ${service.accent} p-7 shadow-sm`}
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-bold tracking-[0.16em] text-[#b18f9f]">
                        SERVICE 0{service.id}
                      </p>
                      <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#56434c]">
                        {service.subtitle}
                      </h3>
                    </div>
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/80 text-sm font-black text-[#926f80]">
                      ♥
                    </div>
                  </div>
                  <p className="mt-5 text-[15px] font-medium leading-[1.85] text-[#7b6570]">
                    {service.desc}
                  </p>
                  <div className="mt-6 rounded-2xl bg-white/70 px-5 py-4">
                    <p className="text-[13px] font-bold text-[#5f4a54]">추천 포인트</p>
                    <p className="mt-2 text-[13px] font-medium leading-[1.7] text-[#8a7480]">
                      예산, 예식장 분위기, 원하는 사진 톤, 드레스 실루엣까지 함께 고려해
                      맞춤형 구성을 제안합니다.
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        )}

        {page === "packages" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">
                PACKAGE
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-5xl">
                스드메 패키지
              </h2>
              <p className="mt-3 text-sm font-medium leading-[1.8] text-[#8f7884]">
                기본형부터 프리미엄 디렉팅까지 예산대별로 선택할 수 있습니다.
              </p>
            </div>

            <div className="mt-10 grid gap-6 lg:grid-cols-3">
              {packages.map((item) => (
                <article
                  key={item.id}
                  className={`relative rounded-[32px] bg-gradient-to-br ${item.tone} p-7 shadow-sm transition hover:-translate-y-1 hover:shadow-lg`}
                >
                  <span className="absolute right-6 top-6 rounded-full bg-white/80 px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#9f7f8f]">
                    {item.badge}
                  </span>

                  <p className="text-[11px] font-bold tracking-[0.16em] text-[#b18f9f]">
                    PACKAGE 0{item.id}
                  </p>
                  <h3 className="mt-2 text-3xl font-black tracking-[-0.05em] text-[#56434c]">
                    {item.name}
                  </h3>
                  <p className="mt-3 text-4xl font-black tracking-[-0.04em] text-[#4f3e47]">
                    {item.price}
                  </p>

                  <div className="mt-6 space-y-3">
                    {item.items.map((feature, idx) => (
                      <div
                        key={idx}
                        className="rounded-2xl bg-white/75 px-4 py-3 text-[13px] font-semibold text-[#6f5a65]"
                      >
                        {feature}
                      </div>
                    ))}
                  </div>

                  <button className="mt-7 w-full rounded-full bg-[#5e4652] px-6 py-3.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5">
                    이 패키지 상담하기
                  </button>
                </article>
              ))}
            </div>
          </section>
        )}

        {page === "reviews" && (
          <section className="mx-auto w-full max-w-[1200px] px-6 pb-20 pt-8 md:px-10">
            <div>
              <span className="text-[11px] font-bold tracking-[0.15em] text-[#b89faa]">
                REAL REVIEW
              </span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-[#4f3e47] md:text-5xl">
                실제 고객 후기
              </h2>
              <p className="mt-3 text-sm font-medium leading-[1.8] text-[#8f7884]">
                예비부부가 직접 남긴 만족 후기를 담았습니다.
              </p>
            </div>

            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {reviews.map((review, idx) => (
                <div
                  key={idx}
                  className="rounded-[30px] border border-[#f1e4e9] bg-white p-7 shadow-sm"
                >
                  <p className="text-3xl font-black text-[#efccd9]">“</p>
                  <p className="mt-2 text-[15px] font-medium leading-[1.9] text-[#735f69]">
                    {review.text}
                  </p>
                  <div className="mt-6 h-px w-full bg-[#f2e6eb]" />
                  <div className="mt-5 flex items-center justify-between">
                    <div>
                      <p className="text-[14px] font-black text-[#5d4752]">{review.name}</p>
                      <p className="mt-1 text-[11px] font-medium text-[#b199a4]">{review.role}</p>
                    </div>
                    <div className="rounded-full bg-[#fff4f7] px-3 py-1 text-[10px] font-bold tracking-[0.14em] text-[#b1889a]">
                      VERIFIED
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 rounded-[32px] bg-gradient-to-r from-[#fff4f7] to-[#f8eee5] p-8">
              <h3 className="text-2xl font-black tracking-[-0.04em] text-[#56434c]">
                당신만의 웨딩 무드를 함께 찾아드릴게요
              </h3>
              <p className="mt-3 text-[14px] font-medium leading-[1.8] text-[#836e79]">
                원하는 분위기, 예산, 예식 일정만 알려주시면
                <br />
                맞춤형 스드메 구성을 빠르게 제안해드립니다.
              </p>
              <button className="mt-6 rounded-full bg-[#5e4652] px-7 py-3.5 text-[13px] font-bold text-white">
                무료 상담 예약
              </button>
            </div>
          </section>
        )}

        <footer className="border-t border-[#f0e5ea] bg-white px-6 py-14 md:px-10">
          <div className="mx-auto flex w-full max-w-[1200px] flex-col gap-8 md:flex-row md:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#5e4652] text-[10px] font-black text-white">
                  L
                </div>
                <div>
                  <p className="text-lg font-black tracking-[-0.04em] text-[#4f3e47]">
                    Lumière Wedding
                  </p>
                  <p className="text-[11px] font-bold tracking-[0.12em] text-[#b199a4]">
                    STUDIO · DRESS · MAKEUP
                  </p>
                </div>
              </div>
              <p className="mt-3 max-w-[320px] text-[13px] font-medium leading-[1.8] text-[#9a828d]">
                당신의 결혼식을 가장 아름답게 빛나게 해드리는
                <br />
                스드메 전문 웨딩 템플릿
              </p>
            </div>

            <div className="flex gap-12">
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#b89faa]">
                  SERVICE
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-[#8b7680]">
                  <span>Studio</span>
                  <span>Dress</span>
                  <span>Makeup</span>
                  <span>Wedding Day</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#b89faa]">
                  PACKAGE
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-[#8b7680]">
                  <span>Bloom</span>
                  <span>Lace Signature</span>
                  <span>Royal Wedding</span>
                </div>
              </div>
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-[#b89faa]">
                  CONTACT
                </p>
                <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-[#8b7680]">
                  <span>상담문의</span>
                  <span>예약안내</span>
                  <span>FAQ</span>
                  <span>Instagram</span>
                </div>
              </div>
            </div>
          </div>

          <div className="mx-auto mt-10 w-full max-w-[1200px] border-t border-[#f5ecef] pt-6">
            <p className="text-[11px] text-[#c7b2bc]">
              © 2026 Lumière Wedding. All rights reserved. — Web Vending Machine 템플릿
            </p>
          </div>
        </footer>
      </div>

      <div
        className={`fixed inset-x-0 bottom-8 z-50 flex justify-center transition-all duration-500 ${
          showCTA ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <button
          type="button"
          onClick={handleStart}
          className="flex items-center gap-2 rounded-full bg-[#5e4652] px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-[#5e4652]/25 transition hover:-translate-y-0.5"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white text-[9px] font-black text-[#5e4652]">
            W
          </span>
          이 템플릿으로 시작하기
        </button>
      </div>
    </div>
  );
}
