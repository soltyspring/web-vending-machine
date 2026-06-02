import { Link } from "react-router-dom";

const templates = [
  {
    id: "shopping",
    title: "MOOD SHOP",
    category: "쇼핑몰",
    sub: "Shopping Template",
    heading: "감각적인 쇼핑몰을\n지금 바로 시작하세요",
    available: true,
    preview: "shopping",
  },
  {
    id: "wedding",
    title: "LUMIÈRE",
    category: "스드메 · 웨딩",
    sub: "Wedding Template",
    heading: "당신의 결혼식을\n빛나게 해드립니다",
    available: true,
    preview: "wedding",
  },
  {
    id: "neon",
    title: "NEON DROP",
    category: "런칭 · 쇼케이스",
    sub: "Neon Template",
    heading: "LAUNCH\nLIKE A FLASH",
    available: true,
    preview: "neon",
  },
  {
    id: "business",
    title: "Volt.X",
    category: "비즈니스 홍보",
    sub: "Coming Soon",
    heading: "The Center Of The\nFuture Of Brand",
    available: false,
    preview: "business",
  },
  {
    id: "reservation",
    title: "Stayline",
    category: "예약 · 숙박",
    sub: "Coming Soon",
    heading: "예약 페이지를\n간단하게 시작하세요",
    available: false,
    preview: "reservation",
  },
  {
    id: "blog",
    title: "ZIGULAB",
    category: "블로그 · 미디어",
    sub: "Coming Soon",
    heading: "콘텐츠 페이지를\n바로 시작하세요",
    available: false,
    preview: "blog",
  },
];

function StatusBadge({ available }) {
  return (
    <span
      className={`shrink-0 rounded-full px-3 py-1 text-xs font-black ${
        available ? "bg-emerald-100 text-emerald-700" : "bg-slate-200 text-slate-500"
      }`}
    >
      {available ? "사용 가능" : "준비 중"}
    </span>
  );
}

function ShoppingPreview({ item }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-rose-100 via-orange-50 to-amber-100 p-5">
      <div className="absolute inset-x-6 top-6 h-28 rounded-[24px] border border-white/60 bg-white/30" />
      <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-white/60 p-5">
        <p className="text-sm font-black text-rose-400">{item.sub}</p>
        <div className="grid grid-cols-3 gap-2">
          <span className="h-20 rounded-2xl bg-white/45" />
          <span className="h-20 rounded-2xl bg-white/30" />
          <span className="h-20 rounded-2xl bg-white/45" />
        </div>
        <p className="whitespace-pre-line text-[1.65rem] font-black leading-[1.02] tracking-[-0.05em] text-slate-950">
          {item.heading}
        </p>
      </div>
    </div>
  );
}

function WeddingPreview({ item }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br from-[#fff3f7] to-[#f5e6ee] p-5">
      <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/60 p-5">
        <p className="text-sm font-black text-[#cc8ea7]">{item.sub}</p>
        <div className="flex justify-center">
          <div className="relative h-36 w-28">
            <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full bg-white/90" />
            <div className="absolute left-1/2 top-10 h-10 w-14 -translate-x-1/2 rounded-[20px] bg-white/85" />
            <div
              className="absolute left-1/2 top-20 h-20 w-28 -translate-x-1/2 bg-white/90"
              style={{ clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)" }}
            />
          </div>
        </div>
        <p className="whitespace-pre-line text-[1.65rem] font-black leading-[1.02] tracking-[-0.05em] text-[#5a4650]">
          {item.heading}
        </p>
      </div>
    </div>
  );
}

function NeonPreview({ item }) {
  return (
    <div className="relative h-full overflow-hidden rounded-[24px] bg-[#05060a] p-5 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(34,211,238,0.34),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(236,72,153,0.27),transparent_30%),radial-gradient(circle_at_48%_86%,rgba(163,230,53,0.2),transparent_34%)]" />
      <div className="absolute inset-0 opacity-35 [background-image:linear-gradient(rgba(255,255,255,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.12)_1px,transparent_1px)] [background-size:32px_32px]" />
      <div className="relative flex h-full flex-col justify-between rounded-[20px] border border-white/15 bg-white/[0.04] p-5">
        <div className="flex items-center justify-between">
          <p className="text-sm font-black tracking-[0.18em] text-cyan-200">{item.sub}</p>
          <span className="rounded-full bg-lime-300 px-3 py-1 text-[10px] font-black text-black">NEW</span>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {["D-07", "98%", "24H"].map((stat) => (
            <span key={stat} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-center text-lg font-black">
              {stat}
            </span>
          ))}
        </div>
        <p className="whitespace-pre-line text-[2rem] font-black leading-[0.92] tracking-[-0.07em]">
          {item.heading}
        </p>
      </div>
    </div>
  );
}

function ComingSoonPreview({ item }) {
  const toneByPreview = {
    business: "from-orange-700 via-red-500 to-black text-white",
    reservation: "from-stone-100 via-white to-stone-200 text-slate-900",
    blog: "from-lime-300 via-lime-400 to-green-300 text-slate-900",
  };

  return (
    <div
      className={`relative h-full overflow-hidden rounded-[24px] bg-gradient-to-br ${
        toneByPreview[item.preview] || toneByPreview.business
      } p-5 opacity-70`}
    >
      <div className="flex h-full flex-col justify-between rounded-[20px] border border-white/35 p-5">
        <p className="text-sm font-black opacity-70">{item.sub}</p>
        <div className="grid grid-cols-2 gap-2">
          <span className="h-16 rounded-2xl bg-white/25" />
          <span className="h-16 rounded-2xl bg-white/15" />
          <span className="h-16 rounded-2xl bg-white/15" />
          <span className="h-16 rounded-2xl bg-white/25" />
        </div>
        <p className="whitespace-pre-line text-[1.6rem] font-black leading-[1.05] tracking-[-0.05em]">
          {item.heading}
        </p>
      </div>
      <div className="absolute inset-0 flex items-center justify-center bg-white/35">
        <span className="rounded-full bg-slate-950 px-4 py-2 text-sm font-black text-white">준비 중</span>
      </div>
    </div>
  );
}

function TemplatePreview({ item }) {
  if (item.preview === "shopping") return <ShoppingPreview item={item} />;
  if (item.preview === "wedding") return <WeddingPreview item={item} />;
  if (item.preview === "neon") return <NeonPreview item={item} />;
  return <ComingSoonPreview item={item} />;
}

function TemplateCard({ item }) {
  const content = (
    <article className="group flex h-full flex-col">
      <div className="h-[320px] overflow-hidden rounded-[28px] shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(15,23,42,0.13)]">
        <TemplatePreview item={item} />
      </div>
      <div className="mt-4 flex min-h-[48px] items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="truncate text-[18px] font-black leading-none text-slate-900">{item.title}</p>
          <p className="mt-1 text-sm font-semibold leading-none text-slate-500">{item.category}</p>
        </div>
        <StatusBadge available={item.available} />
      </div>
    </article>
  );

  if (!item.available) return <div>{content}</div>;

  return (
    <Link to={`/templates/${item.id}`} className="block">
      {content}
    </Link>
  );
}

export default function TemplatesPage() {
  return (
    <section className="min-h-screen px-5 pb-20 pt-28 md:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
          <div>
            <p className="text-xs font-black tracking-[0.2em] text-slate-400">TEMPLATE STORE</p>
            <h1 className="mt-3 text-5xl font-black tracking-[-0.06em] text-slate-950 md:text-7xl">
              템플릿
            </h1>
            <p className="mt-4 max-w-2xl text-lg font-semibold leading-8 text-slate-500">
              원하는 템플릿을 골라 나만의 웹사이트를 빠르게 시작해 보세요.
            </p>
          </div>
          <div className="rounded-full border border-slate-200 bg-white px-4 py-2 text-xs font-black text-slate-500 shadow-sm">
            사용 가능 {templates.filter((item) => item.available).length}개
          </div>
        </div>

        <div className="mt-12 grid items-start gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
          {templates.map((item) => (
            <TemplateCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
