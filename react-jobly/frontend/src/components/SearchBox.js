import React from 'react';

const SearchBox = ({ setSearchTerm }) => {
  console.log("SearchBox component rendered"); 
  const handleChange = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <input
      type="text"
      placeholder="Search companies..."
      onChange={handleChange}
    />
  );
};

export default SearchBox;
