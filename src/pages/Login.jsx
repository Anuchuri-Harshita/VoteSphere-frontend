import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { api } from "../api/client";
function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const data = await api.login(email, password);

    localStorage.setItem("authToken", data.token);

    navigate("/token");
  } catch (error) {
    alert(error.message);
  }
};

  return (
    <div className="login-page">
      <div className="login-wrapper">

        <header className="brand-section">
          <h1 className="brand-title">VoteSphere</h1>

          <div className="brand-divider">
            <span></span>
            <b>✦</b>
            <span></span>
          </div>

          <p className="brand-subtitle">
            SECURE VOTER ACCESS
          </p>
        </header>

        <div className="login-card">
          <h2 className="login-title">Sign In</h2>

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Email Address</label>

              <div className="input-wrapper">
                <span className="input-icon">✉</span>

                <input
                  type="email"
                  placeholder="voter@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="field">
              <label>Password</label>

              <div className="input-wrapper">
                <span className="input-icon">🔒</span>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="forgot-row">
              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full sign-btn"
            >
              Sign In
            </button>

          </form>
        </div>

        <div className="create-section">

          <div className="create-divider">
            <span></span>
            <b>◆</b>
            <span></span>
          </div>

          <p>
            Don't have an account?{" "}
            <Link to="/register">
              Create Account ›
            </Link>
          </p>

        </div>

        <footer className="vote-footer">
          <span className="shield">♢</span>

          <p>
            Your vote. Your voice.{" "}
            <strong>Your future.</strong>{" "}
            Let's build it together!
          </p>
        </footer>

      </div>
    </div>
  );
}

export default Login;