import React, { useState, useEffect } from 'react';
import ModalDescrip from './ModalDescrip';
import './css/Card.css';

const Cards = () => {
  const [selectedCard, setSelectedCard] = useState({});
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dotsCount, setDotsCount] = useState(3);

  const toggleModal = (id, title, description) => {
    setSelectedCard({ id, title, description });
  };

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
        campers.map(camper => (
          <div key={camper._id} className="card">
            <div className='contenido'>
              <div className='encabezado'>
                <p className='senior'>{camper.seniority}</p>
                <p className='name'>{`${camper.name} ${camper.lastName}`}</p>
                <p className='ingles'>{camper.englishLevel}</p>
              </div>
              <img
                className='avatar'
                src={`data:image/png;base64,${camper.photo}`}
                alt=''
              />
              <p className='enfoque'>{camper.especiality}</p>
              <div className='carecter'>
                <ul className='lineal'>
                  {camper.tecnologies.slice(0, 4).map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                  {camper.tecnologies.length > 4 && <li>...</li>}
                </ul>
                <div className='genera'>
                  <p>{camper.programmerType}</p>
                  <p>{camper.locality}</p>
                </div>
              </div>
            </div>
            <button
  className="detalles"
  onClick={() => toggleModal(camper._id, camper.name, camper.lastName)}
>
  Detalles
</button>

          </div>
        ))}
      
      {selectedCard.id && (
        <ModalDescrip
          camperId={selectedCard.id}
          onClose={() => setSelectedCard({})}
        />
      )}
    </div>
  );
};

export default Cards;