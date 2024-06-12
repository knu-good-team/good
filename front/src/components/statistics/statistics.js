import React, { useState, useEffect } from 'react'
import './index.css'

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
                console.log(data);
            })
            .catch(error => {
                setError(error.message);
            });
    })


    return (
        <div className="statistics">
            Statistics Block
        </div>
    )
}

export default Statistics;