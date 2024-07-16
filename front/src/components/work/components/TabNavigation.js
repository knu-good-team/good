import React from 'react';
import './TabNavigation.css';

const TabNavigation = ({ activeTab, setActiveTab }) => (
  <div className="tab-container">
    <button className={`tab-button ${activeTab === 'facilities' ? 'active' : ''}`} onClick={() => setActiveTab('facilities')}>
      주변 편의시설
    </button>
    <div className="divider" />
    <button className={`tab-button ${activeTab === 'safety' ? 'active' : ''}`} onClick={() => setActiveTab('safety')}>
      안전등급
    </button>
    <div className="divider" />
    <button className={`tab-button ${activeTab === 'preferred' ? 'active' : ''}`} onClick={() => setActiveTab('preferred')}>
      선호 직군
    </button>
  </div>
);

export default TabNavigation;