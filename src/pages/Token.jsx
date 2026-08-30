import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client";

function Token() {
  const [votingToken, setVotingToken] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const generateToken = async () => {
    setLoading(true);
    setMessage("");

    try {
      const data = await api.requestVotingToken();

      setVotingToken(
        data.token ||
        data.votingToken ||
        ""
      );

      if (!data.token && !data.votingToken) {
        setMessage("Voting token generated, but the response format needs to be checked.");
      }
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  const copyToken = async () => {
    await navigator.clipboard.writeText(votingToken);
    setMessage("Voting token copied.");
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
            BALLOT ACCESS
          </p>
        </header>

        <div className="login-card">
          <h2 className="login-title">Your Voting Token</h2>

          <p style={{ marginBottom: "24px" }}>
            Generate your one-time ballot token before proceeding to vote.
          </p>

          {message && (
            <div className="error-banner">
              {message}
            </div>
          )}

          {!votingToken ? (
            <button
              className="sign-btn"
              onClick={generateToken}
              disabled={loading}
            >
              {loading ? "Generating..." : "Generate Ballot Token"}
            </button>
          ) : (
            <>
              <div
                style={{
                  padding: "16px",
                  background: "#fff",
                  border: "1px dashed #b78c45",
                  wordBreak: "break-all",
                  marginBottom: "18px",
                  fontFamily: "monospace",
                }}
              >
                {votingToken}
              </div>

              <button
                className="sign-btn"
                onClick={copyToken}
                style={{ marginBottom: "12px" }}
              >
                Copy Token
              </button>

              <button
                className="sign-btn"
                onClick={() => navigate("/ballot")}
              >
                Continue to Ballot
              </button>
            </>
          )}
        </div>

      </div>
    </div>
  );
}

export default Token;