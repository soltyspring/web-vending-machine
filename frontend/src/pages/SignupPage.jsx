import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function SignupPage() {
  const [form, setForm] = useState({
    email: "",
    username: "",
    verificationCode: "",
    password: "",
    passwordConfirm: "",
    agreeAll: false,
    agreeTerms: false,
    agreePrivacy: false,
  });
  const [emailSent, setEmailSent] = useState(false);
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

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

  const handleSendEmail = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsSendingEmail(true);

    try {
      const checkRes = await fetch(`http://127.0.0.1:8000/api/auth/check-email?email=${encodeURIComponent(form.email)}`);
      const checkData = await checkRes.json();
      if (!checkRes.ok) {
        throw new Error(extractErrorMessage(checkData.detail, "이메일 확인에 실패했습니다."));
      }
      if (!checkData.available) {
        throw new Error("이미 가입된 이메일입니다.");
      }

      const res = await fetch("http://127.0.0.1:8000/api/auth/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(
          extractErrorMessage(data.detail, "이메일 인증 발송에 실패했습니다.")
        );
      }

      setEmailSent(true);
      setEmailVerified(false);
      setSuccessMessage("인증 코드가 발송되었습니다. 터미널에서 코드를 확인해 입력해 주세요.");
    } catch (error) {
      setErrorMessage(error.message || "이메일 인증 발송에 실패했습니다.");
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleVerifyEmail = async () => {
    setErrorMessage("");
    setSuccessMessage("");
    setIsVerifyingEmail(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/verify-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          code: form.verificationCode,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(extractErrorMessage(data.detail, "이메일 인증에 실패했습니다."));
      }

      setEmailVerified(true);
      setSuccessMessage("이메일 인증이 완료되었습니다.");
    } catch (error) {
      setErrorMessage(error.message || "이메일 인증에 실패했습니다.");
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    if (!emailVerified) {
      setErrorMessage("이메일 인증을 먼저 완료해 주세요.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setErrorMessage("비밀번호가 일치하지 않습니다.");
      return;
    }

    if (!form.agreeTerms || !form.agreePrivacy) {
      setErrorMessage("필수 약관에 동의해 주세요.");
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("http://127.0.0.1:8000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(extractErrorMessage(data.detail, "회원가입에 실패했습니다."));
      }

      setSuccessMessage("회원가입이 완료되었습니다.");
    } catch (error) {
      setErrorMessage(error.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
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
                value={form.username}
                onChange={(e) =>
                  e.target.value.length <= 20 && update("username", e.target.value)
                }
                placeholder="영문, 숫자, 특수문자 2-20자"
                className="h-14 w-full rounded-2xl border border-slate-200 px-4 pr-16 outline-none transition focus:border-slate-400"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                {form.username.length}/20
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
              onClick={handleSendEmail}
              disabled={isSendingEmail || !form.email}
              className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSendingEmail ? "인증 메일 발송 중..." : emailVerified ? "이메일 인증 완료" : "이메일로 인증하기"}
            </button>
          </div>

          {emailSent ? (
            <div className="flex gap-3">
              <input
                type="text"
                value={form.verificationCode}
                onChange={(e) => update("verificationCode", e.target.value)}
                placeholder="인증 코드를 입력해 주세요"
                className="h-14 flex-1 rounded-2xl border border-slate-200 px-4 outline-none transition focus:border-slate-400"
              />
              <button
                type="button"
                onClick={handleVerifyEmail}
                disabled={isVerifyingEmail || !form.verificationCode}
                className="rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isVerifyingEmail ? "확인 중..." : "코드 확인"}
              </button>
            </div>
          ) : null}

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
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
          >
            {isSubmitting ? "가입 중..." : "가입"}
          </button>
        </div>
      </form>
    </section>
  );
}
