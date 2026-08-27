import { useState } from "react";
import { Link } from "react-router-dom";

function ForgotPassword() {
  const [dob, setDob] = useState("");
  const [showDetails, setShowDetails] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later connect this DOB to backend
    setShowDetails(true);
  };

  return (
    <div className="forgot-page">

      <div className="forgot-wrapper">

        <Link to="/login" className="back-link">
          ← Back to Sign In
        </Link>

        <div className="forgot-header">
          <div className="lock-circle">🔐</div>

          <h1>Forgot Password?</h1>

          <p>
            Enter your date of birth to view your account details.
          </p>
        </div>

        <div className="forgot-card">

          <form onSubmit={handleSubmit}>

            <div className="field">
              <label>Date of Birth</label>

              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                required
              />
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full"
            >
              Show My Details
            </button>

          </form>

        </div>

        <div className="security-note">
          🛡 We only use your DOB to help you recover your account securely.
        </div>

        {showDetails && (
          <div className="account-card">

            <h2>Your Account Details</h2>

            <div className="detail-row">
              <span>Full Name</span>
              <strong>Voter Name</strong>
            </div>

            <div className="detail-row">
              <span>Email Address</span>
              <strong>voter@example.com</strong>
            </div>

            <div className="detail-row">
              <span>Voter ID</span>
              <strong>VS123456789</strong>
            </div>

            <div className="detail-row">
              <span>Registered On</span>
              <strong>12 Jan 2026</strong>
            </div>

            <div className="account-message">
              If these details are correct, you can return to Sign In.
            </div>

          </div>
        )}

      </div>
    </div>
  );
}

export default ForgotPassword;