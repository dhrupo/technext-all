import React, { useState } from 'react';

const Search = ({ onSearch }) => {
  const [search, setSearch] = useState('');
  const onInputchange = (value) => {
    setSearch(value);
    onSearch(value);
  }
  return (
    <input type="text" className="form-control w-25" placeholder="search..." value={search} onChange={(e) => onInputchange(e.target.value)}>
    </input>
  );
};

export default Search;