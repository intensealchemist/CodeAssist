import React, { useState } from 'react';
import './SmartSearch.css';

const SmartSearch = () => {
  const suggestionsList = [
    "Explain loops",
    "Fix Python errors",
    "Generate HTML boilerplate",
    "Convert JS to Python",
    "Auto-generate comments",
    "Generate README",
    "Summarize code",
    "Optimize performance"
  ];

  const [query, setQuery] = useState("");
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleChange = (e) => {
    const input = e.target.value;
    setQuery(input);
    if (input.length > 0) {
      const filtered = suggestionsList.filter(suggestion =>
        suggestion.toLowerCase().includes(input.toLowerCase())
      );
      setFilteredSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setFilteredSuggestions([]);
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    setQuery(suggestion);
    setShowSuggestions(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Search submitted:", query);
    setShowSuggestions(false);
  };

  return (
    <div className="smart-search-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Search commands (e.g., 'Explain loops')..."
          className="smart-search-input"
        />
        <button type="submit" className="smart-search-button">Search</button>
      </form>
      {showSuggestions && filteredSuggestions.length > 0 && (
        <ul className="suggestions-list">
          {filteredSuggestions.map((suggestion, index) => (
            <li key={index} onClick={() => handleSuggestionClick(suggestion)}>
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SmartSearch;
