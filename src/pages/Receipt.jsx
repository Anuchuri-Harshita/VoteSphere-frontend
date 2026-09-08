import { useLocation } from "react-router-dom";

function Receipt() {
  const location = useLocation();

  const message =
    location.state?.message || "Vote recorded successfully.";

  const party = location.state?.party;

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
            VOTE CONFIRMATION
          </p>
        </header>

        <div className="login-card">

          <h2 className="login-title">
            Vote Submitted
          </h2>

          <p style={{ marginBottom: "20px" }}>
            {message}
          </p>

          {party && (
            <p>
              Selected Party:{" "}
              <strong>{party.name}</strong>
            </p>
          )}

          <p style={{ marginTop: "20px" }}>
            Your voting token has been used and cannot be used again.
          </p>

          <p style={{ marginTop: "20px" }}>
            Thank you for participating in the election.
          </p>

        </div>

      </div>
    </div>
  );
}

export default Receipt;