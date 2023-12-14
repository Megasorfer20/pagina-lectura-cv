import Logo from '../logo-campus.png';
import AstroF from '../astroF.png';
import '../components/css/Carga.css'
import React, { useState, useEffect } from 'react';

const Carga = () => {
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const cargarDatos = () => {
      setTimeout(() => {
        setCargando(false);
      }, 5010); 
    };

    cargarDatos();
  }, []);

  return (
    <div>
      {cargando ? (
        <div>
        <div className="spinner"></div>
        <img className='imaget' src={Logo} alt="Logo" />
        </div>
      ) : (
        <div>
         <div className="spinner"></div>
        <img className='imaget' src={AstroF} alt="Logo" />
        </div>
      )}
    </div>
  );
};

export default Carga;
