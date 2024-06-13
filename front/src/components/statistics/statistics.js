import React, { useState, useEffect } from 'react'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './index.css'
import { width } from '@mui/system';

const truncate = (str, n) => {
    return (str.length > n) ? str.substr(0, n - 4) + '...' : str;
};


const Statistics = () => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch(`${process.env.REACT_APP_DEV_URL}/disability/workers`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                if (!data || data.length === 0) {
                    throw new Error('No data available');
                }
                const transformedData = Object.entries(data["20대"]).map(([job, count]) => ({
                    job,
                    count
                }));
                setData(transformedData);
            })
            .catch(error => {
                setError(error.message);
            });
    }, [])

    return (
        <div className="statistics">
            {data ?
                <div className="chart-container">
                    <div className="chart-content">

                        <ResponsiveContainer width="100%" height={300}>
                            <BarChart
                                data={data}
                                margin={{
                                    top: 20, right: 10, left: 10, bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis
                                    dataKey="job"
                                    angle={-45}
                                    textAnchor="end"
                                    interval={0}
                                    tick={{ fontSize: 10 }}
                                    tickFormatter={tick => truncate(tick, 10)}
                                />
                                <YAxis />
                                <Tooltip />
                                {/* <Legend /> */}
                                <Bar dataKey="count" fill="#468AE9" />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div> : <p>Loading...</p>}
        </div>
    )
}

export default Statistics;