import React, { useEffect, useState } from 'react';
import './index.css';
import Search from '../search/Search';
import JobList from './jobsList';


const Work = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/disability/jobs`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    throw new Error('No data available');
                }
                setData(data);
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
            setData(result);
        } catch (error) {
            setError(error.message);
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <div style={{ "display": "flex", "justify-content": "space-between", "align-items": "center" }}>
                <h1>장애인 구인 정보</h1>
                <Search onSearch={fetchData} />
            </div>
            {data ? <JobList jobs={data} /> : <p>Loading...</p>}
        </div>
    );
};

export default Work;