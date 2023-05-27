import React from 'react';

function Results({ games }) {
  if (!games || games.length === 0) {
    return <div>No common games found.</div>;
  }

  return (
    <div>
      <h2>Common Games</h2>

    </div>
  );
}

export default Results;
