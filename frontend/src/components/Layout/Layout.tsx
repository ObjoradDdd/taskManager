import { Link, useNavigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import "./layout.css";

export default function Layout() {
  const { isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div>
      <nav className="navbar">
        <div className="nav-left">
          <Link className="nav-link" to="/admin_subjects">Предметы где я админ</Link>
          <Link className="nav-link" to="/member_subjects">Предметы где я участник</Link>
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

      <div className="layout-container">
        <Outlet />
      </div>
    </div>
  );
}
