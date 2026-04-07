import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

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

/* ───────── 메인 컴포넌트 ───────── */
export default function ShoppingTemplate() {
  const [page, setPage] = useState("home");
  const [shopCategory, setShopCategory] = useState("ALL");
  const [scrolled, setScrolled] = useState(false);
  const [showCTA, setShowCTA] = useState(false);

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

  const filteredProducts = shopCategory === "ALL" ? products : products.filter(p => p.category === shopCategory);

  return (
    <div className="relative min-h-screen bg-[#faf9f7]">
      {/* ── WVM 안내 바 ── */}
      <div className="fixed inset-x-0 top-20 z-50 flex items-center justify-center gap-3 border-b border-stone-200 bg-white/95 px-4 py-2 backdrop-blur">
        <span className="text-xs font-semibold text-stone-500">쇼핑몰 템플릿 미리보기</span>
        <span className="text-stone-300">·</span>
        <Link to="/templates" className="text-xs font-bold text-stone-700 underline underline-offset-2 hover:text-stone-900">
          목록으로
        </Link>
      </div>

      {/* ── 템플릿 콘텐츠 ── */}
      <div id="template-scroll-container" className="h-[calc(100vh-80px)] overflow-y-auto pt-10">

        {/* ── 쇼핑몰 NAV ── */}
        <nav className={`sticky top-0 z-40 transition-all duration-300 ${scrolled ? "bg-white/95 shadow-sm backdrop-blur" : "bg-transparent"}`}>
          <div className="mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-4 md:px-10">
            <button onClick={() => setPage("home")} className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-[10px] font-black text-white">M</div>
              <span className="text-xl font-black tracking-[-0.04em] text-stone-900">MOOD</span>
            </button>

            <div className="hidden items-center gap-8 md:flex">
              {Object.entries(PAGES).map(([key, label]) => (
                <button
                  key={key}
                  onClick={() => setPage(key)}
                  className={`text-[13px] font-semibold tracking-[0.04em] transition ${
                    page === key ? "text-stone-900" : "text-stone-400 hover:text-stone-600"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="flex items-center gap-5">
              <button className="text-xs font-semibold text-stone-500 transition hover:text-stone-900">검색</button>
              <button className="relative text-xs font-semibold text-stone-500 transition hover:text-stone-900">
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
              <div className="mx-auto flex w-full max-w-[1200px] flex-col px-6 pb-20 pt-12 md:flex-row md:items-center md:px-10 md:pb-28 md:pt-20">
                <div className="flex-1">
                  <div className="inline-flex items-center gap-2 rounded-full bg-stone-100 px-4 py-1.5">
                    <span className="h-1.5 w-1.5 rounded-full bg-rose-400"></span>
                    <span className="text-[11px] font-bold tracking-[0.12em] text-stone-500">2026 S/S COLLECTION</span>
                  </div>

                  <h1 className="mt-6 text-[3.2rem] font-black leading-[1.05] tracking-[-0.06em] text-stone-900 md:text-[4.5rem]">
                    당신의<br />무드에 맞는<br />
                    <span className="bg-gradient-to-r from-rose-400 to-amber-500 bg-clip-text text-transparent">스타일</span>
                  </h1>

                  <p className="mt-5 max-w-[360px] text-[15px] font-medium leading-[1.7] text-stone-400">
                    감각적인 큐레이션으로 완성하는<br />라이프스타일 쇼핑 경험
                  </p>

                  <div className="mt-8 flex items-center gap-4">
                    <button onClick={() => setPage("shop")} className="rounded-full bg-stone-900 px-7 py-3.5 text-[13px] font-bold text-white transition hover:-translate-y-0.5 hover:shadow-lg hover:shadow-stone-900/20">
                      SHOP NOW →
                    </button>
                    <button onClick={() => setPage("lookbook")} className="rounded-full border border-stone-300 px-7 py-3.5 text-[13px] font-bold text-stone-600 transition hover:-translate-y-0.5 hover:border-stone-400">
                      LOOKBOOK
                    </button>
                  </div>
                </div>

                <div className="mt-10 flex-1 md:mt-0 md:pl-10">
                  <div className="relative">
                    <div className="aspect-[3/4] w-full max-w-[420px] rounded-[28px] bg-gradient-to-br from-[#e8e0d8] to-[#d4c8bc] shadow-2xl shadow-stone-300/40">
                      <div className="flex h-full flex-col items-center justify-center gap-4 p-8">
                        <div className="h-40 w-40 rounded-3xl bg-white/40 shadow-inner"></div>
                        <span className="text-xs font-bold tracking-[0.15em] text-stone-500/60">FEATURED ITEM</span>
                      </div>
                    </div>
                    <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-2xl bg-gradient-to-br from-rose-200 to-amber-200 opacity-60 blur-sm"></div>
                    <div className="absolute -right-4 -top-4 h-20 w-20 rounded-xl bg-gradient-to-br from-stone-200 to-stone-300 opacity-40"></div>
                  </div>
                </div>
              </div>
            </section>

            {/* Marquee */}
            <div className="overflow-hidden border-y border-stone-200 bg-stone-50 py-3">
              <div className="flex animate-[marquee_20s_linear_infinite] gap-8 whitespace-nowrap">
                {[...Array(3)].map((_, i) => (
                  <span key={i} className="flex gap-8">
                    <span className="text-sm font-bold tracking-[0.1em] text-stone-300">FREE SHIPPING</span>
                    <span className="text-stone-200">✦</span>
                    <span className="text-sm font-bold tracking-[0.1em] text-stone-300">NEW ARRIVALS</span>
                    <span className="text-stone-200">✦</span>
                    <span className="text-sm font-bold tracking-[0.1em] text-stone-300">CURATED SELECTION</span>
                    <span className="text-stone-200">✦</span>
                    <span className="text-sm font-bold tracking-[0.1em] text-stone-300">MOOD LIFESTYLE</span>
                    <span className="text-stone-200">✦</span>
                  </span>
                ))}
              </div>
            </div>

            {/* Featured Products */}
            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <div className="flex items-end justify-between">
                <div>
                  <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">CURATED</span>
                  <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-4xl">Best Sellers</h2>
                </div>
                <button onClick={() => setPage("shop")} className="text-[13px] font-bold text-stone-500 underline underline-offset-4 transition hover:text-stone-900">
                  View All →
                </button>
              </div>

              <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {products.slice(0, 4).map((p) => (
                  <article key={p.id} className="group cursor-pointer">
                    <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-stone-200/60`}>
                      <div className="flex h-full items-center justify-center">
                        <div className="h-28 w-28 rounded-2xl bg-white/40 shadow-inner transition duration-300 group-hover:scale-105"></div>
                      </div>
                      {p.badge && (
                        <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white ${p.badge === "NEW" ? "bg-rose-400" : "bg-stone-800"}`}>
                          {p.badge}
                        </span>
                      )}
                      <div className="absolute inset-x-3 bottom-3 flex justify-between rounded-xl bg-white/80 px-3 py-2 opacity-0 backdrop-blur transition duration-300 group-hover:opacity-100">
                        <span className="text-[11px] font-bold text-stone-700">자세히 보기</span>
                        <span className="text-[11px] font-bold text-stone-400">→</span>
                      </div>
                    </div>
                    <div className="mt-3 px-0.5">
                      <p className="text-[10px] font-semibold tracking-[0.08em] text-stone-400">{p.category}</p>
                      <p className="mt-0.5 text-[15px] font-bold text-stone-800">{p.name}</p>
                      <p className="mt-0.5 text-base font-black text-stone-900">{p.price.toLocaleString()}원</p>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* Banner */}
            <section className="relative overflow-hidden bg-stone-900 px-6 py-20 text-center md:px-10 md:py-24">
              <div className="pointer-events-none absolute -left-20 -top-20 h-80 w-80 rounded-full bg-rose-500/10 blur-3xl"></div>
              <div className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-amber-500/10 blur-3xl"></div>
              <span className="text-[11px] font-bold tracking-[0.2em] text-stone-500">SPECIAL OFFER</span>
              <h3 className="mt-3 text-3xl font-black tracking-[-0.04em] text-white md:text-5xl">첫 구매 고객 10% 할인</h3>
              <p className="mt-3 text-sm font-medium text-stone-400">회원가입 후 첫 주문 시 자동 적용됩니다</p>
              <button className="mt-8 rounded-full bg-white px-8 py-3.5 text-[13px] font-bold text-stone-900 transition hover:-translate-y-0.5">
                회원가입 하기
              </button>
            </section>

            {/* Reviews */}
            <section className="mx-auto w-full max-w-[1200px] px-6 py-20 md:px-10">
              <span className="text-[11px] font-bold tracking-[0.15em] text-stone-400">REVIEWS</span>
              <h2 className="mt-1 text-3xl font-black tracking-[-0.05em] text-stone-900 md:text-4xl">고객 후기</h2>
              <div className="mt-10 grid gap-5 md:grid-cols-3">
                {reviews.map((r, i) => (
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
                  onClick={() => setShopCategory(cat)}
                  className={`shrink-0 rounded-full px-5 py-2.5 text-[12px] font-bold tracking-[0.04em] transition ${
                    shopCategory === cat
                      ? "bg-stone-900 text-white"
                      : "bg-stone-100 text-stone-500 hover:bg-stone-200"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {filteredProducts.map((p) => (
                <article key={p.id} className="group cursor-pointer">
                  <div className={`relative aspect-[3/4] overflow-hidden rounded-2xl bg-gradient-to-br ${p.gradient} transition duration-300 group-hover:-translate-y-1 group-hover:shadow-xl group-hover:shadow-stone-200/60`}>
                    <div className="flex h-full items-center justify-center">
                      <div className="h-28 w-28 rounded-2xl bg-white/40 shadow-inner transition duration-300 group-hover:scale-105"></div>
                    </div>
                    {p.badge && (
                      <span className={`absolute left-3 top-3 rounded-full px-3 py-1 text-[10px] font-bold text-white ${p.badge === "NEW" ? "bg-rose-400" : "bg-stone-800"}`}>
                        {p.badge}
                      </span>
                    )}
                  </div>
                  <div className="mt-3 px-0.5">
                    <p className="text-[10px] font-semibold tracking-[0.08em] text-stone-400">{p.category}</p>
                    <p className="mt-0.5 text-[15px] font-bold text-stone-800">{p.name}</p>
                    <p className="mt-0.5 text-base font-black text-stone-900">{p.price.toLocaleString()}원</p>
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
                <h3 className="text-2xl font-black tracking-[-0.04em] text-stone-900">감각적인 큐레이션,<br />MOOD가 제안합니다</h3>
                <p className="mt-5 text-[15px] font-medium leading-[1.85] text-stone-500">
                  MOOD는 단순한 쇼핑몰이 아닙니다. 우리는 라이프스타일을 큐레이션합니다.
                  매 시즌 엄선된 아이템만을 소개하며, 트렌드를 넘어 당신만의 무드를 완성할 수 있도록 돕습니다.
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
                <span className="text-lg font-black tracking-[-0.04em] text-stone-900">MOOD</span>
              </div>
              <p className="mt-3 max-w-[280px] text-[13px] font-medium leading-[1.7] text-stone-400">
                감각적인 큐레이션으로 완성하는<br />라이프스타일 쇼핑몰
              </p>
            </div>
            <div className="flex gap-12">
              <div>
                <p className="text-[11px] font-bold tracking-[0.1em] text-stone-400">SHOP</p>
                <div className="mt-3 flex flex-col gap-2 text-[13px] font-medium text-stone-500">
                  <span>New Arrivals</span><span>Best Sellers</span><span>Outer</span><span>Top</span>
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
            <p className="text-[11px] text-stone-300">© 2026 MOOD. All rights reserved. — Web Vending Machine 템플릿</p>
          </div>
        </footer>
      </div>

      {/* ── 플로팅 CTA 버튼 ── */}
      <div className={`fixed inset-x-0 bottom-8 z-50 flex justify-center transition-all duration-500 ${showCTA ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}>
        <Link
          to="/signup"
          className="flex items-center gap-2 rounded-full bg-stone-900 px-8 py-4 text-sm font-bold text-white shadow-2xl shadow-stone-900/30 transition hover:-translate-y-0.5 hover:shadow-stone-900/40"
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-md bg-white text-[9px] font-black text-stone-900">W</span>
          이 템플릿으로 시작하기
        </Link>
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
