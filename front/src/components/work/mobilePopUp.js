import React, { useState } from 'react';
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import technologistImg from '../../assets/technologist.svg';
import CardImage from './cardImage';
import PeriodInfo from './components/PeriodInfo';
import TabNavigation from './components/TabNavigation';
import './mobilePopUp.css';
import InfoColumn from './components/InfoColumn';

const MobilePopUp = ({ selectedJob, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [activeTab, setActiveTab] = useState('facilities');
  const [category, setCategory] = useState("PM9");  // PM9: 약국
  const [error, setError] = useState(null);

  const renderMarker = (category) => {
    setCategory(category);
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'facilities':
        return (
          <div className="m-kakao-container">
            <div className="m-category">
              <span onClick={() => renderMarker("PM9")} className="m-category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />약국</span>
              <span onClick={() => renderMarker("HP8")} className="m-category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />병원</span>
              <span onClick={() => renderMarker("CS2")} className="m-category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />편의점</span>
              <span onClick={() => renderMarker("FD6")} className="m-category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />음식점</span>
              <span onClick={() => renderMarker("CE7")} className="m-category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />카페</span>
            </div>
            <div id="map" className="m-kakao-map"></div>
          </div>
        );
      case 'safety':
        return <MapComponent address={selectedJob.compAddr} coordinate={coordinate} />;
      case 'preferred':
        return <Statistics />;
      default:
        return null;
    }
  };

  const handleBackgroundClick = (event) => {
    if (event.target.className === 'modal') closeModal();
  };

  return (
    <div className="m-modal" onClick={handleBackgroundClick}>
      <div className="m-modal-content">
        <div className="m-modal-header">
          <span className="m-close" onClick={closeModal}>&times;</span>
          <div className="m-title-container">
            <div className="m-title">{selectedJob.busplaName}</div>
            <div className="m-subtitle">{selectedJob.jobNm}</div>
          </div>
          <img src={technologistImg} alt="technologist" className="m-technologist" />
        </div>
        <div className="m-info">
          <div className="m-modal-grid">
            <InfoColumn title="" info={[
              { label: '사업장명', value: selectedJob.busplaName },
              { label: '연락처', value: selectedJob.cntctNo },
              { label: '담당기관', value: selectedJob.regagnName },
            ]} />
          </div>
          <div className="m-modal-grid">
            <InfoColumn title="" info={[
              { label: '사업장명', value: selectedJob.busplaName },
              { label: '담당기관', value: selectedJob.regagnName },
            ]} />
          </div>
        </div>
        <div className="m-info">
          <div className="m-env-title">작업환경</div>
          {/* <div className="m-facility">{data.map((val, idx) => {
            return (
              <div key={idx}>{val}</div>
            )
          })}</div> */}
          <div className="m-env-info">
            <CardImage selectedJob={selectedJob} />
          </div>
        </div>
        <PeriodInfo termDate={selectedJob.termDate} />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        {/* <div className="m-tab-content">{renderContent()}</div> */}
      </div>
    </div>
  )
}

export default MobilePopUp;