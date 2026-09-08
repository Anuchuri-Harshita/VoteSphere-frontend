import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { api } from "../api/client";

function Ballot() {
  const [parties, setParties] = useState([]);
  const [selectedParty, setSelectedParty] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();

  const votingToken = location.state?.votingToken;

  useEffect(() => {
    const loadParties = async () => {
      try {
        const data = await api.listParties();
        setParties(data);
      } catch (error) {
        setMessage(error.message);
      } finally {
        setLoading(false);
      }
    };

    loadParties();
  }, []);

  const handleVote = async () => {
    if (!selectedParty) {
      setMessage("Please select a party before voting.");
      return;
    }

    if (!votingToken) {
      setMessage(
        "Voting token is missing. Please generate a token again."
      );
      return;
    }

    try {
      const response = await api.castVote(
        votingToken,
        selectedParty.id
      );

      navigate("/receipt", {
        state: {
          message:
            response.message || "Vote recorded successfully.",
          party: selectedParty,
        },
      });
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

          <p className="brand-subtitle">
            CAST YOUR VOTE
          </p>
        </header>

        <div className="login-card">

          <h2 className="login-title">
            Official Ballot
          </h2>

          <p>
            Select one party and confirm your vote.
          </p>

          {message && (
            <div className="error-banner">
              {message}
            </div>
          )}

          {loading ? (
            <p>Loading parties...</p>
          ) : (
            <div>
              {parties.map((party) => (
                <label
                  key={party.id}
                  style={{
                    display: "block",
                    padding: "15px",
                    marginBottom: "10px",
                    border: "1px solid #cfc6a9",
                    cursor: "pointer",
                  }}
                >
                  <input
                    type="radio"
                    name="party"
                    checked={
                      selectedParty?.id === party.id
                    }
                    onChange={() =>
                      setSelectedParty(party)
                    }
                  />

                  <span style={{ marginLeft: "10px" }}>
                    {party.name}
                  </span>
                </label>
              ))}
            </div>
          )}

          <button
            className="sign-btn"
            onClick={handleVote}
            disabled={!selectedParty}
            style={{ marginTop: "20px" }}
          >
            Confirm Vote
          </button>

        </div>
      </div>
    </div>
  );
}

export default Ballot;