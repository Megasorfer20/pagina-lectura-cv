import React, { useState, useEffect } from 'react';
import './Formulario.css';

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    empresa: '',
    telefono: '',
    correo: '',
    descripcion: '',
  });

  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación de campos
    if (
      formData.nombre === '' ||
      formData.empresa === '' ||
      formData.telefono === '' ||
      formData.correo === '' ||
      formData.descripcion === ''
    ) {
      // Si ya hay un mensaje de error, mantenerlo
      if (!errorMessage) {
        setErrorMessage('Todos los campos deben ser llenados');
      }
      // Aplicar la animación
      applyAnimation();
    } else {
      console.log('Datos del formulario:', formData);
      setErrorMessage('');
    }
  };

  const applyAnimation = () => {
    // Aplicar la clase de animación al elemento
    const errorMessageElement = document.querySelector('.error-message');
    if (errorMessageElement) {
      errorMessageElement.classList.add('shake-animation');

      // Después de un tiempo, quitar la clase para detener la animación
      setTimeout(() => {
        errorMessageElement.classList.remove('shake-animation');
      }, 500); // Ajusta el tiempo según tus preferencias
    }
  };

  // Efecto secundario para limpiar el mensaje de error al desmontar el componente
  useEffect(() => {
    return () => {
      setErrorMessage('');
    };
  }, []);

  return (
    <div className="center colorfontt">
      <form className="formulario" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <h1>Formulario</h1>

        <label>
        <h3>Nombre:</h3>
          <input type="text" name="nombre" value={formData.nombre} onChange={handleChange} />
        </label>

        <label>
        <h3>Empresa:</h3>
          <input type="text" name="empresa" value={formData.empresa} onChange={handleChange} />
        </label>

        <label>
        <h3>Número de Teléfono:</h3>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} />
        </label>

        <label>
         <h3> Correo:</h3>
          <input type="email" name="correo" value={formData.correo} onChange={handleChange} />
        </label>

        <label className="descripcion-label">
        <h3>Descripción:</h3>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            className="descripcion"
          />
        </label>

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
};

export default Formulario;
