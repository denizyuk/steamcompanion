require('dotenv').config();
const express = require('express');
const cors = require('cors');
const axios = require('axios');
const app = express();

app.use(cors());
app.use(express.json());

const API_KEY = process.env.REACT_APP_STEAM_API_KEY;

async function getOwnedGames(steamId) {
    const steamResponse = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&include_appinfo=1&format=json`);
    return steamResponse.data.response.games.map(game => game.appid);
}

function findCommonGames(gamesLists) {
    return gamesLists.reduce((a, b) => a.filter(c => b.includes(c)));
}

async function getGameDetails(appid) {
    try {
        const response = await axios.get(`https://store.steampowered.com/api/appdetails?appids=${appid}`);
        const gameData = response.data[appid];
    
        if (gameData.success) {
            const gameDetails = gameData.data;
            return {
                appid: appid,
                name: gameDetails.name,
                image: gameDetails.header_image,
                description: gameDetails.short_description,
                categories: gameDetails.categories,
            };
        } else {
            return null;
        }
    } catch (error) {
        console.error(error);
        return null;
    }
}

app.get('/api/steam/:username', async (req, res) => {
  const username = req.params.username;
  const API_KEY = process.env.REACT_APP_STEAM_API_KEY;

  try {
    const steamResponse = await axios.get(`http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${API_KEY}&vanityurl=${username}`);
    res.json(steamResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
  }
});

app.get('/api/steam/games/:steamId', async (req, res) => {
  const steamId = req.params.steamId;
  const API_KEY = process.env.REACT_APP_STEAM_API_KEY;

  try {
    const steamResponse = await axios.get(`http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${API_KEY}&steamid=${steamId}&include_appinfo=1&format=json`);
    res.json(steamResponse.data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
  }
});

app.post('/api/steam/games/common', async (req, res) => {
    const steamIds = req.body.steamIds;

    try {
        const allGames = await Promise.all(steamIds.map(id => getOwnedGames(id)));
        const commonGames = findCommonGames(allGames);

        const gamesWithDetails = await Promise.all(
            commonGames.map(async (appid) => {
                const gameDetails = await getGameDetails(appid);
                return gameDetails ? { ...gameDetails, appid: appid } : null;
            })
        );
        res.json({ response: { games: gamesWithDetails } });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred while fetching data from the Steam API' });
    }
});

app.listen(5000, () => {
    console.log('Server listening on port 5000');
});
