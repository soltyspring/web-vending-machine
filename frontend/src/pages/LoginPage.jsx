import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/useAuth";
import { createApiUrl, extractErrorMessage, parseJsonResponse } from "../lib/api";
import FindAccountModal from "../components/FindAccountModal";

const EyeIcon = ({ open }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="h-5 w-5"
    aria-hidden="true"
  >
    {open ? (
      <>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z" />
        <circle cx="12" cy="12" r="3" />
      </>
    ) : (
      <>
        <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19c-6.5 0-10-7-10-7a18.45 18.45 0 0 1 4.22-5.06" />
        <path d="M9.9 4.24A10.94 10.94 0 0 1 12 4c6.5 0 10 7 10 7a18.5 18.5 0 0 1-2.16 3.19" />
        <path d="M14.12 14.12A3 3 0 1 1 9.88 9.88" />
        <line x1="2" y1="2" x2="22" y2="22" />
      </>
    )}
  </svg>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [findOpen, setFindOpen] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!username.trim()) {
      setErrorMessage("아이디를 입력해 주세요.");
      return;
    }

    if (!password) {
      setErrorMessage("비밀번호를 입력해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(createApiUrl("/api/auth/login"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, "로그인에 실패했습니다."));
      }

      login(payload.access_token, keepLogin);
      setSuccessMessage("로그인에 성공했습니다.");
      window.setTimeout(() => navigate("/"), 500);
    } catch (error) {
      setErrorMessage(error.message || "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="login"
      className="flex min-h-screen items-center justify-center px-5 py-28 md:px-8"
    >
      <div className="w-full max-w-[520px]">
        <div className="mb-6 flex justify-center">
          <div className="flex h-24 w-24 items-center justify-center rounded-[30px] bg-slate-950 text-2xl font-black text-white">
            WVM
          </div>
        </div>

        <h2 className="mx-auto mb-10 max-w-[640px] text-center text-[2rem] font-black leading-[1.16] tracking-[-0.06em] text-slate-950 break-keep sm:text-[2.4rem] md:text-[3.2rem] lg:text-[3.8rem]">
          <span className="block">
            로그인하고
            <br />
            나만의 웹페이지를
          </span>
          <span className="mt-1 block">시작해 보세요</span>
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-5 rounded-[28px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-8"
        >
          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              아이디
            </label>
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="아이디를 입력해 주세요"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="비밀번호를 입력해 주세요"
                className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 pr-12 text-base outline-none transition focus:border-slate-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "비밀번호 숨기기" : "비밀번호 표시"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-slate-900"
              >
                <EyeIcon open={showPassword} />
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={keepLogin}
                onChange={(event) => setKeepLogin(event.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>로그인 유지</span>
            </label>
            <button
              type="button"
              onClick={() => setFindOpen(true)}
              className="font-semibold text-slate-600 hover:text-slate-900"
            >
              아이디·비밀번호 찾기
            </button>
          </div>

          {errorMessage ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {errorMessage}
            </p>
          ) : null}

          {successMessage ? (
            <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
              {successMessage}
            </p>
          ) : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "로그인 중..." : "로그인"}
          </button>

          <p className="pt-1 text-center text-sm text-slate-500">
            아직 Web Vending Machine 회원이 아니신가요?{" "}
            <Link
              to="/signup"
              className="font-semibold text-sky-600 hover:text-sky-700"
            >
              회원가입
            </Link>
          </p>
        </form>
      </div>

      <FindAccountModal open={findOpen} onClose={() => setFindOpen(false)} />
    </section>
  );
}
