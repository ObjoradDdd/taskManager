import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { isAuthenticated, getAccessToken, clearTokens, getRefreshToken, AuthAPI, setTokens } from "../api/auth";

interface AuthContextType {
  isLoggedIn: boolean;
  accessToken: string | null;
  login: () => void;
  logout: () => void;
  refreshAccessToken: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(isAuthenticated());
  const [accessToken, setAccessToken] = useState(getAccessToken());

  useEffect(() => {
    // Set up interceptor for auto-refresh on 401
    const originalFetch = window.fetch;
    window.fetch = async (...args) => {
      let response = await originalFetch(...args);
      
      if (response.status === 401 && isLoggedIn) {
        try {
          await refreshAccessToken();
          response = await originalFetch(...args);
        } catch {
          handleLogout();
        }
      }
      
      return response;
    };

    return () => {
      window.fetch = originalFetch;
    };
  }, [isLoggedIn]);

  const refreshAccessToken = async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error("No refresh token");
    
    const response = await AuthAPI.refresh(refreshToken);
    setTokens(response);
    setAccessToken(response.accessToken);
  };

  const handleLogout = () => {
    clearTokens();
    setIsLoggedIn(false);
    setAccessToken(null);
  };

  const value: AuthContextType = {
    isLoggedIn,
    accessToken,
    login: () => setIsLoggedIn(true),
    logout: handleLogout,
    refreshAccessToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
