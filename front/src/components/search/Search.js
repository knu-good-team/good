import React from 'react';
import './index.css';
import magnifierIcon from '../../assets/magnifier.svg';

const Search = ({ setSearchText, handleSearch, searchText }) => {

    const handleSearchChange = (e) => {
        setSearchText(e.target.value);
    };

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder="사업장 주소로 검색"
                value={searchText}
                onChange={handleSearchChange}
                className="search-input"
            />
            <button onClick={handleSearch} className="search-button">
                <img src={magnifierIcon} alt="Search" className="magnifier-icon" />
            </button>
        </div>
    );
};

export default Search;