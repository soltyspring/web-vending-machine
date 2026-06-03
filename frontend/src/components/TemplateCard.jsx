import { Link } from "react-router-dom";

function ShoppingPreview() {
  return (
    <div className="grid grid-cols-3 gap-2">
      <span className="h-20 rounded-2xl bg-white/45" />
      <span className="h-20 rounded-2xl bg-white/30" />
      <span className="h-20 rounded-2xl bg-white/45" />
    </div>
  );
}

function WeddingPreview() {
  return (
    <div className="flex justify-center">
      <div className="relative h-32 w-28">
        <div className="absolute left-1/2 top-0 h-10 w-10 -translate-x-1/2 rounded-full bg-white/90" />
        <div className="absolute left-1/2 top-10 h-10 w-14 -translate-x-1/2 rounded-[20px] bg-white/85" />
        <div
          className="absolute left-1/2 top-20 h-18 w-28 -translate-x-1/2 bg-white/90"
          style={{ clipPath: "polygon(35% 0%, 65% 0%, 100% 100%, 0% 100%)" }}
        />
      </div>
    </div>
  );
}

function NeonPreview() {
  return (
    <div className="space-y-5">
      <div className="flex items-center justify-between">
        <span className="rounded-full bg-lime-300 px-3 py-1 text-[10px] font-black text-black">NEW</span>
        <span className="text-xs font-black tracking-[0.24em] text-cyan-200">LIVE</span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {["D-07", "98%", "24H"].map((stat) => (
          <span key={stat} className="rounded-2xl border border-white/10 bg-black/30 p-3 text-center text-lg font-black text-white">
            {stat}
          </span>
        ))}
      </div>
    </div>
  );
}

function CardPreview({ preview }) {
  if (preview === "shopping") return <ShoppingPreview />;
  if (preview === "wedding") return <WeddingPreview />;
  if (preview === "neon") return <NeonPreview />;
  return null;
}

export default function TemplateCard({ item, inert = false }) {
  const card = (
    <article className="min-w-[280px] shrink-0 md:min-w-[460px]">
      <div
        className={`relative h-[360px] overflow-hidden rounded-[20px] bg-gradient-to-br ${item.theme} p-5 shadow-[0_20px_60px_rgba(15,23,42,0.08)] transition hover:-translate-y-1 hover:shadow-[0_24px_70px_rgba(15,23,42,0.14)] md:h-[420px]`}
      >
        <div className="relative flex h-full flex-col justify-between rounded-[16px] border border-white/30 p-5 md:p-7">
          <div className={`whitespace-pre-line text-sm font-black ${item.accent}`}>
            {item.sub}
          </div>

          <CardPreview preview={item.preview} />

          <div className="relative z-10 max-w-[18rem] whitespace-pre-line break-keep pl-1 text-3xl font-black leading-[1.08] text-slate-950 md:text-[2.1rem]">
            <span className={item.preview === "shopping" || item.preview === "wedding" ? "text-slate-950" : "text-white"}>
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

  if (!item.to || inert) return card;

  return (
    <Link to={item.to} className="block" tabIndex={inert ? -1 : 0}>
      {card}
    </Link>
  );
}
