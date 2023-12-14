import Logo from '../logo-campus.png';
import '../components/css/Carga.css'
import React, { useState, useEffect } from 'react';

const Carga = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      setTimeout(() => {
        setCargando(false);
      }, 20000); 
    };

    cargarDatos();
  }, []);

  return (
    <div>
      {cargando ? (
        <div>
        <div class="spinner"></div>
        <img className='imaget' src={Logo} alt="Logo" />
        </div>
      ) : (
        <div>
          <p>Datos cargados exitosamente.</p>
        </div>
      )}
    </div>
  );
};

export default Carga;
