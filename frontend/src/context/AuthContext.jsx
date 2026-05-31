import { useMemo, useSyncExternalStore } from "react";
import { AuthContext } from "./AuthContextObject";
import {
  clearAccessToken,
  getStoredAccessToken,
  persistAccessToken,
  subscribeAuthChange,
} from "../lib/auth";

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
