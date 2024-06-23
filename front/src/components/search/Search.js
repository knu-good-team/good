import React, { useState } from 'react'
import './index.css'

import magnifierIcon from '../../assets/magnifier.svg'

const Search = ({ onSearch = null }) => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);


    const handleSearch = () => {
        onSearch(query);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="통합 검색"
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={magnifierIcon} alt="Search" className="magnifier-icon" />
            </button>
        </div>
    );
}

export default Search;