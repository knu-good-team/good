import React, { useEffect, useState } from 'react';
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import technologistImg from '../../assets/technologist.png';
import CardImage from './cardImage';
import TabNavigation from './components/TabNavigation';
import PeriodInfo from './components/PeriodInfo';
import InfoColumn from './components/InfoColumn';
import './popUp.css';

const { kakao } = window;

const PopUp = ({ selectedJob, closeModal }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [coordinate, setCoordinate] = useState([0, 0]);
  const [activeTab, setActiveTab] = useState('facilities');
  const [category, setCategory] = useState("PM9");  // PM9: 약국
  const [error, setError] = useState(null);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     setLoading(true);
  //     try {
  //       const response = await fetch(`${process.env.REACT_APP_DEV_URL}/disability/convenient_facilities?falNm=${selectedJob.busplaName}`);
  //       if (!response.ok) throw new Error('Network response was not ok');
  //       const result = await response.json();
  //       if (!result || result.data.length === 0) throw new Error('No data available');
  //       if (typeof result.data === 'string') {
  //         setData(result.data);
  //       } else {
  //         setData(result.data[0].facInfoList.servList.evalInfo.split(','))
  //       }
  //     } catch (error) {
  //       setError(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   fetchData();
  // }, []);

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
          <div className="kakao-container">
            <div className="category">
              <span onClick={() => renderMarker("PM9")} className="category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />약국</span>
              <span onClick={() => renderMarker("HP8")} className="category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />병원</span>
              <span onClick={() => renderMarker("CS2")} className="category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />편의점</span>
              <span onClick={() => renderMarker("FD6")} className="category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />음식점</span>
              <span onClick={() => renderMarker("CE7")} className="category-text"><div style={{ backgroundColor: "black", width: "20px", height: "20px" }} />카페</span>
            </div>
            <div id="map" className="kakao-map"></div>
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
          {/* <div className="facility">{data.map((val, idx) => {
            return (
              <div key={idx}>{val}</div>
            )
          })}</div> */}
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

export default PopUp;