import React from 'react';
import './css/ModalDescrip.css';

const ModalDescrip = ({ cardTitle, cardDescription, onClose }) => {
  return (
    <div className="modal1">
      <div className="modal-content1">
        <h2>{cardTitle}</h2>
        <p>{cardDescription}</p>
        <button onClick={onClose}>Cerrar</button>
      </div>
    </div>
  );
};

export default ModalDescrip;