import { Link } from "react-router-dom";

const templates = [
  {
    id: "shopping",
    title: "MOOD SHOP",
    category: "쇼핑몰",
    theme: "from-rose-100 via-orange-50 to-amber-100",
    accent: "text-rose-400",
    heading: "감각적인 쇼핑몰을\n지금 바로 시작하세요",
    sub: "Shopping Template",
    available: true,
  },
  {
    id: "business",
    title: "Volt.X",
    category: "비즈니스 홍보",
    theme: "from-orange-700 via-red-500 to-black",
    accent: "text-white/80",
    heading: "The Center Of The\nFuture Of Brand.",
    sub: "View More Comfortably\nOn Mobile Screen.",
    available: false,
  },
  {
    id: "reservation",
    title: "Reservation",
    category: "예약",
    theme: "from-stone-100 via-white to-stone-200",
    accent: "text-stone-500",
    heading: "감각적인 예약 페이지를\n간단하게 시작해 보세요",
    sub: "Accommodation",
    available: false,
  },
  {
    id: "blog",
    title: "ZIGULAB",
    category: "블로그 · 미디어",
    theme: "from-lime-300 via-lime-400 to-green-300",
    accent: "text-stone-700",
    heading: "지금 바로 시작하는\n콘텐츠 페이지",
    sub: "ZIGULAB",
    available: false,
  },
];

export default function TemplatesPage() {
  return (
    <section className="min-h-screen px-5 pt-28 pb-20 md:px-8">
      <div className="mx-auto w-full max-w-[1400px]">
        <h1 className="text-5xl font-black tracking-[-0.06em] text-slate-950 md:text-7xl">
          템플릿
        </h1>
        <p className="mt-4 text-lg font-medium text-slate-500">
          원하는 템플릿을 골라 나만의 웹사이트를 만들어 보세요
        </p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {templates.map((item) => (
            <div key={item.id} className="group">
              {item.available ? (
                <Link to={`/templates/${item.id}`}>
                  <div
                    className={`relative h-[320px] overflow-hidden rounded-[20px] bg-gradient-to-br ${item.theme} p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition group-hover:-translate-y-1 group-hover:shadow-[0_24px_70px_rgba(15,23,42,0.12)]`}
                  >
                    <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/30 p-5">
                      <div className={`whitespace-pre-line text-sm font-semibold ${item.accent}`}>
                        {item.sub}
                      </div>
                      <div className="whitespace-pre-line text-2xl font-black leading-[1.1] tracking-[-0.05em] text-slate-900">
                        {item.heading}
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div
                  className={`relative h-[320px] overflow-hidden rounded-[20px] bg-gradient-to-br ${item.theme} p-5 opacity-50 shadow-[0_20px_60px_rgba(15,23,42,0.08)]`}
                >
                  <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/30 p-5">
                    <div className={`whitespace-pre-line text-sm font-semibold ${item.accent}`}>
                      {item.sub}
                    </div>
                    <div className="whitespace-pre-line text-2xl font-black leading-[1.1] tracking-[-0.05em] text-slate-900">
                      {item.heading}
                    </div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center rounded-[20px] bg-white/60">
                    <span className="rounded-full bg-slate-900 px-4 py-2 text-sm font-bold text-white">
                      준비 중
                    </span>
                  </div>
                </div>
              )}

              <div className="mt-3 flex items-center gap-2 text-lg tracking-[-0.03em]">
                <span className="font-semibold text-slate-800">{item.title}</span>
                <span className="text-slate-500">{item.category}</span>
                {item.available && (
                  <span className="ml-auto rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-bold text-emerald-700">
                    사용 가능
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
