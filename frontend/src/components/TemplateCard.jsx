export default function TemplateCard({ item, index }) {
  return (
    <article className="min-w-[280px] shrink-0 md:min-w-[460px]">
      <div
        className={`relative h-[360px] overflow-hidden rounded-[20px] bg-gradient-to-br ${item.theme} p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] md:h-[420px]`}
      >
        <div className="flex h-full flex-col justify-between rounded-[16px] border border-white/30 p-5 md:p-7">
          <div className={`whitespace-pre-line text-sm font-semibold ${item.accent}`}>
            {item.sub}
          </div>

          {index === 2 ? (
            <div className="space-y-4 rounded-[18px] bg-white/85 p-4 shadow-inner shadow-black/5">
              <div className="h-28 rounded-2xl bg-[linear-gradient(135deg,#dbeafe,#f8fafc,#e7e5e4)]" />
              <div className="grid grid-cols-3 gap-3">
                <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#dbeafe,#fef3c7)]" />
                <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#e5e7eb,#d6d3d1)]" />
                <div className="h-20 rounded-2xl bg-[linear-gradient(135deg,#d9f99d,#dcfce7)]" />
              </div>
            </div>
          ) : (
            <div className="pointer-events-none absolute inset-0 opacity-40">
              <div className="absolute -left-10 bottom-0 h-56 w-56 rounded-full bg-white/20 blur-3xl" />
              <div className="absolute right-6 top-10 h-28 w-28 rounded-full bg-white/20 blur-2xl" />
            </div>
          )}

          <div className="relative z-10 whitespace-pre-line text-3xl font-black leading-[1.1] tracking-[-0.05em] text-slate-950 md:text-[2.1rem]">
            <span className={index === 2 ? "text-slate-800" : "text-white"}>
              {item.heading}
            </span>
          </div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2 text-xl tracking-[-0.03em]">
        <span className="font-semibold text-slate-800">{item.title}</span>
        <span className="text-slate-500">{item.category}</span>
      </div>
    </article>
  );
}
