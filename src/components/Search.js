import React, { useState } from 'react';

function Search({ onSubmit }) {
  const [name, setName] = useState('');
  const [namesList, setNamesList] = useState([]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleAddName = () => {
    if (name.trim() !== '') {
      setNamesList([...namesList, name]);
      setName('');
    }
  };

  const handleDeleteName = (index) => {
    const updatedList = [...namesList];
    updatedList.splice(index, 1);
    setNamesList(updatedList);
  };

  const handleSubmit = () => {
    onSubmit(namesList.join(','));
  };

  return (
    <div>
      <input type="text" value={name} onChange={handleNameChange} />
      <button onClick={handleAddName}>Add</button>
      <ul>
        {namesList.map((name, index) => (
          <li key={index}>
            {name}
            <button onClick={() => handleDeleteName(index)}>Delete</button>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit}>Search</button>
    </div>
  );
}

export default Search;
