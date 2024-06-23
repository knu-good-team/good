import React from 'react';
import './index.css';
import Work from '../work/work';
import Banner from '../banner/banner';
import Search from '../search/Search';

const MainVisual = () => {
    return (
        <div className="main-container">
            <Banner />
            <div className="search-container">
                <span className="search-text">취업 좋은 곳은 <span className="search-strength">좋은데<span className="check-mark"></span></span>에서!</span>
                <Search />
            </div>
            <Work />
        </div>
    )
}

export default MainVisual;