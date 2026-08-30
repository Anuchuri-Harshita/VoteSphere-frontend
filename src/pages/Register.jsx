import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const [email, setEmail] = useState("");
  const [voterIdNumber, setVoterIdNumber] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          voterIdNumber,
          password,
        }),
      });

      const data = await response.text();

      if (!response.ok) {
        throw new Error(data || "Registration failed.");
      }

      alert(data);
      navigate("/login");
    } catch (error) {
      setMessage(error.message);
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

          <p className="brand-subtitle">CREATE VOTER ACCOUNT</p>
        </header>

        <div className="login-card">
          <h2 className="login-title">Create Account</h2>

          {message && (
            <div className="error-banner">
              {message}
            </div>
          )}

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Email Address</label>
              <input
                type="email"
                placeholder="voter@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Voter ID Number</label>
              <input
                type="text"
                placeholder="Enter voter ID number"
                value={voterIdNumber}
                onChange={(e) => setVoterIdNumber(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Password</label>
              <input
                type="password"
                placeholder="Create password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="field">
              <label>Confirm Password</label>
              <input
                type="password"
                placeholder="Re-enter password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="sign-btn"
            >
              Create Account
            </button>
          </form>
        </div>

        <div className="create-section">
          <p>
            Already part of VoteSphere?{" "}
            <Link to="/login">Sign In ›</Link>
          </p>
        </div>

      </div>
    </div>
  );
}

export default Register;