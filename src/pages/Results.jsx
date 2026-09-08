import { useEffect, useState } from "react";
import { api } from "../api/client";

function Results() {
  const [parties, setParties] = useState([]);
  const [message, setMessage] = useState("");

  useEffect(() => {
    const loadResults = async () => {
      try {
        const data = await api.getResults();
        setParties(data);
      } catch (error) {
        setMessage(error.message);
      }
    };

    loadResults();
  }, []);

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
            ELECTION RESULTS
          </p>
        </header>

        <div className="login-card">

          <h2 className="login-title">
            Live Results
          </h2>

          {message && (
            <div className="error-banner">
              {message}
            </div>
          )}

          {parties.map((party) => (
            <div
              key={party.id}
              style={{
                padding: "16px",
                marginBottom: "12px",
                border: "1px solid #cfc6a9",
              }}
            >
              <strong>{party.name}</strong>

              <span
                style={{
                  float: "right",
                }}
              >
                {party.voteCount} votes
              </span>
            </div>
          ))}

        </div>

      </div>
    </div>
  );
}

export default Results;