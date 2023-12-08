import React, { useState } from 'react';
import './css/Filtro.css';


const Filtro = ({ onFilterChange }) => {
    const [filtro, setFiltro] = useState({
      especialidad: '',
      pais: '',
      ciudad: '',
      nivelIngles: '',
      seniority: '',
    });
  
    const handleInputChange = (campo, valor) => {
      setFiltro({
        ...filtro,
        [campo]: valor,
      });
    };
  
    const handleSubmit = (event) => {
      event.preventDefault();
      onFilterChange(filtro);
    };
  
    return (
      <div className="filtro-container">
        <form onSubmit={handleSubmit}>
          <div className="filtro-row">
            <div>
              <select
                value={filtro.especialidad}
                onChange={(e) => handleInputChange('especialidad', e.target.value)}
              >
                <option value="">Especialidad</option>
                {/* Agrega opciones específicas para la especialidad */}
                <option value="front-end">Front-end</option>
                <option value="back-end">Back-end</option>
                {/* ... otras opciones ... */}
              </select>
            </div>
            <div>
              <select
                value={filtro.pais}
                onChange={(e) => handleInputChange('pais', e.target.value)}
              >
                <option value="">País</option>
                {/* Agrega opciones específicas para los países */}
                <option value="usa">Estados Unidos</option>
                <option value="spain">España</option>
                {/* ... otras opciones ... */}
              </select>
            </div>
            <div>
              <select
                value={filtro.ciudad}
                onChange={(e) => handleInputChange('ciudad', e.target.value)}
              >
                <option value="">Ciudad</option>
                {/* Agrega opciones específicas para las ciudades */}
                <option value="nyc">Nueva York</option>
                <option value="madrid">Madrid</option>
                {/* ... otras opciones ... */}
              </select>
            </div>
            <div>
              <select
                value={filtro.nivelIngles}
                onChange={(e) => handleInputChange('nivelIngles', e.target.value)}
              >
                <option value="">Nivel de Inglés</option>
                {/* Agrega opciones específicas para los niveles de inglés */}
                <option value="basico">Básico</option>
                <option value="intermedio">Intermedio</option>
                {/* ... otras opciones ... */}
              </select>
            </div>
            <div>
              <select
                value={filtro.seniority}
                onChange={(e) => handleInputChange('seniority', e.target.value)}
              >
                <option value="">Seniority</option>
                {/* Agrega opciones específicas para los niveles de seniority */}
                <option value="junior">Junior</option>
                <option value="senior">Senior</option>
                {/* ... otras opciones ... */}
              </select>
            </div>
            <div><button type="submit">Filtrar</button></div>
          </div>
        </form>
      </div>
    );
  };
  
  export default Filtro;
  