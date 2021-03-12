import React, { useEffect, useState } from "react";

import { fetchSuggestions } from "./utils/api";

import "./Autocomplete.css";

const Autocomplete = ({ getProductId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);

  useEffect(() => {
    if (searchTerm) {
      try {
        fetchSuggestions(searchTerm).then((_suggestions) => {
          const n = 10
          console.log(_suggestions)
          const newArray = _suggestions.slice(0, n)
          setSuggestions(newArray)
        }
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [searchTerm]);

  const selectProduct = id => {
    getProductId(id);
    setSearchTerm('');
  };


  return (
    <div className="search-container">
      <input
        type="text"
        value={searchTerm}
        className="search-box"
        placeholder="Search for a product"
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      {suggestions.length > 0 && (
        <ul className="suggestionsList">
          {suggestions.map((item) => (
            <li key={item.id} data-testid={item.id} onClick={(e) => selectProduct(item.id)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
