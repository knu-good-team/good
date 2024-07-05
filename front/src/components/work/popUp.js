import React, { useEffect, useState } from 'react'
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import './popUp.css';

const { kakao } = window;

const PopUp = ({ selectedJob, closeModal }) => {
    const [coordinate, setCoordinate] = useState([0, 0]); // [경도 log, 위도 lat]
    const [activeTab, setActiveTab] = useState('facilities'); // ['facilities', 'safety', 'preferred'
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/gps?address=${selectedJob.compAddr}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('response is not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    throw new Error('No data available');
                }
                setCoordinate([data.longitude, data.latitude]);
            })
            .catch(error => {
                setError(error.message);
            })
    }, [selectedJob.compAddr])

    useEffect(() => {
        if (activeTab === 'facilities' && coordinate[0] !== 0 && coordinate[1] !== 0) {
            const container = document.getElementById('map');
            const options = {
                center: new kakao.maps.LatLng(coordinate[1], coordinate[0]),
                level: 3
            };
            const map = new kakao.maps.Map(container, options);
            //마커가 표시 될 위치
            let markerPosition = new kakao.maps.LatLng(
                coordinate[1],
                coordinate[0]
            );

            // 마커를 생성
            let marker = new kakao.maps.Marker({
                position: markerPosition,
            });

            // 마커를 지도 위에 표시
            marker.setMap(map);
        }
    }, [activeTab, coordinate])

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
        if (event.target.className === 'modal') {
            closeModal();
        }
    };

    return (
        <div div className="modal" onClick={handleBackgroundClick}>
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <div className="company-info">
                    <div className="company">
                        <div className="subtitle" style={{ color: "#0066FF" }}>{selectedJob.jobNm}</div>
                        <div className="title" style={{ color: "#0066FF" }}>{selectedJob.busplaName}</div>
                    </div>
                    <div className="modal-grid">
                        <div className="modal-column">
                            <h3>기업정보</h3>
                            <div className="modal-row">
                                <span>사업장명</span>
                                <span>{selectedJob.busplaName}</span>
                            </div>
                            {/* <div className="modal-row">
                                <span>연락처</span>
                                <span>{selectedJob.연락처}</span>
                            </div> */}
                            {/* <div className="modal-row">
                                <span>기업형태</span>
                                <span>{selectedJob.기업형태}</span>
                            </div> */}
                            <div className="modal-row">
                                <span>담당기관</span>
                                <span>{selectedJob.regagnName}</span>
                            </div>
                        </div>
                        <div className="modal-column">
                            <h3>지원정보/자격</h3>
                            <div className="modal-row">
                                <span className="strength">요구경력</span>
                                <span>{selectedJob.reqCareer}</span>
                            </div>
                            <div className="modal-row">
                                <span className="strength">요구학력</span>
                                <span>{selectedJob.reqEduc}</span>
                            </div>
                            <div className="modal-row">
                                <span>전공계열</span>
                                <span>{selectedJob.전공계열}</span>
                            </div>
                        </div>
                        <div className="modal-column">
                            <h3>근무조건</h3>
                            <div className="modal-row">
                                <span className="strength">고용형태</span>
                                <span>{selectedJob.empType}</span>
                            </div>
                            <div className="modal-row">
                                <span>임금/급여형태</span>
                                <span>{selectedJob.salary}/{selectedJob.salaryType}</span>
                            </div>
                            <div className="modal-row">
                                <span>입사형태</span>
                                <span>{selectedJob.enterType}</span>
                            </div>
                            <div className="modal-row">
                                <span>사업장주소</span>
                                <span>{selectedJob.compAddr}</span>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="recruitment">
                    <div className="period subtitle">모집기간</div>
                    <p className="period title">{selectedJob.termDate.start_date}~{selectedJob.termDate.end_date}</p>
                </div>
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
                <div className="tab-content">
                    {renderContent()}
                </div>
            </div>
        </div>
    )
}

export default PopUp