import React, { useState } from 'react';
import './joblist.css';
import { PropTypes } from 'prop-types';

const JobList = ({ jobs = [] }) => {
    const [selectedJob, setSelectedJob] = useState(null)

    const handleRowClick = (job) => {
        setSelectedJob(job)
    }

    const closeModal = () => {
        setSelectedJob(null)
    }

    if (!jobs || jobs.length === 0) {
        return <p>No jobs available.</p>;
    }

    return (
        <div className="table-container">
            <table className="job-table">
                <thead>
                    <tr>
                        <th>사업장명</th>
                        <th>모집직종</th>
                        <th>고용형태</th>
                        <th>임금</th>
                        <th>임금형태</th>
                        <th>주소</th>
                        <th>연락처</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map(job => (
                        <tr key={job.연번} onClick={() => handleRowClick(job)} className="job-row">
                            <td>{job.사업장명}</td>
                            <td>{job.모집직종}</td>
                            <td>{job.고용형태}</td>
                            <td>{job.임금}</td>
                            <td>{job.임금형태}</td>
                            <td>{job.사업장주소}</td>
                            <td>{job.연락처}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedJob && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={closeModal}>&times;</span>
                        <h2 style={{marginLeft: "20px"}}>{selectedJob.사업장명}</h2>
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
                    </div>
                </div>
            )
            }
        </div >
    );
};


JobList.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            고용형태: PropTypes.string.isRequired,
            구인신청일자: PropTypes.string.isRequired,
            기업형태: PropTypes.string.isRequired,
            담당기관: PropTypes.string.isRequired,
            등록일: PropTypes.string.isRequired,
            모집기간: PropTypes.string.isRequired,
            모집직종: PropTypes.string.isRequired,
            사업장주소: PropTypes.string.isRequired,
            사업장명: PropTypes.string.isRequired,
            연락처: PropTypes.string.isRequired,
            연번: PropTypes.number.isRequired,
            요구경력: PropTypes.string.isRequired,
            요구자격증: PropTypes.string,
            요구학력: PropTypes.string.isRequired,
            임금: PropTypes.number.isRequired,
            임금형태: PropTypes.string.isRequired,
            입사형태: PropTypes.string.isRequired,
            전공계열: PropTypes.string
        })
    ).isRequired
};

export default JobList