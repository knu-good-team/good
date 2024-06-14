import React, { useState } from 'react'
import './index.css'

const Search = () => {
    const [query, setQuery] = useState('');

    const handleSearch = () => {
        console.log('searching...')
        // onSearch(query);
    };

    return (
        <div>
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search..."
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

export default Search;