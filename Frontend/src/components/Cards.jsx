import React, { useState, useEffect } from 'react';
import ModalDescrip from './ModalDescrip';
import './css/Card.css';

const Cards = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dotsCount, setDotsCount] = useState(3);

  useEffect(() => {
    fetch('http://localhost:5000/API/campers')
      .then(response => response.json())
      .then(data => {
        setCampers(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
        setLoading(false);
      });
  }, []);

  const openModal = (title, description) => {
    setSelectedCard({ title, description });
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCount(prevCount => (prevCount === 0 ? 3 : prevCount - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="card-container">
      {loading && <p>Loading{'.'.repeat(dotsCount)}</p>}
      {!loading && campers.length === 0 && (
        <p>No results found{'.'.repeat(dotsCount)}</p>
      )}
      {!loading &&
        campers.map((camper, index) => (
          <div key={index} className="card">
            <h2>{camper.name}</h2>
            <p>{camper.description}</p>
            <button onClick={() => openModal(camper.name, camper.description)}>
              Detalles
            </button>
            {isModalOpen && (
              <ModalDescrip
                cardTitle={selectedCard.title}
                cardDescription={selectedCard.description}
                onClose={closeModal}
              />
            )}
          </div>
        ))}
    </div>
  );
};

export default Cards;
