import React, { useEffect, useState } from 'react';
import './index.css';
import Search from '../search/Search';
import JobList from './jobsList';
import Pagination from './pagination';


const Work = () => {
    const [data, setData] = useState([]);
    const [dataCount, setDataCount] = useState(0);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

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

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="container">
            <div className="text-container">
                <div className="work-text">장애인 구인 정보</div>
                {dataCount > 0 ? <div className="work-count">{dataCount}개의 데이터가 검색되었습니다.</div> : null}
                {/* <Search onSearch={fetchData} /> */}
            </div>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p>{error}</p>
            ) : (
                <div>
                    <JobList jobs={currentData} />
                    <Pagination
                        itemsPerPage={itemsPerPage}
                        totalItems={dataCount}
                        paginate={paginate}
                        currentPage={currentPage}
                    />
                </div>
            )}
        </div>
    );
};

export default Work;