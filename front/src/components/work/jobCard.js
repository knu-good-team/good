import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './jobCard.css';
import MobilePopUp from './mobilePopUp';

const JobCard = ({ job }) => {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  }

  const closeModal = () => {
    setShowModal(false);
  }

  return (
    <div className="job-card">
      <div className="job-header">
        <span className="d-day">D-{job.termDate.d_day}</span>
      </div>
      <div className="job-body">
        <h3 className="company-name">{job.busplaName}</h3>
        <p className="job-title">{job.jobNm}</p>
        <div className="job-tags">
          <span># {job.empType}</span>
          <span># {job.salaryType === '시급' ? '최저시급' : job.salaryType}</span>
          <span># 경력/학력 {job.reqCareer === '무관' && job.reqEdu === '무관' ? '무관' : `${job.reqCareer}/${job.reqEdu}`}</span>
        </div>
      </div>
      <button className="job-button" onClick={handleButtonClick}>
        채용정보 보러가기
      </button>
      {showModal && <MobilePopUp selectedJob={job} closeModal={closeModal} />}
    </div>
  )
};

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;