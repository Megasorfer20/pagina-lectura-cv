import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import astora from '../../astora.png';

import Carga from '../Carga';

const ModalDescrip = ({ camperId, onClose }) => {
  const [camperDetail, setCamperDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [additionalDetails, setAdditionalDetails] = useState({});
  const [isVisible, setIsVisible] = useState(false);
  const loreeeRef = useRef(null);

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
        }, 1000);
      } catch (error) {
        console.error('Error al obtener detalles del camper:', error);
        setLoading(false);
        setShowMessage(true);
      }
    };

    fetchData();
  }, [camperId]);

  useEffect(() => {
    const loreeeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (loreeeRef.current) {
      loreeeObserver.observe(loreeeRef.current);
    }

    return () => {
      loreeeObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    const bodyElement = document.body;
    bodyElement.classList.add('modal-open');

    return () => {
      bodyElement.classList.remove('modal-open');
    };
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
                <div className='cerraDec'>
                  <button className='butXD' onClick={onClose}>X</button>
                </div>
                <div className='super'>
                  <div className='tituloeimagen'>
                    <div className='genert'>
                      <img className='imagenDetalles' src={`data:image/png;base64, ${additionalDetails.photo}`} alt="Foto del programador" />
                      <div className='tilted-container'>
                        <p className='tilted'>{`${additionalDetails.name} ${additionalDetails.lastName}`}</p>
                        <p className='tilted'>{additionalDetails.especiality}</p>
                      </div>
                    </div>
                    <img className='astora' src={astora} alt='astora'></img>
                  </div>
                  <div className='detallito'>
                    <div className="arreglo1">
                      <h4>Seniority:</h4>
                      <p className="arreglo"> {additionalDetails.seniority}</p>
                      <h4>Tipo de programador:</h4>
                      <p className="arreglo">{additionalDetails.programmerType}</p>
                      <h4>Nivel de ingles:</h4>
                      <p className="arreglo">{additionalDetails.englishLevel}</p>
                      <h4>Pais:</h4>
                      <p className="arreglo"> {additionalDetails.locality}</p>
                      <h4>Preferencia salarial:</h4>
                      <p className="arreglo"> ${additionalDetails.salary}</p>
                      <h4>Tecnologias:</h4>
                      <ul className='listaentra'>
                        {additionalDetails.tecnologies.map((tech, techIndex) => (
                          <li className="arreglo col" key={techIndex}>{tech}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className='arreglo'>
                        <h3>Stack:</h3>
                        <ul>
                          {stack.map((item, index) => (
                            <li className='tel' key={index}>{`${item}.`}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='arreglo'>
                        <h3>Experiencia:</h3>
                        <ul>
                          {experience.map((item, index) => (
                            <li className='tel' key={index}>{`${item}.`}</li>
                          ))}
                        </ul>
                      </div>
                      <div className='arreglo'>
                        <h3>Soft Skills:</h3>
                        <ul>
                          {softSkills.map((item, index) => (
                            <li className='tel' key={index}>{`${item}.`}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>
                </div>
                <h1>Presentacion:</h1>
                <div className='center'>
                  <p ref={loreeeRef} className={`loreee ${isVisible ? 'visible' : ''}`}>
                    {camperDetail.biography}
                  </p>
                </div>
                <div>
                <Link to={`/admin/editar/${camperId}`} className="login-btn" style={{ textDecoration: 'none' }}>
  editar
</Link>

                    <button>Eliminar</button>
                </div>
              </div>
            )}
          </>
        )}
      </>
    </div>
  );
};

export default ModalDescrip;

