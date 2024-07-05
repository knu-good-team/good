import React, { useEffect, useState } from 'react';
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import technologistImg from '../../assets/technologist.svg';
import './popUp.css';

const { kakao } = window;

const PopUp = ({ selectedJob, closeModal }) => {
    console.log(selectedJob)
    const [coordinate, setCoordinate] = useState([0, 0]);
    const [activeTab, setActiveTab] = useState('facilities');
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
            });
    }, [selectedJob.compAddr]);

    useEffect(() => {
        if (activeTab === 'facilities' && coordinate[0] !== 0 && coordinate[1] !== 0) {
            const container = document.getElementById('map');
            if (container) {
                const options = {
                    center: new kakao.maps.LatLng(coordinate[1], coordinate[0]),
                    level: 3,
                };
                const map = new kakao.maps.Map(container, options);
                let markerPosition = new kakao.maps.LatLng(coordinate[1], coordinate[0]);
                let marker = new kakao.maps.Marker({
                    position: markerPosition,
                });
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
        if (event.target.className === 'modal') {
            closeModal();
        }
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
                        <div className="modal-column">
                            <h3>기업정보</h3>
                            <div className="modal-row">
                                <span>사업장명</span>
                                <span>{selectedJob.busplaName}</span>
                            </div>
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
                <div className="info">
                    <div className="env-title">작업환경</div>
                    <div className="env-info">
                        <div>{selectedJob.envBothHands}</div>
                        <div>{selectedJob.envEyesight}</div>
                        <div>{selectedJob.envHandWork}</div>
                        <div>{selectedJob.envLiftPower}</div>
                        <div>{selectedJob.envLstnTalk}</div>
                        <div>{selectedJob.envStndWalk}</div>
                    </div>
                </div>
                <div className="period-container">
                    <div className="period">
                        <div className="subtitle" >모집기간</div>
                        <div className="title" style={{ fontSize: '25px' }}>{selectedJob.termDate.start_date}<br />~{selectedJob.termDate.end_date}</div>
                    </div>
                    <div className="divider" />
                    <div className="period">
                        <div className="subtitle">남은기간</div>
                        <div className="title">D-{selectedJob.termDate.d_day}</div>
                    </div>
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
    );
};

export default PopUp;