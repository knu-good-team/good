import React, { useEffect, useState } from 'react';
import JobList from './jobsList';
import Pagination from './pagination';
import './index.css';


const Work = ({ data = [], dataCount = 0 }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentData = data.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber) => setCurrentPage(pageNumber)

    return (
        <div className="container">
            <div className="text-container">
                <div className="work-text">장애인 구인 정보</div>
                {dataCount > 0 ? <div className="work-count">{dataCount}개의 데이터가 검색되었습니다.</div> : null}
                {/* <Search onSearch={fetchData} /> */}
            </div>
            <div>
                <JobList jobs={currentData} />
                <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={dataCount}
                    paginate={paginate}
                    currentPage={currentPage}
                />
            </div>
        </div>
    );
};

export default Work;