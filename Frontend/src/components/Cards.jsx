import React, { useState, useEffect } from 'react';
import ModalDescrip from './ModalDescrip';
import Carga from './Carga';
import './css/Card.css';

const Cards = ({ filtro }) => {
  const [selectedCard, setSelectedCard] = useState({});
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dotsCount, setDotsCount] = useState(3);
  const [filteredCampers, setFilteredCampers] = useState([]);
  const [options, setOptions] = useState({
    nivelesIngles: [], // Agrega otras opciones según sea necesario
  });

  useEffect(() => {
    fetch('http://localhost:5000/API/campers')
      .then(response => response.json())
      .then(data => {
        setCampers(data);
        setFilteredCampers(data); // Inicializa con todos los campers
        setLoading(false);
        const nivelesIngles = [...new Set(data.map(camper => camper.englishLevel))];
        setOptions({
          ...options,
          nivelesIngles,
        });
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
        setLoading(false);
      });
  }, [options]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCount(prevCount => (prevCount === 0 ? 3 : prevCount - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Filtrar campers cuando cambie el filtro
    const filterCampers = () => {
      // Implementa la lógica de filtrado aquí
      let filteredData = campers.filter(camper => {
        return (
          (!filtro.especialidad || camper.especiality === filtro.especialidad) &&
          (!filtro.pais || camper.locality === filtro.pais) &&
          (!filtro.programmerType || camper.programmerType === filtro.programmerType) &&
          (!filtro.nivelIngles || (options.nivelesIngles.includes(filtro.nivelIngles) && camper.englishLevel === filtro.nivelIngles)) &&
          (!filtro.seniority || camper.seniority === filtro.seniority)
        );
      });

      setFilteredCampers(filteredData);
    };

    // Llamamos a la función aquí para que sea una dependencia válida en el useEffect
    filterCampers();
  }, [filtro, options, campers]);

  const toggleModal = (id, title, description) => {
    setSelectedCard({ id, title, description });
  };

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
