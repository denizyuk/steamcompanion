import React from 'react';

function ResultsComponent({ games }) {
  if (!games || games.length === 0) {
    return <div>No common games found.</div>;
  }

  return (
    <div>
      <h2>Common Games</h2>
        <div className='gameBox'></div>{games.map(game => (
            console.log(game),
          <div className='gameInfo' key={game.appid}>{game.name}</div>
        ))}
    </div>
  );
}

export default ResultsComponent;
