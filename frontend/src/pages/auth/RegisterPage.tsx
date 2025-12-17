import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthAPI, setTokens } from "../../api/auth";
import { useAuth } from "../../context/AuthContext";
import "../../styles/common.css";

export default function RegisterPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }

    setLoading(true);

    try {
      await AuthAPI.register({ email, displayName, password });
      // Automatically login after successful registration
      const response = await AuthAPI.login({ userName: email, password });
      setTokens(response);
  login();
      navigate("/admin_subjects");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ maxWidth: "400px", margin: "50px auto" }}>
      <h1>Регистрация</h1>
      {error && <div className="error-message">{error}</div>}
      <form className="form" onSubmit={handleSubmit}>
        <input
          placeholder="Имя"
          className="input"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
          disabled={loading}
        />
        <input
          placeholder="Email"
          type="email"
          className="input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
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
        <input
          placeholder="Подтвердите пароль"
          type="password"
          className="input"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          disabled={loading}
        />
        <button className="btn btn-success" disabled={loading}>
          {loading ? "Создание..." : "Создать"}
        </button>
      </form>
      <p style={{ marginTop: "15px", textAlign: "center" }}>
        Уже есть аккаунт? <a href="/login" style={{ color: "#007bff" }}>Войти</a>
      </p>
    </div>
  );
}
