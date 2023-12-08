import React from 'react';
import './css/Card.css';

const Card = () => {
    return (
      <div className="card-container">
        <div className="card">
          <h2>Tarjeta 1</h2>
          <p>Descripción de la tarjeta 1.</p>
        </div>
        <div className="card">
          <h2>Tarjeta 2</h2>
          <p>Descripción de la tarjeta 2.</p>
        </div>
        <div className="card">
          <h2>Tarjeta 3</h2>
          <p>Descripción de la tarjeta 3.</p>
        </div>
        <div className="card">
          <h2>Tarjeta 4</h2>
          <p>Descripción de la tarjeta 4.</p>
        </div>
        <div className="card">
          <h2>Tarjeta 5</h2>
          <p>Descripción de la tarjeta 5.</p>
        </div>
      </div>
    );
  };



export default Card;
