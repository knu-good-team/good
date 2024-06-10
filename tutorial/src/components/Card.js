import React from 'react';
import './Card.css';

function Card({ image, label, heading, description }) {
  return (
    <div className="card">
      <div className="card-image">
        <img src={image} alt="placeholder" />
      </div>
      <div className="card-body">
        <span className="card-label">{label}</span>
        <h1 className="card-heading">{heading}</h1>
        <h2 className="card-heading">{heading}</h2>
        <h3 className="card-heading">{heading}</h3>
        <h4 className="card-heading">{heading}</h4>
        <h5 className="card-heading">{heading}</h5>
        <p className="card-description">{description}</p>
      </div>
      <div className="card-action">
        <button className="action-button">Action</button>
      </div>
    </div>
  );
}

export default Card;
