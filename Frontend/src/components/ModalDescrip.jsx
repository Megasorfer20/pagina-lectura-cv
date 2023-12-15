// MoreDetails.jsx
import React, { useState, useEffect } from 'react';
import './css/ModalDescrip.css';
import Carga from './Carga';

const ModalDescrip = ({ camperId, onClose }) => {
  const [camperDetail, setCamperDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!camperId) {
          console.error('camperId is undefined');
          return;
        }

        const response = await fetch(`http://localhost:5000/API/campersDetailsbyCamper/${camperId}`);
        const data = await response.json();

        if (Array.isArray(data)) {
          const selectedCamper = data.find((camper) => camper.camper === camperId);

          if (selectedCamper) {
            setCamperDetail({
              ...selectedCamper,
              name: selectedCamper.name || 'Nombre no encontrado',
              lastName: selectedCamper.lastName || 'Apellido no encontrado',
              // Agregar otros campos según tu estructura de datos
            });
          } else {
            setShowMessage(true);
          }
        } else {
          setShowMessage(true);
        }

        const additionalDetailsResponse = await fetch(`http://localhost:5000/API/campers/${camperId}`);
        const additionalDetailsDataArray = await additionalDetailsResponse.json();

        if (additionalDetailsDataArray.length > 0) {
          setAdditionalDetails(additionalDetailsDataArray[0]);
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
  }, [camperId]);

  const { stack = [], experiencie: experience = [], softSkills = [] } = camperDetail;

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
                  <div className='center'>
                    <Carga />
                  </div>
                  <p className='textoError'>No se encontraron detalles del camper.</p>
                  <button className='botonERR' onClick={onClose}>
                    Cerrar
                  </button>
                </div>
              </div>
            ) : (
              <div className="modal-content2">
                <button onClick={onClose}>Cerrar</button>
<div className='super'>
                <div className='tituloeimagen'>
                  <img className='imagenDetalles' src={`data:image/png;base64, ${additionalDetails.photo}`} alt="Foto del programador" />
                  <p>{`${additionalDetails.name} ${additionalDetails.lastName}`}</p>
                </div>
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
               <p>{camperDetail.biography}</p>

                
          
                
                <p>Seniority: {additionalDetails.seniority || 'Seniority no encontrado'}</p>
                <p>{additionalDetails.programmerType || 'Tipo de programador no encontrado'}</p>
            

              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ModalDescrip;
