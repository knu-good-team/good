import React from 'react';
import './InfoNavigation.css';

const InfoNavigation = ({ infoTab, setInfoTab }) => {
  console.log(infoTab);
  return (
    <div className="tab-container">
      <button className={`tab-button ${infoTab === 'companyInfo' ? 'active' : ''}`} onClick={() => setInfoTab('companyInfo')}>
        기업정보
      </button>
      <div className="divider" />
      <button className={`tab-button ${infoTab === 'employeeInfo' ? 'active' : ''}`} onClick={() => setInfoTab('employeeInfo')}>
        채용정보
      </button>
      <div className="divider" />
    </div>
  )
}

export default InfoNavigation;