import React from 'react';
import PropTypes from 'prop-types';
import './jobCard.css';

const JobCard = ({ job }) => (
  <div className="job-card">
    <h3>{job.busplaName}</h3>
    <p>모집직종: {job.jobNm}</p>
    <p>고용형태: {job.empType}</p>
    <p>임금: {job.salary} ({job.salaryType})</p>
    <p>주소: {job.compAddr}</p>
    <p>남은 기간: D-{job.termDate.d_day}</p>
  </div>
);

JobCard.propTypes = {
  job: PropTypes.object.isRequired,
};

export default JobCard;