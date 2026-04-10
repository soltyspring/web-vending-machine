import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function extractErrorMessage(detail, fallback) {
  if (!detail) return fallback;
  if (typeof detail === "string") return detail;
  if (Array.isArray(detail)) {
    const firstMessage = detail.find(
      (item) => item && typeof item === "object" && typeof item.msg === "string"
    );
    if (firstMessage) return firstMessage.msg;
    return fallback;
  }
  if (typeof detail === "object" && typeof detail.msg === "string") {
    return detail.msg;
  }
  return fallback;
}

export default function LoginPage() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [keepLogin, setKeepLogin] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setIsSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(extractErrorMessage(data.detail, "로그인에 실패했습니다."));
      }

      if (keepLogin) {
        localStorage.setItem("access_token", data.access_token);
      } else {
        sessionStorage.setItem("access_token", data.access_token);
      }

      setSuccessMessage("로그인에 성공했습니다.");
      setTimeout(() => navigate("/"), 500);
    } catch (error) {
      setErrorMessage(error.message || "로그인에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="login"
      className="flex min-h-screen  items-center justify-center px-5 py-28 md:px-8"
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
              onChange={(e) => setUsername(e.target.value)}
              placeholder="아이디를 입력해 주세요"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              비밀번호
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="비밀번호를 입력해 주세요"
              className="h-14 w-full rounded-2xl border border-slate-200 bg-white px-4 text-base outline-none transition focus:border-slate-400"
            />
          </div>

          <div className="flex items-center justify-between gap-4 text-sm">
            <label className="flex items-center gap-2 text-slate-700">
              <input
                type="checkbox"
                checked={keepLogin}
                onChange={(e) => setKeepLogin(e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>로그인 유지</span>
            </label>
            <button
              type="button"
              className="font-semibold text-slate-600 hover:text-slate-900"
            >
              아이디 · 비밀번호 찾기
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
    </section>
  );
}
