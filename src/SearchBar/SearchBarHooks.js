import { useState } from 'react';

export default function Searchbar({ onSubmit }) {
  const [searchValue, setSearchValue] = useState('');
  const getSearchValue = evt => {
    setSearchValue(evt.target.value.toLowerCase());
  };

  const handleSubmit = evt => {
    evt.preventDefault();
    onSubmit(searchValue);
    setSearchValue('');
  };
  return (
    <header className="Searchbar">
      <form className="SearchForm" onSubmit={handleSubmit}>
        <button type="submit" className="SearchForm-button">
          <span className="SearchForm-button-label">Search</span>
        </button>

        <input
          className="SearchForm-input"
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          value={searchValue}
          onChange={getSearchValue}
        />
      </form>
    </header>
  );
}
