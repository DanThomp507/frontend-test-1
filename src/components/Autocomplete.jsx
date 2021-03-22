import React, { useEffect, useState } from "react";
import { useDebounce } from 'use-debounce';
import { fetchSuggestions } from "../utils/api";
import "../styles/Autocomplete.css";

const Autocomplete = ({ getProductId }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [debouncedSearchTerm] = useDebounce(searchTerm, 500);

  useEffect(() => {
    const getSearchSuggestions = async () => {
      if (debouncedSearchTerm) {
        try {
          let updatedSuggestions = await fetchSuggestions(debouncedSearchTerm);
          setSuggestions(updatedSuggestions.slice(0, 10));
        } catch (e) {
          console.error(e);
        }
      }
    };
    getSearchSuggestions();
  }, [searchTerm, debouncedSearchTerm]);

  const selectProduct = id => {
    getProductId(id);
    setSearchTerm('');
    setSuggestions(suggestions);
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
      {suggestions && debouncedSearchTerm && (
        <ul className="suggestions-list">
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
