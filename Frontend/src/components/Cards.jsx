import React, { useState } from 'react';
import ModalDescrip from './ModalDescrip';
import './css/Card.css';

const Cards = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

  const openModal = (title, description) => {
    setSelectedCard({ title, description });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

    return (
      <div className="card-container">
        <div className="card">
          <h2>Tarjeta 1</h2>
          <p>Descripción de la tarjeta 1.</p>
          <button onClick={() => openModal('Tarjeta 1', 'Descripción de la tarjeta 1.')}>Detalles</button>
      {isModalOpen && (
        <ModalDescrip
          cardTitle={selectedCard.title}
          cardDescription={selectedCard.description}
          onClose={closeModal}
        />
      )}
        </div>
        <div className="card">
          <h2>Tarjeta 2</h2>
          <p>Descripción de la tarjeta 2.</p>
          <button onClick={() => openModal('Tarjeta 2', 'Descripción de la tarjeta 2.')}>Detalles</button>
      {isModalOpen && (
        <ModalDescrip
          cardTitle={selectedCard.title}
          cardDescription={selectedCard.description}
          onClose={closeModal}
        />
      )}
        </div>
        <div className="card">
          <h2>Tarjeta 3</h2>
          <p>Descripción de la tarjeta 3.</p>
          <button onClick={() => openModal('Tarjeta 3', 'Descripción de la tarjeta 3.')}>Detalles</button>
      {isModalOpen && (
        <ModalDescrip
          cardTitle={selectedCard.title}
          cardDescription={selectedCard.description}
          onClose={closeModal}
        />
      )}
        </div>
      </div>
    );
  };



export default Cards;
