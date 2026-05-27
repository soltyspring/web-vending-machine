import { useEffect, useState } from "react";
import { createApiUrl, extractErrorMessage, parseJsonResponse } from "../lib/api";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 2026-05-13 계정 찾기/비밀번호 재설정 공통 메시지 추가
const AUTH_MESSAGES = {
  foundUsername: "아이디를 찾았습니다.",
  foundEmail: "이메일을 찾았습니다.",
  codeSent: "인증코드를 이메일로 발송했습니다.",
  verified: "인증이 완료되었습니다.",
  passwordReset: "비밀번호가 재설정되었습니다.",
  accountNotFound: "가입된 계정을 찾을 수 없습니다.",
  invalidEmail: "이메일 형식이 올바르지 않습니다.",
  invalidCode: "인증코드가 올바르지 않습니다.",
  expiredCode: "인증코드가 만료되었습니다.",
  invalidPassword: "새 비밀번호 형식이 올바르지 않습니다.",
  tryAgain: "잠시 후 다시 시도해 주세요.",
};

// 2026-05-13 회원가입과 동일 정책 적용 전 임시 프론트 비밀번호 검증 추가
// 회원가입 페이지에 별도 정책 함수가 있으면 이 함수 내부만 같은 조건으로 맞추면 됩니다.
const passwordPattern =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z\d]).{8,20}$/;

const getPayloadMessage = (payload, fallback) =>
  payload?.message || extractErrorMessage(payload, fallback);

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

export default function FindAccountModal({ open, onClose }) {
  const [tab, setTab] = useState("id");

  // 2026-05-13 아이디 찾기 상태 추가
  const [findUsernameEmail, setFindUsernameEmail] = useState("");
  const [maskedUsername, setMaskedUsername] = useState("");
  const [findUsernameCode, setFindUsernameCode] = useState("");
  const [fullUsername, setFullUsername] = useState("");
  const [findUsernameCodeSent, setFindUsernameCodeSent] = useState(false);

  // 2026-05-13 이메일 찾기 상태 추가
  const [findEmailUsername, setFindEmailUsername] = useState("");
  const [maskedEmail, setMaskedEmail] = useState("");

  // 2026-05-13 비밀번호 재설정 상태 추가
  const [resetEmail, setResetEmail] = useState("");
  const [resetCode, setResetCode] = useState("");
  const [resetCodeSent, setResetCodeSent] = useState(false);
  const [resetVerified, setResetVerified] = useState(false);
  const [resetToken, setResetToken] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newPasswordConfirm, setNewPasswordConfirm] = useState("");
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showNewPasswordConfirm, setShowNewPasswordConfirm] = useState(false);
  const [resetCompleted, setResetCompleted] = useState(false);

  // 2026-05-13 단계별 로딩/메시지/필드 에러 상태 추가
  const [loadingKey, setLoadingKey] = useState("");
  const [message, setMessage] = useState("");
  const [serverError, setServerError] = useState("");
  const [fieldErrors, setFieldErrors] = useState({});

  const isLoading = Boolean(loadingKey);

  useEffect(() => {
    if (!open) {
      setTab("id");

      setFindUsernameEmail("");
      setMaskedUsername("");
      setFindUsernameCode("");
      setFullUsername("");
      setFindUsernameCodeSent(false);

      setFindEmailUsername("");
      setMaskedEmail("");

      setResetEmail("");
      setResetCode("");
      setResetCodeSent(false);
      setResetVerified(false);
      setResetToken("");
      setNewPassword("");
      setNewPasswordConfirm("");
      setShowNewPassword(false);
      setShowNewPasswordConfirm(false);
      setResetCompleted(false);

      setLoadingKey("");
      setMessage("");
      setServerError("");
      setFieldErrors({});
    }
  }, [open]);

  useEffect(() => {
    if (!message) return undefined;

    const timer = window.setTimeout(() => {
      setMessage("");
    }, 2500);

    return () => window.clearTimeout(timer);
  }, [message]);

  if (!open) return null;

  const clearNotice = () => {
    setMessage("");
    setServerError("");
    setFieldErrors({});
  };

  const switchTab = (next) => {
    setTab(next);
    clearNotice();
  };

  // 2026-05-13 입력값 변경 시 이후 단계 상태 초기화 처리 추가
  const handleFindUsernameEmailChange = (event) => {
    setFindUsernameEmail(event.target.value.trim());
    setMaskedUsername("");
    setFindUsernameCode("");
    setFullUsername("");
    setFindUsernameCodeSent(false);
    clearNotice();
  };

  const handleFindUsernameCodeChange = (event) => {
    setFindUsernameCode(event.target.value.trim());
    setFullUsername("");
    setFieldErrors((prev) => ({ ...prev, findUsernameCode: "" }));
    setServerError("");
  };

  const handleFindEmailUsernameChange = (event) => {
    setFindEmailUsername(event.target.value);
    setMaskedEmail("");
    clearNotice();
  };

  const handleResetEmailChange = (event) => {
    setResetEmail(event.target.value.trim());
    setResetCode("");
    setResetCodeSent(false);
    setResetVerified(false);
    setResetToken("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setShowNewPassword(false);
    setShowNewPasswordConfirm(false);
    setResetCompleted(false);
    clearNotice();
  };

  const handleResetCodeChange = (event) => {
    setResetCode(event.target.value.trim());
    setResetVerified(false);
    setResetToken("");
    setNewPassword("");
    setNewPasswordConfirm("");
    setShowNewPassword(false);
    setShowNewPasswordConfirm(false);
    setFieldErrors((prev) => ({ ...prev, resetCode: "" }));
    setServerError("");
  };

  const validateEmail = (value, key) => {
    if (!value) {
      setFieldErrors({ [key]: "이메일을 입력해 주세요." });
      return false;
    }

    if (!emailPattern.test(value)) {
      setFieldErrors({ [key]: AUTH_MESSAGES.invalidEmail });
      return false;
    }

    return true;
  };

  const requestApi = async ({ path, body, fallbackMessage }) => {
    const response = await fetch(createApiUrl(path), {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    const payload = await parseJsonResponse(response);

    if (!response.ok) {
      throw new Error(getPayloadMessage(payload, fallbackMessage));
    }

    return payload;
  };

  // 2026-05-13 아이디 일부 찾기 API 연동 추가
  const handleFindUsername = async (event) => {
    event.preventDefault();
    clearNotice();

    if (!validateEmail(findUsernameEmail, "findUsernameEmail")) return;

    setLoadingKey("findUsername");

    try {
      const payload = await requestApi({
        path: "/api/auth/find-username",
        body: { email: findUsernameEmail },
        fallbackMessage: AUTH_MESSAGES.accountNotFound,
      });

      setMaskedUsername(payload.maskedUsername || payload.username || "");
      setMessage(payload.message || AUTH_MESSAGES.foundUsername);
    } catch (error) {
      setServerError(error.message || AUTH_MESSAGES.tryAgain);
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 전체 아이디 확인용 인증코드 발송 API 연동 추가
  const handleSendFindUsernameCode = async () => {
    clearNotice();

    if (!validateEmail(findUsernameEmail, "findUsernameEmail")) return;

    setLoadingKey("sendFindUsernameCode");

    try {
      const payload = await requestApi({
        path: "/api/auth/send-find-username-code",
        body: { email: findUsernameEmail },
        fallbackMessage: AUTH_MESSAGES.tryAgain,
      });

      setFindUsernameCodeSent(true);
      setMessage(payload.message || AUTH_MESSAGES.codeSent);
    } catch (error) {
      setServerError(error.message || AUTH_MESSAGES.tryAgain);
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 아이디 찾기 인증코드 확인 API 연동 추가
  const handleVerifyFindUsernameCode = async () => {
    setMessage("");
    setServerError("");
    setFieldErrors({});

    if (!findUsernameCode) {
      setFieldErrors({ findUsernameCode: "인증코드를 입력해 주세요." });
      return;
    }

    setLoadingKey("verifyFindUsernameCode");

    try {
      const payload = await requestApi({
        path: "/api/auth/verify-find-username-code",
        body: {
          email: findUsernameEmail,
          code: findUsernameCode,
        },
        fallbackMessage: AUTH_MESSAGES.invalidCode,
      });

      setFullUsername(payload.username || payload.fullUsername || "");
      setMessage(payload.message || AUTH_MESSAGES.verified);
    } catch (error) {
      setFieldErrors({ findUsernameCode: error.message || AUTH_MESSAGES.invalidCode });
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 이메일 찾기 API 연동 추가
  const handleFindEmail = async (event) => {
    event.preventDefault();
    clearNotice();

    if (!findEmailUsername.trim()) {
      setFieldErrors({ findEmailUsername: "아이디를 입력해 주세요." });
      return;
    }

    setLoadingKey("findEmail");

    try {
      const payload = await requestApi({
        path: "/api/auth/find-email",
        body: { username: findEmailUsername },
        fallbackMessage: AUTH_MESSAGES.accountNotFound,
      });

      setMaskedEmail(payload.maskedEmail || payload.email || "");
      setMessage(payload.message || AUTH_MESSAGES.foundEmail);
    } catch (error) {
      setServerError(error.message || AUTH_MESSAGES.tryAgain);
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 비밀번호 재설정 인증코드 발송 API 연동 추가
  const handleSendPasswordResetCode = async (event) => {
    event.preventDefault();
    clearNotice();

    if (!validateEmail(resetEmail, "resetEmail")) return;

    setLoadingKey("sendPasswordResetCode");

    try {
      const payload = await requestApi({
        path: "/api/auth/send-password-reset-code",
        body: { email: resetEmail },
        fallbackMessage: AUTH_MESSAGES.tryAgain,
      });

      setResetCodeSent(true);
      setMessage(payload.message || AUTH_MESSAGES.codeSent);
    } catch (error) {
      setServerError(error.message || AUTH_MESSAGES.tryAgain);
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 비밀번호 재설정 인증코드 확인 API 연동 추가
  const handleVerifyPasswordResetCode = async () => {
    setMessage("");
    setServerError("");
    setFieldErrors({});

    if (!resetCode) {
      setFieldErrors({ resetCode: "인증코드를 입력해 주세요." });
      return;
    }

    setLoadingKey("verifyPasswordResetCode");

    try {
      const payload = await requestApi({
        path: "/api/auth/verify-password-reset-code",
        body: {
          email: resetEmail,
          code: resetCode,
        },
        fallbackMessage: AUTH_MESSAGES.invalidCode,
      });

      setResetVerified(true);
      setResetToken(payload.resetToken || "");
      setMessage(payload.message || AUTH_MESSAGES.verified);
    } catch (error) {
      setFieldErrors({ resetCode: error.message || AUTH_MESSAGES.invalidCode });
    } finally {
      setLoadingKey("");
    }
  };

  // 2026-05-13 새 비밀번호 재설정 API 연동 추가
  const handleResetPassword = async () => {
    setMessage("");
    setServerError("");
    setFieldErrors({});

    if (!passwordPattern.test(newPassword)) {
      setFieldErrors({ newPassword: AUTH_MESSAGES.invalidPassword });
      return;
    }

    if (newPassword !== newPasswordConfirm) {
      setFieldErrors({ newPasswordConfirm: "새 비밀번호가 일치하지 않습니다." });
      return;
    }

    setLoadingKey("resetPassword");

    try {
      const payload = await requestApi({
        path: "/api/auth/reset-password",
        body: {
          email: resetEmail,
          resetToken,
          newPassword,
        },
        fallbackMessage: AUTH_MESSAGES.tryAgain,
      });

      setResetCompleted(true);
      setMessage(payload.message || AUTH_MESSAGES.passwordReset);
    } catch (error) {
      setServerError(error.message || AUTH_MESSAGES.tryAgain);
    } finally {
      setLoadingKey("");
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 px-4"
      onClick={onClose}
    >
      <div
        className="max-h-[90vh] w-full max-w-[440px] overflow-y-auto rounded-[28px] bg-white p-6 shadow-[0_24px_70px_rgba(15,23,42,0.18)] md:p-8"
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

        {/* 2026-05-13 이메일 찾기 탭 추가 및 비밀번호 찾기 문구를 재설정으로 변경 */}
        <div className="mb-5 grid grid-cols-3 gap-2 rounded-2xl bg-slate-100 p-1">
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
            onClick={() => switchTab("email")}
            className={`rounded-xl px-3 py-2 text-sm font-bold transition ${
              tab === "email"
                ? "bg-white text-slate-950 shadow-sm"
                : "text-slate-500 hover:text-slate-700"
            }`}
          >
            이메일 찾기
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
            비밀번호 재설정
          </button>
        </div>

        {tab === "id" ? (
          <form onSubmit={handleFindUsername} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-900">
                이메일
              </label>
              <input
                type="email"
                value={findUsernameEmail}
                onChange={handleFindUsernameEmailChange}
                placeholder="가입 시 사용한 이메일"
                disabled={isLoading}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
              />
              {fieldErrors.findUsernameEmail ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {fieldErrors.findUsernameEmail}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">
                  가입한 이메일로 아이디 일부를 확인합니다.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
            >
              {loadingKey === "findUsername" ? "확인 중..." : "아이디 찾기"}
            </button>

            {maskedUsername ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800">
                가입된 아이디: {maskedUsername}
              </div>
            ) : null}

            {maskedUsername ? (
              <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-sm font-black text-slate-950">전체 아이디 찾기</p>
                  <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
                    이메일 인증을 완료하면 마스킹되지 않은 전체 아이디를 확인할 수 있습니다.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handleSendFindUsernameCode}
                  disabled={isLoading}
                  className="w-full rounded-2xl border border-slate-200 bg-white px-4 py-3 text-sm font-bold text-slate-900 transition hover:bg-slate-50 disabled:cursor-wait disabled:opacity-70"
                >
                  {loadingKey === "sendFindUsernameCode"
                    ? "발송 중..."
                    : "이메일로 인증코드 받기"}
                </button>

                {findUsernameCodeSent ? (
                  <div>
                    <label className="mb-2 block text-sm font-extrabold text-slate-900">
                      인증코드
                    </label>
                    <input
                      type="text"
                      value={findUsernameCode}
                      onChange={handleFindUsernameCodeChange}
                      placeholder="인증코드를 입력해 주세요"
                      disabled={isLoading}
                      className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
                    />
                    {fieldErrors.findUsernameCode ? (
                      <p className="mt-2 text-xs font-semibold text-rose-600">
                        {fieldErrors.findUsernameCode}
                      </p>
                    ) : null}

                    <button
                      type="button"
                      onClick={handleVerifyFindUsernameCode}
                      disabled={isLoading || Boolean(fullUsername)}
                      className="mt-3 w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                    >
                      {fullUsername
                        ? "인증완료"
                        : loadingKey === "verifyFindUsernameCode"
                          ? "인증 중..."
                          : "인증하기"}
                    </button>
                  </div>
                ) : null}

                {fullUsername ? (
                  <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700">
                    전체 아이디: {fullUsername}
                  </div>
                ) : null}
              </div>
            ) : null}

            {message ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                {message}
              </p>
            ) : null}

            {serverError ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {serverError}
              </p>
            ) : null}
          </form>
        ) : null}

        {tab === "email" ? (
          <form onSubmit={handleFindEmail} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-900">
                아이디
              </label>
              <input
                type="text"
                value={findEmailUsername}
                onChange={handleFindEmailUsernameChange}
                placeholder="가입한 아이디를 입력해 주세요"
                disabled={isLoading}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
              />
              {fieldErrors.findEmailUsername ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {fieldErrors.findEmailUsername}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">
                  가입한 아이디로 마스킹된 이메일을 확인합니다.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
            >
              {loadingKey === "findEmail" ? "확인 중..." : "이메일 찾기"}
            </button>

            {maskedEmail ? (
              <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm font-bold text-slate-800">
                가입된 이메일: {maskedEmail}
              </div>
            ) : null}

            {message ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                {message}
              </p>
            ) : null}

            {serverError ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {serverError}
              </p>
            ) : null}
          </form>
        ) : null}

        {tab === "password" ? (
          <form onSubmit={handleSendPasswordResetCode} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-extrabold text-slate-900">
                이메일
              </label>
              <input
                type="email"
                value={resetEmail}
                onChange={handleResetEmailChange}
                placeholder="가입 시 사용한 이메일"
                disabled={isLoading || resetVerified}
                className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
              />
              {fieldErrors.resetEmail ? (
                <p className="mt-2 text-xs font-semibold text-rose-600">
                  {fieldErrors.resetEmail}
                </p>
              ) : (
                <p className="mt-2 text-xs text-slate-500">
                  인증 성공 후 이메일을 수정하려면 다시 처음부터 진행해 주세요.
                </p>
              )}
            </div>

            {!resetCodeSent ? (
              <button
                type="submit"
                disabled={isLoading}
                className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
              >
                {loadingKey === "sendPasswordResetCode"
                  ? "발송 중..."
                  : "인증코드 받기"}
              </button>
            ) : null}

            {resetCodeSent ? (
              <div className="space-y-4 rounded-2xl border border-slate-200 p-4">
                <div>
                  <label className="mb-2 block text-sm font-extrabold text-slate-900">
                    인증코드
                  </label>
                  <input
                    type="text"
                    value={resetCode}
                    onChange={handleResetCodeChange}
                    placeholder="인증코드를 입력해 주세요"
                    disabled={isLoading || resetVerified}
                    className="h-12 w-full rounded-2xl border border-slate-200 px-4 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
                  />
                  {fieldErrors.resetCode ? (
                    <p className="mt-2 text-xs font-semibold text-rose-600">
                      {fieldErrors.resetCode}
                    </p>
                  ) : null}
                </div>

                {!resetVerified ? (
                  <button
                    type="button"
                    onClick={handleVerifyPasswordResetCode}
                    disabled={isLoading}
                    className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                  >
                    {loadingKey === "verifyPasswordResetCode"
                      ? "인증 중..."
                      : "인증하기"}
                  </button>
                ) : (
                  <button
                    type="button"
                    disabled
                    className="w-full rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3.5 text-sm font-bold text-emerald-700"
                  >
                    인증완료
                  </button>
                )}

                {resetVerified ? (
                  <div className="space-y-4">
                    <div>
                      <label className="mb-2 block text-sm font-extrabold text-slate-900">
                        새 비밀번호
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPassword ? "text" : "password"}
                          value={newPassword}
                          onChange={(event) => {
                            setNewPassword(event.target.value);
                            setFieldErrors((prev) => ({ ...prev, newPassword: "" }));
                            setServerError("");
                          }}
                          placeholder="새 비밀번호를 입력해 주세요"
                          disabled={isLoading || resetCompleted}
                          className="h-12 w-full rounded-2xl border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword((prev) => !prev)}
                          disabled={isLoading || resetCompleted}
                          aria-label={showNewPassword ? "새 비밀번호 숨기기" : "새 비밀번호 표시"}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <EyeIcon open={showNewPassword} />
                        </button>
                      </div>
                      {fieldErrors.newPassword ? (
                        <p className="mt-2 text-xs font-semibold text-rose-600">
                          {fieldErrors.newPassword}
                        </p>
                      ) : null}
                    </div>

                    <div>
                      <label className="mb-2 block text-sm font-extrabold text-slate-900">
                        새 비밀번호 확인
                      </label>
                      <div className="relative">
                        <input
                          type={showNewPasswordConfirm ? "text" : "password"}
                          value={newPasswordConfirm}
                          onChange={(event) => {
                            setNewPasswordConfirm(event.target.value);
                            setFieldErrors((prev) => ({
                              ...prev,
                              newPasswordConfirm: "",
                            }));
                            setServerError("");
                          }}
                          placeholder="새 비밀번호를 다시 입력해 주세요"
                          disabled={isLoading || resetCompleted}
                          className="h-12 w-full rounded-2xl border border-slate-200 px-4 pr-12 text-sm outline-none transition focus:border-slate-400 disabled:bg-slate-50"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPasswordConfirm((prev) => !prev)}
                          disabled={isLoading || resetCompleted}
                          aria-label={showNewPasswordConfirm ? "새 비밀번호 확인 숨기기" : "새 비밀번호 확인 표시"}
                          className="absolute right-3 top-1/2 -translate-y-1/2 rounded-lg p-2 text-slate-500 hover:text-slate-900 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          <EyeIcon open={showNewPasswordConfirm} />
                        </button>
                      </div>
                      {fieldErrors.newPasswordConfirm ? (
                        <p className="mt-2 text-xs font-semibold text-rose-600">
                          {fieldErrors.newPasswordConfirm}
                        </p>
                      ) : null}
                    </div>

                    {!resetCompleted ? (
                      <button
                        type="button"
                        onClick={handleResetPassword}
                        disabled={isLoading}
                        className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5 disabled:cursor-wait disabled:opacity-70"
                      >
                        {loadingKey === "resetPassword"
                          ? "재설정 중..."
                          : "비밀번호 재설정"}
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={onClose}
                        className="w-full rounded-2xl bg-slate-950 px-4 py-3.5 text-sm font-bold text-white transition hover:-translate-y-0.5"
                      >
                        비밀번호 재설정
                      </button>
                    )}
                  </div>
                ) : null}
              </div>
            ) : null}

            {message ? (
              <p className="rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-600">
                {message}
              </p>
            ) : null}

            {serverError ? (
              <p className="rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm font-medium text-rose-600">
                {serverError}
              </p>
            ) : null}
          </form>
        ) : null}
      </div>
    </div>
  );
}
