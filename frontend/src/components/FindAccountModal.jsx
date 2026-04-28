import { useEffect, useState } from "react";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function FindAccountModal({ open, onClose }) {
  const [tab, setTab] = useState("id");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (!open) {
      setTab("id");
      setEmail("");
      setUsername("");
      setMessage("");
      setError("");
      setIsSubmitting(false);
    }
  }, [open]);

  if (!open) return null;

  const switchTab = (next) => {
    setTab(next);
    setMessage("");
    setError("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMessage("");
    setError("");

    if (!email) {
      setError("이메일을 입력해 주세요.");
      return;
    }
    if (!emailPattern.test(email)) {
      setError("올바른 이메일 형식으로 입력해 주세요.");
      return;
    }
    if (tab === "password" && !username.trim()) {
      setError("아이디를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);
    await new Promise((resolve) => window.setTimeout(resolve, 600));

    if (tab === "id") {
      setMessage(
        `입력하신 이메일(${email})로 가입된 아이디 안내 메일을 발송했습니다. 메일함을 확인해 주세요.`
      );
    } else {
      setMessage(
        `입력하신 이메일(${email})로 비밀번호 재설정 링크를 발송했습니다. 메일함을 확인해 주세요.`
      );
    }
    setIsSubmitting(false);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[440px] rounded-[28px] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-8"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <h3 className="text-2xl font-black tracking-[-0.04em] text-slate-950">
            계정 찾기
          </h3>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="rounded-lg p-1 text-slate-500 hover:bg-slate-100 hover:text-slate-900"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        <div className="mb-5 grid grid-cols-2 gap-2 rounded-2xl bg-slate-100 p-1">
          <button
            type="button"
            onClick={() => switchTab("id")}
            className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
              tab === "id"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            아이디 찾기
          </button>
          <button
            type="button"
            onClick={() => switchTab("password")}
            className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
              tab === "password"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            비밀번호 찾기
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {tab === "password" ? (
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-900">
                아이디
              </label>
              <input
                type="text"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
                placeholder="가입한 아이디를 입력해 주세요"
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400"
              />
            </div>
          ) : null}

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              이메일
            </label>
            <input
              type="email"
              value={email}
              onChange={(event) => setEmail(event.target.value.trim())}
              placeholder="가입 시 사용한 이메일"
              className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400"
            />
            <p className="mt-2 text-xs text-slate-500">
              {tab === "id"
                ? "가입한 이메일로 아이디를 보내드립니다."
                : "아이디와 이메일이 일치하면 비밀번호 재설정 링크를 보내드립니다."}
            </p>
          </div>

          {error ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {error}
            </p>
          ) : null}

          {message ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
              {message}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting
              ? "전송 중..."
              : tab === "id"
                ? "아이디 찾기"
                : "비밀번호 재설정 메일 보내기"}
          </button>
        </form>
      </div>
    </div>
  );
}
