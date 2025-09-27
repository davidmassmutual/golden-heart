import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Card.css';

function Card({ title, description, image, link }) {
  return (
    <div className="card">
      <img src={image} alt={title} className="card-image" />
      <div className="card-content">
        <h3>{title}</h3>
        <p>{description}</p>
        {link && (
          <Link to={link} className="card-link">
            Read More
          </Link>
        )}
      </div>
    </div>
  );
}

export default Card;