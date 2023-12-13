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
            <h2>{`${camper.name} ${camper.lastName}`}</h2>
            <img src={camper.photo} alt={`${camper.name} ${camper.lastName}`} />
            <p>{`Specialty: ${camper.specialty}`}</p>
            <p>{`Technologies: ${camper.technologies.join(', ')}`}</p>
            <p>{`Seniority: ${camper.seniority}`}</p>
            <p>{`Programmer Type: ${camper.programmerType}`}</p>
            <p>{`Locality: ${camper.locality}`}</p>
            <p>{`English Level: ${camper.englishLevel}`}</p>
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

          <div className="card">
            <div className='contenido'>
              <div className='encabezado'>
            <p className='senior'>Jr.</p>
            <p>Sebastian Andres Zuluaga Salgado</p>
            <p className='ingles'>A3</p>
              </div>
            <img className='avatar' src='https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png' alt=''/>
            <p className='enfoque'>Web Development</p>
              <div className='carecter'>
            <p className='lineal'>"Javascript","NodeJs","PHP","React"</p>
            <div className='genera'>
            <p>Fullstack Developer</p>
            <p>Colombia</p>
            </div>
              </div>
            </div>
            <button className='detalles'>
              Detalles
            </button>
          </div>

              
    </div>
  );
  
};

export default Cards;
