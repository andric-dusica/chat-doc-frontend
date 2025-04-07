import React, { useState } from 'react';

const PdfSearchInput = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
  };

  return (
    <form onSubmit={handleSearchSubmit}>
      <input type="text" value={searchTerm} onChange={handleSearchChange} placeholder="Search text..." />
      <button type="submit">Search</button>
    </form>
  );
};

export default PdfSearchInput;
