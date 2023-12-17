import React, { useState, useEffect } from 'react';
import './css/Filtro.css';

const Filtro = ({ onFilterChange }) => {
  const [filtro, setFiltro] = useState({
    especialidad: '',
    pais: '',
    programmerType: '',
    nivelIngles: '',
    seniority: '',
  });

  const [options, setOptions] = useState({
    especialidades: [],
    paises: [],
    programmerTypes: [],
    nivelesIngles: [],
    seniorities: [],
  });

  useEffect(() => {
    fetch('http://localhost:5000/API/campers')
      .then(response => response.json())
      .then(data => {
        const especialidades = [...new Set(data.map(camper => camper.especiality))];
        const paises = [...new Set(data.map(camper => camper.locality))];
        const programmerTypes = [...new Set(data.map(camper => camper.programmerType))];
        const nivelesIngles = [...new Set(data.map(camper => camper.englishLevel))];
        const seniorities = [...new Set(data.map(camper => camper.seniority))];

        setOptions({
          especialidades,
          paises,
          programmerTypes,
          nivelesIngles,
          seniorities,
        });
      })
      .catch(error => {
        console.error('Error fetching campers:', error);
      });
  }, []);

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
              {options.especialidades.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filtro.pais}
              onChange={(e) => handleInputChange('pais', e.target.value)}
            >
              <option value="">País</option>
              {options.paises.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filtro.programmerType}
              onChange={(e) => handleInputChange('programmerType', e.target.value)}
            >
              <option value="">Programmer Type</option>
              {options.programmerTypes.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filtro.nivelIngles}
              onChange={(e) => handleInputChange('nivelIngles', e.target.value)}
            >
              <option value="">Nivel de Inglés</option>
              {options.nivelesIngles.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <select
              value={filtro.seniority}
              onChange={(e) => handleInputChange('seniority', e.target.value)}
            >
              <option value="">Seniority</option>
              {options.seniorities.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))}
            </select>
          </div>
          <div>
            <button type="submit">Filtrar</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Filtro;
