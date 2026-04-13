const ACCESS_TOKEN_KEY = "access_token";
const AUTH_CHANGE_EVENT = "auth-change";

export function getStoredAccessToken() {
  if (typeof window === "undefined") return "";

  return (
    window.localStorage.getItem(ACCESS_TOKEN_KEY) ||
    window.sessionStorage.getItem(ACCESS_TOKEN_KEY) ||
    ""
  );
}

export function persistAccessToken(token, keepLogin = true) {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);

  const targetStorage = keepLogin ? window.localStorage : window.sessionStorage;
  targetStorage.setItem(ACCESS_TOKEN_KEY, token);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function clearAccessToken() {
  if (typeof window === "undefined") return;

  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.sessionStorage.removeItem(ACCESS_TOKEN_KEY);
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
}

export function subscribeAuthChange(callback) {
  if (typeof window === "undefined") return () => {};

  const handleChange = () => callback();

  window.addEventListener("storage", handleChange);
  window.addEventListener(AUTH_CHANGE_EVENT, handleChange);

  return () => {
    window.removeEventListener("storage", handleChange);
    window.removeEventListener(AUTH_CHANGE_EVENT, handleChange);
  };
}

