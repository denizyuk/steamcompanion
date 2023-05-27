import axios from 'axios';

// Get a user's Steam ID
async function getSteamId(input) {
  // Check if the input is a number
  if (isNaN(input)) {
    // The input is a username (Vanity URL)
    const response = await axios.get(`http://localhost:5000/api/steam/${input}`);
    return response.data.response.steamid;
  } else {
    // The input is a Steam ID
    return input;
  }
}

// Get the games a user owns
async function getOwnedGames(steamId) {
  const response = await axios.get(`http://localhost:5000/api/steam/games/${steamId}`);
  return response.data.response.games;
}

// Find games two users both own
export async function findCommonGames(usernames) {
  const usernamesArray = usernames.split(',');
  const steamIds = await Promise.all(usernamesArray.map(username => getSteamId(username)));
  const response = await axios.post('http://localhost:5000/api/steam/games/common', { steamIds });
  return response.data.response.games;
}
