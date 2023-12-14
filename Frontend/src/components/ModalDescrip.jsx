import React, { useState, useEffect } from 'react';
import './css/ModalDescrip.css';
import Carga from './Carga';

const ModalDescrip = ({ camperId, fetchDetails, onClose }) => {
  const [camperDetail, setCamperDetail] = useState({});
  const [loading, setLoading] = useState(true);
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Realiza la solicitud para obtener detalles de todos los campers
        const response = await fetch('http://localhost:5000/API/camperDetail');
        const data = await response.json();

        // Verifica si data es un array
        if (Array.isArray(data)) {
          // Filtra los datos para obtener solo el camper con el id correspondiente
          const selectedCamper = data.find(camper => camper.camper === camperId);

          if (selectedCamper) {
            // Realiza una segunda solicitud para obtener el nombre y apellido del camper
            const camperResponse = await fetch(`http://localhost:5000/API/campers/${camperId}`);
            const camperDataArray = await camperResponse.json();

            // Verifica si hay datos en el array
            if (camperDataArray.length > 0) {
              // Accede al objeto dentro del array en la posición 0
              const camperData = camperDataArray[0];

              // Accede a las propiedades name y lastName dentro del objeto
              const { name, lastName } = camperData;

              // Actualiza el estado con los detalles del camper
              setCamperDetail({
                ...selectedCamper,
                name: name || 'Nombre no encontrado',
                lastName: lastName || 'Apellido no encontrado',
              });

              // Delay para prolongar la visibilidad del componente Carga
              setTimeout(() => {
                setLoading(false);

                // Cambia a modo oscuro después de 5 segundos (ajusta el tiempo según sea necesario)
                setIsDarkMode(true);
              }, 2000);
            } else {
              setLoading(false);
            }
          } else {
            setLoading(false);
          }
        } else {
          setLoading(false);
        }
      } catch (error) {
        console.error('Error al obtener detalles del camper:', error);
        setLoading(false);
      }
    };

    fetchData();

    if (fetchDetails) {
      fetchDetails();
    }
  }, [camperId, fetchDetails]);

  return (
    <div className={`modal2${isDarkMode ? ' dark-mode' : ''}`}>
      {loading && <p><Carga /></p>}
      {!loading && Object.keys(camperDetail).length > 0 && (
        <div className="modal-content2">
          <button onClick={onClose}>Cerrar</button>
          <p>{`${camperDetail.name || 'Nombre no encontrado'} ${camperDetail.lastName || 'Apellido no encontrado'}`}</p>
          <p>{camperDetail.biography}</p>

          <h3>Stack:</h3>
          <ul>
            {camperDetail.stack.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Experiencia:</h3>
          <ul>
            {camperDetail.experiencie.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3>Soft Skills:</h3>
          <ul>
            {camperDetail.softSkills.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default ModalDescrip;
