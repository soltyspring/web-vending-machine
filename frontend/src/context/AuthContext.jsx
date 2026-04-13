import { createContext, useContext, useMemo, useSyncExternalStore } from "react";
import {
  clearAccessToken,
  getStoredAccessToken,
  persistAccessToken,
  subscribeAuthChange,
} from "../lib/auth";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const accessToken = useSyncExternalStore(
    subscribeAuthChange,
    getStoredAccessToken,
    () => ""
  );

  const value = useMemo(
    () => ({
      accessToken,
      isLoggedIn: Boolean(accessToken),
      login: (token, keepLogin = true) => persistAccessToken(token, keepLogin),
      logout: () => clearAccessToken(),
    }),
    [accessToken]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider.");
  }

  return context;
}
