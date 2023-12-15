import React, { useState, useEffect } from 'react';
import './css/ModalDescrip.css';
import Carga from './Carga';

const ModalDescrip = ({ camperId, fetchDetails, onClose }) => {
  const [camperDetail, setCamperDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/API/campersDetailsbyCamper/${camperId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const selectedCamper = data.find((camper) => camper.camper === camperId);

          if (selectedCamper) {

            const camperResponse = await fetch(`http://localhost:5000/API/campers/${camperId}`);
            const camperDataArray = await camperResponse.json();

            if (camperDataArray.length > 0) {
              const camperData = camperDataArray[0];

              const { name, lastName } = camperData;

              setCamperDetail({
                ...selectedCamper,
                name: name || 'Nombre no encontrado',
                lastName: lastName || 'Apellido no encontrado',
              });
            } else {
              setShowMessage(true);
            }
          } else {
            setShowMessage(true);
          }
        } else {
          setShowMessage(true);
        }

        setTimeout(() => {
          setLoading(false);

          setIsDarkMode(true);
        }, 5000);
      } catch (error) {
        console.error('Error al obtener detalles del camper:', error);
        setLoading(false);
        setShowMessage(true);
      }
    };

    fetchData();

    if (fetchDetails) {
      fetchDetails();
    }
  }, [camperId, fetchDetails]);

  const { stack = [], experience = [], softSkills = [] } = camperDetail;

  return (
    <div className={`modal2${isDarkMode ? ' dark-mode' : ''}`}>
      <>
        {loading ? (
          <Carga />
        ) : (
          <>
            {showMessage ? (
              <div className='dark-mode'>
                <div className='contenidoError'>
                  <div className='center'><Carga /></div>
                  <p className='textoError'>No se encontraron detalles del camper.</p>
                  <button className='botonERR' onClick={onClose}>Cerrar</button>
                </div>
              </div>
            ) : (
              <div className="modal-content2">
                <button onClick={onClose}>Cerrar</button>
                <p>{`${camperDetail.name || 'Nombre no encontrado'} ${
                  camperDetail.lastName || 'Apellido no encontrado'
                }`}</p>
                <p>{camperDetail.biography}</p>

                <h3>Stack:</h3>
                <ul>
                  {stack.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>Experiencia:</h3>
                <ul>
                  {experience.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>

                <h3>Soft Skills:</h3>
                <ul>
                  {softSkills.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ModalDescrip;
