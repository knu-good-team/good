import React, { useState, useEffect } from 'react';
import './index.css';
import Work from '../work/work';
import Banner from '../banner/banner';
import Search from '../search/Search';

const MainVisual = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchText, setSearchText] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/disability/job_list`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(result => {
                if (!result || result.data.length === 0) {
                    throw new Error('No data available');
                }
                setData(result.data);
                setDataCount(result.total);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const filteredData = data.filter(job =>
        job.compAddr && job.compAddr.toLowerCase().includes(searchQuery.toLowerCase())
    );
    const currentData = filteredData.slice(indexOfFirstItem, indexOfFirstItem + itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSearch = () => {
        setSearchQuery(searchText);
        setCurrentPage(1);
    };

    return (
        <div className="main-container">
            <Banner />
            <div className="search-container">
                <span className="search-text">취업 좋은 곳은 <span className="search-strength">좋은데<span className="check-mark"></span></span>에서!</span>
                <Search
                    setSearchText={setSearchText}
                    handleSearch={handleSearch}
                    searchText={searchText}
                />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Work data={currentData} dataCount={filteredData.length} paginate={paginate} itemsPerPage={itemsPerPage} currentPage={currentPage} />
                </div>
            )}
        </div>
    );
}

export default MainVisual;