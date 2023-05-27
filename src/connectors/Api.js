import axios from 'axios';

// Get a user's Steam ID
async function getSteamId(input) {
  // Check if the input is a number (Steam ID)
  if (!isNaN(input)) {
    return input;
  }

  // The input is a username (Vanity URL)
  const response = await axios.get(`http://localhost:5000/api/steam/${input}`);
  return response.data.response.steamid;
}

// Get the games a user owns
async function getOwnedGames(steamId) {
  const response = await axios.get(`http://localhost:5000/api/steam/games/${steamId}`);
  return response.data.response.games;
}

// Find games two users both own
export async function findCommonGames(usernames) {
  const usernamesArray = Array.isArray(usernames) ? usernames : usernames.split(',');
  const steamIds = await Promise.all(usernamesArray.map(username => getSteamId(username)));
  const ownedGames = await Promise.all(steamIds.map(steamId => getOwnedGames(steamId)));

  // Calculate intersection
  const commonGames = ownedGames.reduce((common, games) => {
    return common.filter(game => games.some(game2 => game2.appid === game.appid));
  }, ownedGames[0]);

  return commonGames;
}