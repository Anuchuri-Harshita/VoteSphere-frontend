const BASE = "/api";

function authHeaders() {
  const token = localStorage.getItem("authToken");

  return token
    ? {
        Authorization: `Bearer ${token}`,
      }
    : {};
}

async function handleResponse(response) {
  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    throw new Error(
      data.message ||
      data.error ||
      `Request failed (${response.status})`
    );
  }

  return data;
}

export const api = {
  login: (email, password) =>
    fetch(`${BASE}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    }).then(handleResponse),

  requestVotingToken: () =>
    fetch(`${BASE}/voting/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...authHeaders(),
      },
    }).then(handleResponse),

  listParties: () =>
    fetch(`${BASE}/parties`, {
      method: "GET",
    }).then(handleResponse),

  castVote: (votingToken, partyId) =>
    fetch(`${BASE}/voting/cast`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        votingToken,
        partyId,
      }),
    }).then(handleResponse),

};