import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { ReactNode } from "react";

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const { isLoggedIn } = useAuth();
  // Also allow access if an access token exists in localStorage but context hasn't updated yet
  const hasToken = !!localStorage.getItem("accessToken");

  if (!isLoggedIn && !hasToken) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
}
