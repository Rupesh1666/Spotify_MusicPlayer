import React, { useState, useEffect } from 'react';

const SearchBar = ({ setSearchQuery }) => {
    const [searchInput, setSearchInput] = useState('');
    const [isSearching, setIsSearching] = useState(false);

    // Debounce function to limit the number of searches
    const debounce = (func, delay) => {
        let timeout;
        return (...args) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => {
                func(...args);
            }, delay);
        };
    };

    // Update search query
    const updateSearchQuery = debounce((query) => {
        setSearchQuery(query);
        setIsSearching(false); // Reset searching state
    }, 300); // Delay in milliseconds

    // Handle input change
    const handleChange = (e) => {
        const value = e.target.value;
        setSearchInput(value);
        setIsSearching(true); // Set searching state
        updateSearchQuery(value);
    };

    const handleSearch = (e) => {
        e.preventDefault();
        if (searchInput) {
            setSearchQuery(searchInput);
            setSearchInput(''); // Clear input after search
        }
    };

    return (
        <form onSubmit={handleSearch}>
            <input
                type="text"
                placeholder="Search for a song..."
                value={searchInput}
                onChange={handleChange}
                aria-label="Search for a song"
            />
            <button type="submit" aria-label="Search">
                {isSearching ? 'Searching...' : 'Search'}
            </button>
        </form>
    );
};

export default SearchBar;
