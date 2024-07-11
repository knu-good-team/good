import React, { useEffect, useState } from 'react';
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import technologistImg from '../../assets/technologist.svg';
import './popUp.css';
import CardImage from './cardImage';

const { kakao } = window;

const PopUp = ({ selectedJob, closeModal }) => {
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [activeTab, setActiveTab] = useState('facilities');
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCoordinates = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_DEV_URL}/gps?address=${selectedJob.compAddr}`);
        if (!response.ok) throw new Error('response is not ok');
        const data = await response.json();
        if (!data || data.length === 0) throw new Error('No data available');
        setCoordinate([data.longitude, data.latitude]);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchCoordinates();
  }, [selectedJob.compAddr]);

  useEffect(() => {
    if (activeTab === 'facilities' && coordinate[0] && coordinate[1]) {
      const container = document.getElementById('map');
      if (container) {
        const options = {
          center: new kakao.maps.LatLng(coordinate[1], coordinate[0]),
          level: 3,
        };
        const map = new kakao.maps.Map(container, options);
        const markerPosition = new kakao.maps.LatLng(coordinate[1], coordinate[0]);
        const marker = new kakao.maps.Marker({ position: markerPosition });
        marker.setMap(map);
      }
    }
  }, [activeTab, coordinate]);

  const renderContent = () => {
    switch (activeTab) {
      case 'facilities':
        return <div id="map" className="kakao-map"></div>;
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
    <div className="modal" onClick={handleBackgroundClick}>
      <div className="modal-content">
        <div className="modal-header">
          <span className="close" onClick={closeModal}>&times;</span>
          <div className="title-container">
            <div className="title">{selectedJob.busplaName}</div>
            <div className="subtitle">{selectedJob.jobNm}</div>
          </div>
          <img src={technologistImg} alt="technologist" className="technologist" />
        </div>
        <div className="info">
          <div className="recruitment-title">채용정보</div>
          <div className="modal-grid">
            <InfoColumn title="기업정보" info={[
              { label: '사업장명', value: selectedJob.busplaName },
              { label: '담당기관', value: selectedJob.regagnName },
            ]} />
            <InfoColumn title="지원정보/자격" info={[
              { label: '요구경력', value: selectedJob.reqCareer, className: 'strength' },
              { label: '요구학력', value: selectedJob.reqEduc, className: 'strength' },
              { label: '전공계열', value: selectedJob.전공계열 },
            ]} />
            <InfoColumn title="근무조건" info={[
              { label: '고용형태', value: selectedJob.empType, className: 'strength' },
              { label: '임금/급여형태', value: `${selectedJob.salary}/${selectedJob.salaryType}` },
              { label: '입사형태', value: selectedJob.enterType },
              { label: '사업장주소', value: selectedJob.compAddr },
            ]} />
          </div>
        </div>
        <div className="info">
          <div className="env-title">작업환경</div>
          <div className="env-info">
            <CardImage selectedJob={selectedJob} />
          </div>
        </div>
        <PeriodInfo termDate={selectedJob.termDate} />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <div className="tab-content">{renderContent()}</div>
      </div>
    </div>
  );
};

const InfoColumn = ({ title, info }) => (
  <div className="modal-column">
    <h3>{title}</h3>
    {info.map((item, index) => (
      <div className={`modal-row ${item.className || ''}`} key={index}>
        <span>{item.label}</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

const PeriodInfo = ({ termDate }) => (
  <div className="period-container">
    <div className="period">
      <div className="subtitle">모집기간</div>
      <div className="title" style={{ fontSize: '25px' }}>{termDate.start_date}<br />~{termDate.end_date}</div>
    </div>
    <div className="divider" />
    <div className="period">
      <div className="subtitle">남은기간</div>
      <div className="title">D-{termDate.d_day}</div>
    </div>
  </div>
);

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

export default PopUp;