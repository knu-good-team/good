import React, { useState, useEffect } from 'react';
import './index.css';
import Work from '../work/work';
import Banner from '../banner/banner';
import Search from '../search/Search';

const MainVisual = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

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

    const fetchData = async (query) => {
        setLoading(true);
        setError(null);
        try {
            const response = await fetch(`${process.env.REACT_APP_DEV_URL}/disability/search?search=${query}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const result = await response.json();
            setData(result.data);
            setDataCount(result.total);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="main-container">
            <Banner />
            <div className="search-container">
                <span className="search-text">취업 좋은 곳은 <span className="search-strength">좋은데<span className="check-mark"></span></span>에서!</span>
                <Search onSearch={fetchData} />
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <Work data={data} dataCount={dataCount} />
                </div>
            )}
        </div>
    )
}

export default MainVisual;