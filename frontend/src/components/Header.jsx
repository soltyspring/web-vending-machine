const menu = [
  { label: "메인", href: "#main" },
  { label: "로그인", href: "#login" },
  { label: "회원가입", href: "#signup" },
];

export default function Header() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-black/5 bg-[#f5f5f6]/90 backdrop-blur">
      <div className="mx-auto flex h-20 w-full max-w-[1400px] items-center justify-between px-5 md:px-8">
        <a href="#main" className="flex items-center gap-3 font-black tracking-[-0.04em]">
          <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-900 text-sm font-bold text-white">
            WVM
          </span>
          <span className="text-3xl leading-none">Web Vending Machine</span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {menu.map((item) => (
            <a
              key={item.label}
              href={item.href}
              className="text-[15px] font-semibold text-slate-800 transition hover:text-slate-500"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <a
            href="#login"
            className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:-translate-y-0.5"
          >
            로그인
          </a>
          <a
            href="#signup"
            className="rounded-xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-slate-900/15 transition hover:-translate-y-0.5"
          >
            무료로 시작하기
          </a>
        </div>
      </div>
    </header>
  );
}
