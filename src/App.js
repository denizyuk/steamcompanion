import React, { useState } from 'react';
import Search from './components/Search';
import Results from './components/Results';
import { findCommonGames } from './connectors/Api';
import './App.css';

function App() {
  const [games, setGames] = useState(null);

  const handleSearch = async (nameList) => {
    const commonGames = await findCommonGames(nameList);
    setGames(commonGames);
  };

  return (
    <div className="App">
      <h1>Steam Common Games Finder</h1>
      <Search onSubmit={handleSearch} />
      <Results games={games} />
    </div>
  );
}

export default App;
