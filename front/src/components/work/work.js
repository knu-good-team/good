import React, { useEffect, useState } from 'react';
import './index.css';
import Search from '../search/Search';
import JobList from './jobsList';


const Work = () => {
    const [data, setData] = useState(null);
    const [dataCount, setDataCount] = useState(0);
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
        <div className="container">
            <div className="text-container" style={{  }}>
                <div className="work-text">장애인 구인 정보</div>
                {dataCount > 0 ? <div className="work-count">{dataCount}개의 데이터가 검색되었습니다.</div> : null}
                {/* <Search onSearch={fetchData} /> */}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <JobList jobs={data} />
            )}
        </div>
    );
};

export default Work;