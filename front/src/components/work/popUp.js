import React, { useEffect } from 'react'
import Statistics from '../statistics/statistics';
import MapComponent from '../map/map';
import './popUp.css';

const { kakao } = window;

const PopUp = ({ selectedJob, closeModal }) => {
    useEffect(() => {
        const container = document.getElementById('map');
        const options = {
            center: new kakao.maps.LatLng(33.450701, 126.570667),
            level: 3
        }
        const map = new kakao.maps.Map(container, options);
    }, [])

    return (
        <div div className="modal" >
            <div className="modal-content">
                <span className="close" onClick={closeModal}>&times;</span>
                <h2 style={{ marginLeft: "20px" }}>{selectedJob.사업장명}</h2>
                <div className="modal-grid">
                    <div className="modal-column">
                        <h3>기업정보</h3>
                        <div className="modal-row">
                            <span>사업장명</span>
                            <span>{selectedJob.사업장명}</span>
                        </div>
                        <div className="modal-row">
                            <span>연락처</span>
                            <span>{selectedJob.연락처}</span>
                        </div>
                        <div className="modal-row">
                            <span>기업형태</span>
                            <span>{selectedJob.기업형태}</span>
                        </div>
                        <div className="modal-row">
                            <span>담당기관</span>
                            <span>{selectedJob.담당기관}</span>
                        </div>
                    </div>
                    <div className="modal-column">
                        <h3>지원정보/자격</h3>
                        <div className="modal-row">
                            <span>요구경력</span>
                            <span>{selectedJob.요구경력}</span>
                        </div>
                        <div className="modal-row">
                            <span>요구학력</span>
                            <span>{selectedJob.요구학력}</span>
                        </div>
                        <div className="modal-row">
                            <span>전공계열</span>
                            <span>{selectedJob.전공계열}</span>
                        </div>
                    </div>
                    <div className="modal-column">
                        <h3>근무조건</h3>
                        <div className="modal-row">
                            <span>고용형태</span>
                            <span>{selectedJob.고용형태}</span>
                        </div>
                        <div className="modal-row">
                            <span>임금/급여형태</span>
                            <span>{selectedJob.임금}/{selectedJob.임금형태}</span>
                        </div>
                        <div className="modal-row">
                            <span>입사형태</span>
                            <span>{selectedJob.입사형태}</span>
                        </div>
                        <div className="modal-row">
                            <span>사업장주소</span>
                            <span>{selectedJob.사업장주소}</span>
                        </div>
                    </div>
                </div>
                <div className="recruitment">
                    <p>모집기간 {selectedJob.모집기간}</p>
                </div>
                <div className="convenience-container">
                    <div id="map" style={{ marginTop: "20px", width: "1200px", height: "400px" }}></div>
                </div>
                <div className="info-container">
                    <MapComponent address={selectedJob.사업장주소} />
                    <Statistics />
                </div>
            </div>
        </div>
    )
}

export default PopUp