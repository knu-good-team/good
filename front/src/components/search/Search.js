import React, { useState } from 'react'
import './index.css'

const Search = ({ onSearch }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    const handleSearch = () => {
       onSearch(query); 
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