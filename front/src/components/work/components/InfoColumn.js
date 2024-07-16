import React from 'react';
import './InfoColumn.css';

const InfoColumn = ({ title, info }) => (
  <div className="modal-column">
    <div className="modal-title">{title}</div>
    {info.map((item, index) => (
      <div className={`modal-row ${item.className || ''}`} key={index}>
        <span>{item.label}</span>
        <span>{item.value}</span>
      </div>
    ))}
  </div>
);

export default InfoColumn;