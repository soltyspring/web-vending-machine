import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { createApiUrl, extractErrorMessage, parseJsonResponse } from "../lib/api";

const EMAIL_CODE_EXPIRE_SECONDS = 180;
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const usernamePattern = /^[A-Za-z0-9_]{2,20}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;

function formatTimer(seconds) {
  const safeSeconds = Math.max(seconds, 0);
  const minutes = String(Math.floor(safeSeconds / 60)).padStart(2, "0");
  const remainSeconds = String(safeSeconds % 60).padStart(2, "0");

  return `${minutes}:${remainSeconds}`;
}

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

export default function SignupPage() {
  const navigate = useNavigate();
  const { login } = useAuth();
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
  const [emailStatus, setEmailStatus] = useState({
    sent: false,
    verified: false,
    expiresIn: 0,
  });
  const [usernameCheck, setUsernameCheck] = useState({
    status: "idle",
    value: "",
  });
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [isVerifyingEmail, setIsVerifyingEmail] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [fieldErrors, setFieldErrors] = useState({});
  const [generalError, setGeneralError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const isEmailValid = emailPattern.test(form.email);
  const isUsernameValid = usernamePattern.test(form.username);
  const isPasswordValid = passwordPattern.test(form.password);
  const isPasswordConfirmMatched =
    form.passwordConfirm.length > 0 && form.password === form.passwordConfirm;
  const isUsernameChecked =
    usernameCheck.status === "available" && usernameCheck.value === form.username;
  const usernameNeedsRecheck =
    form.username.length > 0 &&
    usernameCheck.status !== "idle" &&
    usernameCheck.value !== form.username;

  useEffect(() => {
    if (!emailStatus.sent || emailStatus.verified || emailStatus.expiresIn <= 0) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setEmailStatus((prev) => {
        if (prev.verified || prev.expiresIn <= 1) {
          window.clearInterval(timer);
          return { ...prev, expiresIn: 0 };
        }

        return { ...prev, expiresIn: prev.expiresIn - 1 };
      });
    }, 1000);

    return () => window.clearInterval(timer);
  }, [emailStatus.expiresIn, emailStatus.sent, emailStatus.verified]);

  const clearFieldError = (key) => {
    setFieldErrors((prev) => {
      if (!prev[key]) return prev;
      const next = { ...prev };
      delete next[key];
      return next;
    });
  };

  const update = (key, value) => {
    setForm((prev) => {
      const next = { ...prev, [key]: value };

      if (key === "agreeAll") {
        next.agreeTerms = value;
        next.agreePrivacy = value;
      } else if (key === "agreeTerms" || key === "agreePrivacy") {
        next.agreeAll = next.agreeTerms && next.agreePrivacy;
      }

      return next;
    });

    clearFieldError(key);
    if (key === "agreeTerms" || key === "agreePrivacy" || key === "agreeAll") {
      clearFieldError("agree");
    }

    if (key === "email" && !emailStatus.verified) {
      setEmailStatus({ sent: false, verified: false, expiresIn: 0 });
      setSuccessMessage("");
    }

    if (key === "verificationCode") {
      clearFieldError("verificationCode");
    }

    if (key === "username") {
      setUsernameCheck({ status: "idle", value: "" });
      setSuccessMessage("");
    }
  };

  const handleCheckUsername = async () => {
    setGeneralError("");
    setSuccessMessage("");
    clearFieldError("username");

    if (!form.username) {
      setFieldErrors((prev) => ({ ...prev, username: "아이디를 입력해 주세요." }));
      return;
    }

    if (!isUsernameValid) {
      setFieldErrors((prev) => ({
        ...prev,
        username: "아이디는 영문, 숫자, 밑줄만 사용해 2~20자로 입력해 주세요.",
      }));
      return;
    }

    setIsCheckingUsername(true);

    try {
      const response = await fetch(
        createApiUrl(
          `/api/auth/check-username?username=${encodeURIComponent(form.username)}`
        )
      );
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(payload, "아이디 중복 확인에 실패했습니다.")
        );
      }

      setUsernameCheck({
        status: payload.available ? "available" : "unavailable",
        value: form.username,
      });
    } catch (error) {
      setUsernameCheck({ status: "error", value: form.username });
      setFieldErrors((prev) => ({
        ...prev,
        username: error.message || "아이디 중복 확인에 실패했습니다.",
      }));
    } finally {
      setIsCheckingUsername(false);
    }
  };

  const handleSendEmail = async () => {
    setGeneralError("");
    setSuccessMessage("");
    clearFieldError("email");

    if (!form.email) {
      setFieldErrors((prev) => ({ ...prev, email: "이메일을 입력해 주세요." }));
      return;
    }

    if (!isEmailValid) {
      setFieldErrors((prev) => ({
        ...prev,
        email: "올바른 이메일 형식으로 입력해 주세요.",
      }));
      return;
    }

    setIsSendingEmail(true);

    try {
      const checkResponse = await fetch(
        createApiUrl(`/api/auth/check-email?email=${encodeURIComponent(form.email)}`)
      );
      const checkPayload = await parseJsonResponse(checkResponse);

      if (!checkResponse.ok) {
        throw new Error(
          extractErrorMessage(checkPayload, "이메일 중복 확인에 실패했습니다.")
        );
      }

      if (!checkPayload.available) {
        throw new Error("이미 가입된 이메일입니다.");
      }

      const sendResponse = await fetch(createApiUrl("/api/auth/send-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.email }),
      });
      const sendPayload = await parseJsonResponse(sendResponse);

      if (!sendResponse.ok) {
        throw new Error(
          extractErrorMessage(sendPayload, "인증 코드를 보내지 못했습니다.")
        );
      }

      setEmailStatus({
        sent: true,
        verified: false,
        expiresIn: EMAIL_CODE_EXPIRE_SECONDS,
      });
      setSuccessMessage(
        sendPayload.message || "인증 코드가 발송되었습니다. 메일함을 확인해 주세요."
      );
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        email: error.message || "인증 코드를 보내지 못했습니다.",
      }));
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleVerifyEmail = async () => {
    setGeneralError("");
    setSuccessMessage("");
    clearFieldError("verificationCode");

    if (!emailStatus.sent) {
      setFieldErrors((prev) => ({
        ...prev,
        verificationCode: "먼저 이메일 인증 코드를 발송해 주세요.",
      }));
      return;
    }

    if (!form.verificationCode) {
      setFieldErrors((prev) => ({
        ...prev,
        verificationCode: "인증 코드를 입력해 주세요.",
      }));
      return;
    }

    if (emailStatus.expiresIn <= 0) {
      setFieldErrors((prev) => ({
        ...prev,
        verificationCode: "인증코드가 만료되었습니다. 재전송 후 다시 시도해 주세요.",
      }));
      return;
    }

    setIsVerifyingEmail(true);

    try {
      const response = await fetch(createApiUrl("/api/auth/verify-email"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: form.email,
          code: form.verificationCode,
        }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(
          extractErrorMessage(payload, "인증코드가 일치하지 않거나 만료되었습니다.")
        );
      }

      setEmailStatus((prev) => ({
        ...prev,
        verified: true,
        expiresIn: 0,
      }));
      setSuccessMessage(payload.message || "이메일 인증이 완료되었습니다.");
    } catch (error) {
      setFieldErrors((prev) => ({
        ...prev,
        verificationCode:
          error.message || "인증코드가 일치하지 않거나 만료되었습니다.",
      }));
    } finally {
      setIsVerifyingEmail(false);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setGeneralError("");
    setSuccessMessage("");

    const nextErrors = {};

    if (!form.email) {
      nextErrors.email = "이메일을 입력해 주세요.";
    } else if (!isEmailValid) {
      nextErrors.email = "올바른 이메일 형식으로 입력해 주세요.";
    } else if (!emailStatus.verified) {
      nextErrors.email = "이메일 인증을 완료해 주세요.";
    }

    if (!form.username) {
      nextErrors.username = "아이디를 입력해 주세요.";
    } else if (!isUsernameValid) {
      nextErrors.username =
        "아이디는 영문, 숫자, 밑줄만 사용해 2~20자로 입력해 주세요.";
    } else if (usernameNeedsRecheck) {
      nextErrors.username = "아이디가 변경되었어요. 중복 확인을 다시 해주세요.";
    } else if (!isUsernameChecked) {
      nextErrors.username = "사용 가능한 아이디인지 먼저 확인해 주세요.";
    }

    if (!form.password) {
      nextErrors.password = "비밀번호를 입력해 주세요.";
    } else if (!isPasswordValid) {
      nextErrors.password =
        "비밀번호는 영문, 숫자, 특수문자를 포함해 8~20자로 입력해 주세요.";
    }

    if (!form.passwordConfirm) {
      nextErrors.passwordConfirm = "비밀번호 확인을 입력해 주세요.";
    } else if (!isPasswordConfirmMatched) {
      nextErrors.passwordConfirm = "비밀번호 확인이 일치하지 않습니다.";
    }

    if (!form.agreeTerms || !form.agreePrivacy) {
      nextErrors.agree = "필수 약관에 모두 동의해 주세요.";
    }

    if (Object.keys(nextErrors).length > 0) {
      setFieldErrors(nextErrors);
      return;
    }

    setFieldErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch(createApiUrl("/api/auth/register"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password,
        }),
      });
      const payload = await parseJsonResponse(response);

      if (!response.ok) {
        throw new Error(extractErrorMessage(payload, "회원가입에 실패했습니다."));
      }

      login(payload.access_token, true);
      setSuccessMessage(
        payload.message || "회원가입이 완료되었습니다. 자동으로 로그인합니다."
      );
      window.setTimeout(() => navigate("/"), 500);
    } catch (error) {
      setGeneralError(error.message || "회원가입에 실패했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const emailHelperText = fieldErrors.email
    ? fieldErrors.email
    : emailStatus.verified
      ? "이메일 인증이 완료되어 입력이 잠겼습니다."
      : isEmailValid || !form.email
        ? "중복 확인 후 인증 메일을 보낼 수 있습니다."
        : "올바른 이메일 형식으로 입력해 주세요.";
  const emailHelperClass = fieldErrors.email ? "text-rose-600" : "text-slate-500";

  let usernameHelper = "회원가입 전에 사용 가능한 아이디인지 확인해 주세요.";
  let usernameHelperClass = "text-slate-500";
  if (fieldErrors.username) {
    usernameHelper = fieldErrors.username;
    usernameHelperClass = "text-rose-600";
  } else if (usernameNeedsRecheck) {
    usernameHelper = "아이디가 변경되었어요. 중복 확인을 다시 해주세요.";
    usernameHelperClass = "text-amber-600";
  } else if (usernameCheck.status === "available") {
    usernameHelper = "사용 가능한 아이디입니다.";
    usernameHelperClass = "text-emerald-600";
  } else if (usernameCheck.status === "unavailable") {
    usernameHelper = "이미 사용 중인 아이디입니다.";
    usernameHelperClass = "text-rose-600";
  } else if (usernameCheck.status === "error") {
    usernameHelper = "아이디 확인 중 문제가 발생했습니다.";
    usernameHelperClass = "text-rose-600";
  }

  const passwordHelper = fieldErrors.password
    ? fieldErrors.password
    : form.password.length === 0 || isPasswordValid
      ? "영문, 숫자, 특수문자를 모두 포함해야 합니다."
      : "비밀번호 형식이 올바르지 않습니다.";
  const passwordHelperClass = fieldErrors.password
    ? "text-rose-600"
    : form.password.length === 0 || isPasswordValid
      ? "text-slate-500"
      : "text-rose-600";

  const passwordConfirmHelper = fieldErrors.passwordConfirm
    ? fieldErrors.passwordConfirm
    : form.passwordConfirm.length === 0 || isPasswordConfirmMatched
      ? "입력한 비밀번호와 동일하게 입력해 주세요."
      : "비밀번호 확인이 일치하지 않습니다.";
  const passwordConfirmHelperClass =
    fieldErrors.passwordConfirm ||
    (form.passwordConfirm.length > 0 && !isPasswordConfirmMatched)
      ? "text-rose-600"
      : "text-slate-500";

  return (
    <section
      id="signup"
      className="flex min-h-screen items-center justify-center px-5 py-28 md:px-8"
    >
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-[640px] rounded-[32px] bg-white p-6 shadow-[0_20px_60px_rgba(15,23,42,0.06)] md:p-9"
      >
        <h2 className="mb-2 text-4xl font-black tracking-[-0.05em] text-slate-950 md:text-6xl">
          회원가입
        </h2>
        <p className="mb-8 text-sm font-medium text-slate-500 md:text-base">
          이메일 인증과 아이디 확인을 마치면 바로 시작할 수 있어요.
        </p>

        <div className="space-y-5">
          <div className="rounded-3xl border border-slate-100 bg-slate-50 p-4 md:p-5">
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              이메일
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <input
                type="email"
                value={form.email}
                onChange={(event) => update("email", event.target.value.trim())}
                disabled={emailStatus.verified}
                placeholder="이메일을 입력해 주세요"
                className={`h-14 flex-1 rounded-2xl border bg-white px-4 outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                  fieldErrors.email ? "border-rose-300" : "border-slate-200"
                }`}
              />
              <button
                type="button"
                onClick={handleSendEmail}
                disabled={isSendingEmail || emailStatus.verified}
                className="rounded-2xl bg-slate-950 px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isSendingEmail
                  ? "발송 중..."
                  : emailStatus.sent && !emailStatus.verified
                    ? "재전송"
                    : emailStatus.verified
                      ? "인증 완료"
                      : "인증코드 발송"}
              </button>
            </div>
            <p className={`mt-2 text-sm ${emailHelperClass}`}>{emailHelperText}</p>

            {emailStatus.sent ? (
              <div className="mt-4 rounded-2xl border border-slate-200 bg-white p-4">
                <div className="mb-3 flex items-center justify-between gap-3">
                  <p className="text-sm font-semibold text-slate-700">
                    인증코드를 입력해 주세요.
                  </p>
                  <span
                    className={`text-sm font-bold ${
                      emailStatus.expiresIn > 0 ? "text-slate-900" : "text-rose-500"
                    }`}
                  >
                    {emailStatus.verified
                      ? "인증 완료"
                      : emailStatus.expiresIn > 0
                        ? formatTimer(emailStatus.expiresIn)
                        : "만료됨"}
                  </span>
                </div>

                <div className="flex flex-col gap-3 md:flex-row">
                  <input
                    type="text"
                    value={form.verificationCode}
                    onChange={(event) =>
                      update("verificationCode", event.target.value.replace(/\D/g, ""))
                    }
                    disabled={emailStatus.verified}
                    maxLength={6}
                    placeholder="6자리 인증코드"
                    className={`h-14 flex-1 rounded-2xl border px-4 outline-none transition focus:border-slate-400 disabled:cursor-not-allowed disabled:bg-slate-100 ${
                      fieldErrors.verificationCode
                        ? "border-rose-300"
                        : "border-slate-200"
                    }`}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    disabled={isVerifyingEmail || emailStatus.verified}
                    className="rounded-2xl bg-slate-900 px-5 text-sm font-semibold text-white disabled:cursor-not-allowed disabled:opacity-70"
                  >
                    {isVerifyingEmail ? "확인 중..." : "인증코드 확인"}
                  </button>
                </div>
                {fieldErrors.verificationCode ? (
                  <p className="mt-2 text-sm text-rose-600">
                    {fieldErrors.verificationCode}
                  </p>
                ) : null}
              </div>
            ) : null}
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              아이디
            </label>
            <div className="flex flex-col gap-3 md:flex-row">
              <div className="relative flex-1">
                <input
                  type="text"
                  value={form.username}
                  onChange={(event) =>
                    update("username", event.target.value.replace(/\s/g, ""))
                  }
                  maxLength={20}
                  placeholder="영문, 숫자, 밑줄만 사용해 2~20자"
                  className={`h-14 w-full rounded-2xl border px-4 pr-16 outline-none transition focus:border-slate-400 ${
                    fieldErrors.username ? "border-rose-300" : "border-slate-200"
                  }`}
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-sm font-semibold text-slate-400">
                  {form.username.length}/20
                </span>
              </div>
              <button
                type="button"
                onClick={handleCheckUsername}
                disabled={isCheckingUsername}
                className="rounded-2xl border border-slate-300 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {isCheckingUsername ? "확인 중..." : "중복 확인"}
              </button>
            </div>
            <p className={`mt-2 text-sm ${usernameHelperClass}`}>{usernameHelper}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              비밀번호
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={form.password}
                onChange={(event) => update("password", event.target.value)}
                placeholder="영문, 숫자, 특수문자를 포함해 8~20자"
                className={`h-14 w-full rounded-2xl border px-4 pr-12 outline-none transition focus:border-slate-400 ${
                  fieldErrors.password ? "border-rose-300" : "border-slate-200"
                }`}
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
            <p className={`mt-2 text-sm ${passwordHelperClass}`}>{passwordHelper}</p>
          </div>

          <div>
            <label className="mb-2 block text-sm font-extrabold text-slate-900">
              비밀번호 확인
            </label>
            <div className="relative">
              <input
                type={showPasswordConfirm ? "text" : "password"}
                value={form.passwordConfirm}
                onChange={(event) => update("passwordConfirm", event.target.value)}
                placeholder="비밀번호를 한 번 더 입력해 주세요"
                className={`h-14 w-full rounded-2xl border px-4 pr-12 outline-none transition focus:border-slate-400 ${
                  fieldErrors.passwordConfirm ||
                  (form.passwordConfirm.length > 0 && !isPasswordConfirmMatched)
                    ? "border-rose-300"
                    : "border-slate-200"
                }`}
              />
              <button
                type="button"
                onClick={() => setShowPasswordConfirm((prev) => !prev)}
                aria-label={showPasswordConfirm ? "비밀번호 숨기기" : "비밀번호 표시"}
                className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-slate-900"
              >
                <EyeIcon open={showPasswordConfirm} />
              </button>
            </div>
            <p className={`mt-2 text-sm ${passwordConfirmHelperClass}`}>
              {passwordConfirmHelper}
            </p>
          </div>

          {generalError ? (
            <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
              {generalError}
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
                onChange={(event) => update("agreeAll", event.target.checked)}
                className="h-4 w-4 rounded border-slate-300"
              />
              <span>전체 동의</span>
            </label>
            <div className="mt-3 space-y-3">
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.agreeTerms}
                  onChange={(event) => update("agreeTerms", event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <Link to="/terms" className="underline hover:text-slate-900">
                  이용약관 동의(필수)
                </Link>
              </label>
              <label className="flex items-center gap-2 text-sm text-slate-700">
                <input
                  type="checkbox"
                  checked={form.agreePrivacy}
                  onChange={(event) => update("agreePrivacy", event.target.checked)}
                  className="h-4 w-4 rounded border-slate-300"
                />
                <Link to="/privacy" className="underline hover:text-slate-900">
                  개인정보 수집 및 이용 동의(필수)
                </Link>
              </label>
            </div>
            {fieldErrors.agree ? (
              <p className="mt-3 text-sm text-rose-600">{fieldErrors.agree}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-slate-950 px-4 py-4 text-base font-semibold text-white transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? "가입 중..." : "회원가입"}
          </button>

          <p className="text-center text-sm text-slate-500">
            이미 계정이 있으신가요?{" "}
            <Link to="/login" className="font-semibold text-sky-600 hover:text-sky-700">
              로그인
            </Link>
          </p>
        </div>
      </form>
    </section>
  );
}
