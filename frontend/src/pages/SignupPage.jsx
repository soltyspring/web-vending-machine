import { useState } from "react";
import { Link } from "react-router-dom";

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    nickname: "",
    password: "",
    passwordConfirm: "",
    useEmailPrefix: false,
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
  });

  const update = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      // 전체 동의 처리
      if (key === "agreeAll") {
        next.agreeTerms = value;
        next.agreePrivacy = value;
      } else if (key === "agreeTerms" || key === "agreePrivacy") {
        next.agreeAll = next.agreeTerms && next.agreePrivacy;
      }
      return next;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: 백엔드 API 연결
    // const res = await fetch("/api/auth/signup", {
    //   method: "POST",
    //   headers: { "Content-Type": "application/json" },
    //   body: JSON.stringify({ email: form.email, nickname: form.nickname, password: form.password }),
    // });
    console.log("회원가입 시도:", form);
  };

  return (
    <section
      id="signup"
      className="flex min-h-screen items-center justify-center px-5 py-28 md:px-8"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[560px] rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-9"
      >
        <h2 className="mb-8 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">
          이메일 가입
        </h2>

        <div className="space-y-5">
          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              이메일
            </label>
            <input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="이메일을 입력해 주세요"
              className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              아이디
            </label>
            <div className="relative">
              <input
                type="text"
                value={form.nickname}
                onChange={(e) =>
                  e.target.value.length <= 20 && update("nickname", e.target.value)
                }
                placeholder="영문, 숫자, 특수문자 2-20자"
                className="h-14 w-full rounded-2xl border border-slate-200 px-4 pr-16 outline-none transition focus:border-slate-400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                {form.nickname.length}/20
              </span>
            </div>
          </div>



          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              비밀번호
            </label>
            <input
              type="password"
              value={form.password}
              onChange={(e) => update("password", e.target.value)}
              placeholder="영문, 숫자, 특수문자가 모두 들어간 8-20자"
              className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-slate-400"
            />
          </div>

          <div>
            <input
              type="password"
              value={form.passwordConfirm}
              onChange={(e) => update("passwordConfirm", e.target.value)}
              placeholder="비밀번호를 한 번 더 입력해 주세요"
              className="h-14 w-full rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-slate-400"
            />
          </div>

          <div className="rounded-3xl bg-slate-50 p-1">
            
            <button
              type="button"
              className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5"
            >
              이메일로 인증하기
            </button>
          </div>

          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4">
            <label className="flex items-center gap-2 border-b border-slate-200 pb-3 text-sm font-bold text-slate-900">
              <input
                type="checkbox"
                checked={form.agreeAll}
                onChange={(e) => update("agreeAll", e.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>전체 동의</span>
            </label>
            <div className="mt-3 space-y-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(e) => update("agreeTerms", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <Link to="/terms" className="underline hover:text-slate-900">이용약관 동의</Link>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.agreePrivacy}
                  onChange={(e) => update("agreePrivacy", e.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <Link to="/privacy" className="underline hover:text-slate-900">개인정보 수집 · 이용 동의</Link>
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5"
          >
            가입
          </button>
        </div>
      </form>
    </section>
  );
}
