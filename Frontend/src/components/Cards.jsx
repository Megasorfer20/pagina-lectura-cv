import React, { useState, useEffect } from 'react';
import ModalDescrip from './ModalDescrip';
import monitorImage from '../monitor.png';
import globalImage from '../global.png';
import Carga from './Carga';
import './css/Card.css';

const Cards = ({ filtro }) => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [dotsCount, setDotsCount] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5000/API/campers');
        const data = await response.json();
        setCampers(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching campers:', error);
        setLoading(false);
      }
    };

    fetchData();
  }, []); // Solo se ejecuta una vez al montar el componente

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCount(prevCount => (prevCount === 0 ? 3 : prevCount - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleModal = (id, title, description) => {
    setSelectedCard({ id, title, description });
  };

  const filteredCampers = campers.filter(camper => {
    return (
      (!filtro.especialidad || camper.especiality === filtro.especialidad) &&
      (!filtro.pais || camper.locality === filtro.pais) &&
      (!filtro.programmerType || camper.programmerType === filtro.programmerType) &&
      (!filtro.nivelIngles || camper.englishLevel === filtro.nivelIngles) &&
      (!filtro.seniority || camper.seniority === filtro.seniority)
    );
  });

  return (
    <div className="card-container">
      {loading && <div className='cargaerror'><Carga></Carga></div>}
      {!loading && campers.length === 0 && (
        <p>No results found{'.'.repeat(dotsCount)}</p>
      )}
      {!loading && filteredCampers.length > 0 && filteredCampers.map(camper => (
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
  <p className='first-background'>
    <img className='imagenRut' src={monitorImage} alt='Monitor' />
    {camper.programmerType}
  </p>
  <p className='second-background'>
    <img className='imagenRut' src={globalImage} alt='Global' />
    {camper.locality}
  </p>
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
