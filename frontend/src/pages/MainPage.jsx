import TemplateCard from "../components/TemplateCard";
import FreeStartButton, {
  FreePlanText,
} from "../components/FreeStartButton";

const templates = [
  {
    title: "Volt.X",
    category: "비즈니스 홍보",
    theme: "from-orange-700 via-red-500 to-black",
    accent: "text-white/80",
    heading: "The Center Of The\nFuture Of Brand.",
    sub: "View More Comfortably\nOn Mobile Screen.",
  },
  {
    title: "GLOBAL LOGISTICS",
    category: "비즈니스 홍보",
    theme: "from-sky-900 via-blue-700 to-orange-500",
    accent: "text-white/80",
    heading: "A modern template\nto power up your\nbusiness",
    sub: "GLOBAL LOGISTICS",
  },
  {
    title: "Reservation",
    category: "예약",
    theme: "from-stone-100 via-white to-stone-200",
    accent: "text-stone-500",
    heading: "감각적인 예약 페이지를\n간단하게 시작해 보세요",
    sub: "Accommodation",
  },
  {
    title: "ZIGULAB",
    category: "블로그 · 미디어",
    theme: "from-lime-300 via-lime-400 to-green-300",
    accent: "text-stone-700",
    heading: "지금 바로 시작하는\n콘텐츠 페이지",
    sub: "ZIGULAB",
  },
];

export default function MainPage() {
  return (
    <section
      id="main"
      className="px-5 pb-14 pt-28 md:px-8 md:pb-20 md:pt-32"
    >
      <div className="mx-auto flex min-h-[calc(100vh-8rem)] w-full max-w-[1400px] flex-col justify-between">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
          <div>
            <h1 className="max-w-[520px] text-5xl font-black leading-[1.15] tracking-[-0.06em] text-slate-950 md:text-7xl">
              고민 없이 쉽게
              <br />
              선택만 하세요
            </h1>
          </div>

          <div className="pt-3 lg:justify-self-end lg:max-w-[520px]">
            <p className="text-lg font-semibold leading-[1.25] tracking-[-0.04em] text-slate-500 md:text-[2.75rem]">
              여러개의 감각적인 템플릿
            </p>
            <p className="mt-2 text-lg font-medium leading-[1.25] tracking-[-0.04em] text-slate-500 md:text-[2.4rem]">
              쉽지만 아름다운 웹사이트를 만들어 보세요
            </p>
          </div>
        </div>

        <div className="mt-14 overflow-hidden">
          <div className="main-template-marquee group relative -mx-5 overflow-hidden py-2 md:-mx-8">
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#f5f5f6] to-transparent md:w-28" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#f5f5f6] to-transparent md:w-28" />
            <div className="main-template-marquee-track flex w-max pl-5 group-hover:[animation-play-state:paused] md:pl-8">
              {[0, 1].map((setIndex) => (
                <div
                  key={setIndex}
                  aria-hidden={setIndex === 1}
                  className="flex shrink-0 gap-5 pr-5 md:gap-6 md:pr-6"
                >
                  {templates.map((item, index) => (
                    <TemplateCard key={`${item.title}-${setIndex}`} item={item} index={index} />
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center gap-5">
          <div className="w-full max-w-[680px] rounded-[28px] border border-slate-200 bg-white/90 p-5 text-center shadow-[0_12px_30px_rgba(15,23,42,0.06)] md:p-6">
            <FreeStartButton className="w-full rounded-2xl bg-slate-950 px-7 py-4 text-lg font-semibold text-white shadow-lg shadow-slate-900/20 transition hover:-translate-y-0.5">
              지금 무료로 시작하기
            </FreeStartButton>
            <FreePlanText className="mt-4 text-left" />
          </div>
        </div>
      </div>
    </section>
  );
}
