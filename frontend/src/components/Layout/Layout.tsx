import { ReactNode } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";

export default function Layout({ children }: { children: ReactNode }) {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <Link className="nav-link" to="/subjects">Предметы</Link>
        </div>
        <div className="nav-right">
          {isLoggedIn ? (
            <button className="nav-logout" onClick={handleLogout}>Выход</button>
          ) : (
            <>
              <Link className="nav-link" to="/login">Войти</Link>
              <Link className="nav-link" to="/register">Регистрация</Link>
            </>
          )}
        </div>
      </nav>
      <div className="layout-container">{children}</div>
    </div>
  );
}

