import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './index.css';

const JobList = ({ jobs }) => {
    return (
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
                    <tr key={job.연번}>
                        <td>{job.사업장명}</td>
                        <td>{job.모집직종}</td>
                        <td>{job.고용형태}</td>
                        <td>{job.임금}</td>
                        <td>{job.임금형태}</td>
                        <td>{job['사업장 주소']}</td>
                        <td>{job.연락처}</td>
                    </tr>
                ))}
            </tbody>
        </table>
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
            '사업장 주소': PropTypes.string.isRequired,
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

const Work = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/disability_jobs`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data|| data.length === 0) {
                    throw new Error('No data available');
                }
                setData(data);
            })
            .catch(error => {
                setError(error.message);
            });
    }, []);

    return (
        <div className="container">
            <h1>Work</h1>
            {data ? <JobList jobs={data} /> : <p>Loading...</p>}
        </div>
    );
};

export default Work;