import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI, setTokens } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import "../../styles/common.css";

export default function LoginPage() {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await AuthAPI.login({ userName, password });
      setTokens(response);
      // inform AuthContext that user is logged in and update accessToken state
      login();
      navigate("/admin_subjects");
    } catch (err: any) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Вход</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Email или имя пользователя"
          className="input"
          value={userName}
          onChange={(e) => setUserName(e.target.value)}
          disabled={loading}
        />
        <input
          placeholder="Пароль"
          type="password"
          className="input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-primary" disabled={loading}>
          {loading ? "Входа..." : "Войти"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Нет аккаунта? <a href="/register" style={{ color: "#007bff" }}>Зарегистрируйтесь</a>
      </p>
    </div>
  );
}
