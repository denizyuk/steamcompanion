import React from 'react';


function ResultsComponent({ games }) {
  if (!games || games.length === 0) {
    return <div>No common games found.</div>;
  }

  // Sort the games array alphabetically by game name
  const sortedGames = games.sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div>
      {/* <h2>Common Games</h2> */}
      <div className='gameBox'>
        {sortedGames.map(game => (
          console.log(game),
          // <div className='gameInfo' key={game.appid}> {game.name}
          <div className='gameInfo' key={game.appid}>
            <a target='_blank' href={`https://store.steampowered.com/app/${game.appid}`}>
              <img src={`https://steamcdn-a.akamaihd.net/steam/apps/${game.appid}/header.jpg`} />
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ResultsComponent;
