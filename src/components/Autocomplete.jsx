import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { fetchSuggestions } from "../utils/api";
import "../styles/Autocomplete.css";

const Autocomplete = ({ getProductId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      try {
        fetchSuggestions(debouncedSearchTerm).then((_suggestions) => {
          const newArray = _suggestions.slice(0, 10);
          setSuggestions(newArray);
        }
        );
      } catch (e) {
        console.error(e);
      }
    }
  }, [searchTerm, debouncedSearchTerm]);

  const selectProduct = id => {
    getProductId(id);
    setSearchTerm('');
    setSuggestions([]);
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
      {suggestions.length > 0 && debouncedSearchTerm && (
        <ul className="suggestionsList">
          {suggestions.map((item) => (
            <li key={item.id} data-testid={item.id} onClick={() => selectProduct(item.id)}>
              {item.title}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default Autocomplete;
