import { api } from "./client";

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
}

export interface LoginRequest {
  userName: string;
  password: string;
}

export interface RegisterRequest {
  email: string;
  displayName: string;
  password: string;
}

export interface User {
  id: string | number;
  email: string;
  displayName: string;
}

export const AuthAPI = {
  login: (data: LoginRequest) => api("/auth/login", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  
  register: (data: RegisterRequest) => api("/auth/register", {
    method: "POST",
    body: JSON.stringify(data),
  }),
  
  refresh: (refreshToken: string) => api("/auth/refresh", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  }),
  
  logout: (refreshToken: string) => api("/auth/logout", {
    method: "POST",
    body: JSON.stringify({ refreshToken }),
  }),

  me: () => api("/auth/me", {
    method: "GET",
  }),
};

// Token storage utilities
export function setTokens(response: AuthResponse) {
  localStorage.setItem("accessToken", response.accessToken);
  localStorage.setItem("refreshToken", response.refreshToken);
}

export function getAccessToken() {
  return localStorage.getItem("accessToken");
}

export function getRefreshToken() {
  return localStorage.getItem("refreshToken");
}

export function clearTokens() {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
}

export function isAuthenticated() {
  return !!getAccessToken();
}
