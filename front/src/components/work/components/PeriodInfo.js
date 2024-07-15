import React from 'react';
import './PeriodInfo.css';

const PeriodInfo = ({ termDate }) => (
  <div className="period-container">
    <div className="period">
      <div className="subtitle">모집기간</div>
      <div className="title">{termDate.start_date}<br />~{termDate.end_date}</div>
    </div>
    <div className="divider" />
    <div className="period">
      <div className="subtitle">남은기간</div>
      <div className="title">D-{termDate.d_day}</div>
    </div>
  </div>
);

export default PeriodInfo;