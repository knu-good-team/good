import React from 'react';
import JobList from './jobsList';
import JobCard from './jobCard';
import Pagination from './pagination';
import './index.css';
import useWindowSize from '../../utility/useWindowSize';

const Work = ({ data, dataCount, paginate, itemsPerPage, currentPage }) => {
  const windowSize = useWindowSize();

  return (
    <div className="container">
      <div className="text-container">
        <div className="work-text">장애인 구인 정보</div>
        {dataCount > 0 ? <div className="work-count">{dataCount}개의 데이터가 검색되었습니다.</div> : null}
      </div>
      {windowSize.width < 768 ? (
        <div className="job-card-grid">
          {data.map((job, index) => (
            <JobCard key={index} job={job} />
          ))}
        </div>
      ) : (
        <div className="desktop-view">
          <JobList jobs={data} />
        </div>
      )}
      <Pagination
        itemsPerPage={itemsPerPage}
        totalItems={dataCount}
        paginate={paginate}
        currentPage={currentPage}
      />
    </div>
  );
};

export default Work;