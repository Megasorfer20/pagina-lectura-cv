import React, { useState, useEffect } from "react";
import "./Formulario.css";

const Formulario = () => {
  const [formData, setFormData] = useState({
    nombre: "",
    empresa: "",
    telefono: "",
    correo: "",
    descripcion: "",
    codigoPais: "+57",
  });

  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.nombre === "" ||
      formData.empresa === "" ||
      formData.telefono === "" ||
      formData.correo === "" ||
      formData.descripcion === "" ||
      formData.codigoPais === ""
    ) {
      if (!errorMessage) {
        setErrorMessage("Todos los campos deben ser llenados");
      }
      applyAnimation();
    } else {
      try {
        // Realizar la solicitud POST
        const response = await fetch("http://localhost:5000/API/reqMoreInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        // Verificar el estado de la respuesta
        if (response.ok) {
          console.log("Solicitud enviada con éxito");
          setErrorMessage("");
        } else {
          // Si la respuesta no es exitosa, mostrar un mensaje de error
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error en la solicitud");
          applyAnimation();
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        setErrorMessage("Error en la solicitud");
        applyAnimation();
      }
    }
  };

  const applyAnimation = () => {
    const errorMessageElement = document.querySelector(".error-message");
    if (errorMessageElement) {
      errorMessageElement.classList.add("shake-animation");
      setTimeout(() => {
        errorMessageElement.classList.remove("shake-animation");
      }, 500);
    }
  };

  useEffect(() => {
    return () => {
      setErrorMessage("");
    };
  }, []);

  const codigosPais = [
    { codigo: "+57", pais: "Colombia" },
    { codigo: "+1", pais: "Estados Unidos" },
    { codigo: "+44", pais: "Reino Unido" },
    { codigo: "+33", pais: "Francia" },
    { codigo: "+49", pais: "Alemania" },
    { codigo: "+81", pais: "Japón" },
    { codigo: "+86", pais: "China" },
    { codigo: "+91", pais: "India" },
    { codigo: "+52", pais: "México" },
    { codigo: "+55", pais: "Brasil" },
    { codigo: "+34", pais: "España" },
  ];


  return (
    <div className="center colorfontt">
      <form className="formulario" onSubmit={handleSubmit}>
        {errorMessage && <div className="error-message">{errorMessage}</div>}
        <h1>Mas informacion</h1>

        <label>
          <h3>Nombre:</h3>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
          />
        </label>

        <label>
          <h3>Empresa:</h3>
          <input
            type="text"
            name="empresa"
            value={formData.empresa}
            onChange={handleChange}
          />
        </label>

        <label>
          <h3>Número de Teléfono:</h3>
          <div className="center telefono-container">
            <select
              name="codigoPais"
              value={formData.codigoPais}
              onChange={handleChange}
            >
              {codigosPais.map((codigo) => (
                <option key={codigo.codigo} value={codigo.codigo}>
                  {codigo.pais} ({codigo.codigo})
                </option>
              ))}
            </select>
            <input
              type="tel"
              name="telefono"
              value={formData.telefono}
              onChange={handleChange}
            />
          </div>
        </label>

        <label>
          <h3>Correo:</h3>
          <input
            type="email"
            name="correo"
            value={formData.correo}
            onChange={handleChange}
          />
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
