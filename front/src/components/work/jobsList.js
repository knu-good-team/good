import React, { useState } from 'react';
import './joblist.css';
import { PropTypes } from 'prop-types';
import PopUp from './popUp';

const JobList = ({ jobs = [] }) => {
    const [selectedJob, setSelectedJob] = useState(null);

    const handleRowClick = (job) => {
        setSelectedJob(job);
    };

    const closeModal = () => {
        setSelectedJob(null);
    };

    if (!jobs || jobs.length === 0) {
        return <p>No jobs available.</p>;
    }

    return (
        <div className="table-container">
            <table className="job-table">
                <thead>
                    <tr>
                        <th></th>
                        <th>사업장명</th>
                        <th>모집직종</th>
                        <th>고용형태</th>
                        <th>임금</th>
                        <th>임금형태</th>
                        <th>주소</th>
                        <th>남은 기간</th>
                    </tr>
                </thead>
                <tbody>
                    {jobs.map((job, index) => (
                        <tr key={job.연번} onClick={() => handleRowClick(job)} className="job-row">
                            <td style={{ color: '#0066ff' }}>{index + 1}</td>
                            <td>{job.busplaName}</td>
                            <td>{job.jobNm}</td>
                            <td>{job.empType}</td>
                            <td>{job.salary}</td>
                            <td>{job.salaryType}</td>
                            <td>{job.compAddr}</td>
                            <td>D-{job.termDate.d_day}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {selectedJob && <PopUp selectedJob={selectedJob} closeModal={closeModal} />}
        </div>
    );
};

JobList.propTypes = {
    jobs: PropTypes.arrayOf(
        PropTypes.shape({
            empType: PropTypes.string.isRequired,
            구인신청일자: PropTypes.string.isRequired,
            기업형태: PropTypes.string.isRequired,
            regagnName: PropTypes.string.isRequired,
            regDt: PropTypes.string.isRequired,
            termDate: PropTypes.array.isRequired,
            jobNm: PropTypes.string.isRequired,
            compAddr: PropTypes.string.isRequired,
            busplaName: PropTypes.string.isRequired,
            cntctNo: PropTypes.string.isRequired,
            연번: PropTypes.number.isRequired,
            reqCareer: PropTypes.string.isRequired,
            요구자격증: PropTypes.string,
            reqEduc: PropTypes.string.isRequired,
            salary: PropTypes.number.isRequired,
            salaryType: PropTypes.string.isRequired,
            enterType: PropTypes.string.isRequired,
            전공계열: PropTypes.string
        })
    ).isRequired
};

export default JobList;