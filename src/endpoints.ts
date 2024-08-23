const endpoints = {
  "GET /api":
    "Checks if the API is working and provides a list of available endpoints",
  "GET /api/abilities": "Fetches all abilities",
  "GET /api/accounts": "Fetches all accounts",
  "GET /api/decks": "Fetches all decks",
  "GET /api/characters": "Fetches all characters",
  "GET /api/decks-characters": "Fetches all deck-character relations",
  "GET /api/profiles": "Fetches all profiles",
  "GET /api/profiles-characters": "Fetches all profile-character relations",
  "POST /api/profiles": "Creates a new profile",
  "PATCH /api/profiles/:profile_id":
    "Updates an existing profile by profile ID",
};

export default endpoints;
