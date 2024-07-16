import React, { useEffect, useState} from 'react';
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import technologistImg from '../../assets/technologist.png';
import CardImage from './cardImage';
import PeriodInfo from './components/PeriodInfo';
import TabNavigation from './components/TabNavigation';
import './mobilePopUp.css';
import InfoColumn from './components/InfoColumn';
import InfoNavigation from './components/InfoNavigation';

const { kakao } = window;

const MobilePopUp = ({ selectedJob, closeModal }) => {
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [activeTab, setActiveTab] = useState('facilities');
  const [infoTab, setInfoTab] = useState('companyInfo');
  const [category, setCategory] = useState("PM9");  // PM9: 약국
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
        const imageSrc = 'https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_red.png';
        const imageSize = new kakao.maps.Size(64, 69);
        const markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize);
        const markerPosition = new kakao.maps.LatLng(coordinate[1], coordinate[0]);
        const marker = new kakao.maps.Marker({
          position: markerPosition,
          image: markerImage,
        });
        marker.setMap(map);

        const places = new kakao.maps.services.Places();
        const callback = function (result, status, pagination) {
          for (let i = 0; i < result.length; i++) {
            const markerPosition = new kakao.maps.LatLng(result[i].y, result[i].x);
            const marker = new kakao.maps.Marker({ position: markerPosition });
            marker.setMap(map);
          }
        };
        places.categorySearch(category, callback, {
          location: new kakao.maps.LatLng(coordinate[1], coordinate[0]),
        });
      }
    }
  }, [activeTab, coordinate, category]);

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

  const renderCompanyInfo = () => {
    switch (infoTab) {
      case 'companyInfo':
        return (
          <div className="m-info" style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
            <div className="m-modal-grid">
              <InfoColumn title="" info={[
                { label: '사업장명', value: selectedJob.busplaName },
                { label: '연락처', value: selectedJob.cntctNo },
                { label: '담당기관', value: selectedJob.regagnName.split(" ")[1] },
              ]} />
            </div>
            <div className="m-modal-grid">
              <InfoColumn title="" info={[]} />
            </div>
          </div>
        )
      case 'employeeInfo':
        return (
          <div className="m-info" style={{ display: "flex", flexDirection: "row", justifyContent: 'center' }}>
            <div className="m-modal-grid">
              <InfoColumn title="지원정보/자격" info={[
                { label: '요구경력', value: selectedJob.reqCareer },
                { label: '요구학력', value: selectedJob.reqEduc },
                { label: '전공계열', value: selectedJob.enterType },
                { label: '고용형태', value: selectedJob.empType },
                { label: '임금/임금형태', value: selectedJob.salaryType },
                { label: '사업장주소', value: selectedJob.compAddr },
              ]} />
            </div>
          </div>
        )
      default:
        return null;
    }
  }

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
        <InfoNavigation infoTab={infoTab} setInfoTab={setInfoTab} />
        <div className="m-tab-content">{renderCompanyInfo()}</div>
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
        <div className="m-tab-content">{renderContent()}</div>
      </div>
    </div>
  )
}

export default MobilePopUp;