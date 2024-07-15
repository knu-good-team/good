import React from 'react';
import './InfoColumn.css';

const InfoColumn = ({ title, info }) => (
  <div className="modal-column">
    <h3>{title}</h3>
    {info.map((item, index) => (
      <div className={`modal-row ${item.className || ''}`} key={index}>
        <span>{item.label}</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

export default InfoColumn;