import React from 'react';
import JobList from './jobsList';
import Pagination from './pagination';
import './index.css';

const Work = ({ data, dataCount, paginate, itemsPerPage, currentPage }) => {
    return (
        <div className="container">
            <div className="text-container">
                <div className="work-text">장애인 구인 정보</div>
                {dataCount > 0 ? <div className="work-count">{dataCount}개의 데이터가 검색되었습니다.</div> : null}
            </div>
            <div>
                <JobList jobs={data} />
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