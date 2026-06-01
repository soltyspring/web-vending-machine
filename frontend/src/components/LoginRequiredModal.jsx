import { useEffect } from "react";

export default function LoginRequiredModal({
  open,
  onClose,
  onLogin,
  title = "로그인이 필요합니다",
  message = "로그인이 되지 않았다면 로그인을 진행해주세요.",
}) {
  useEffect(() => {
    if (!open) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") onClose();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/55 px-5 backdrop-blur-sm">
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="login-required-title"
        className="w-full max-w-sm rounded-3xl bg-white p-6 text-slate-950 shadow-2xl shadow-black/30"
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-slate-400">
              Web Vending Machine
            </p>
            <h2 id="login-required-title" className="mt-2 text-2xl font-black">
              {title}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-lg font-black text-slate-500 transition hover:bg-slate-200"
          >
            x
          </button>
        </div>

        <p className="mt-4 text-sm font-semibold leading-6 text-slate-600">
          {message}
        </p>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onLogin}
            className="rounded-2xl bg-slate-950 px-4 py-3 text-sm font-black text-white transition hover:-translate-y-0.5 hover:bg-slate-800"
          >
            로그인하기
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-black text-slate-700 transition hover:-translate-y-0.5 hover:bg-slate-50"
          >
            둘러보기
          </button>
        </div>
      </div>
    </div>
  );
}
