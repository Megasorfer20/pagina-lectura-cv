import React, { useState, useEffect } from "react";
import "./Formulario.css";
import Valido from "./Valido";
import Astro from "../../Astro4.png";

const Formulario = ({ camperId }) => {
  const [formData, setFormData] = useState({
    name: "",
    enterprise: "",
    phoneNum: "",
    email: "",
    description: "",
    phonePreposition: "+57",
    camperId: camperId, // Agrega el campo camperId al estado del formulario
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      formData.name === "" ||
      formData.enterprise === "" ||
      formData.phoneNum === "" ||
      formData.email === "" ||
      formData.description === "" ||
      formData.phonePreposition === ""
    ) {
      if (!errorMessage) {
        setErrorMessage("Todos los campos deben ser llenados");
      }
      applyAnimation();
    } else {
      try {
        const response = await fetch("http://localhost:5000/API/reqMoreInfo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          console.log("Solicitud enviada con éxito");
          setErrorMessage("");
          setIsFormValid(true);
        } else {
          const errorData = await response.json();
          setErrorMessage(errorData.message || "Error en la solicitud");
          applyAnimation();
          setIsFormValid(false);
        }
      } catch (error) {
        console.error("Error al enviar la solicitud:", error);
        setErrorMessage("Error en la solicitud");
        applyAnimation();
        setIsFormValid(false);
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
      {isFormValid ? (
        <div className="formi">
          <img className="altera" src={Astro} alt="" />
          <Valido />
          <img src={Astro} alt="" />
        </div>
      ) : (
        <div className="formi">
          <img className="altera" src={Astro} alt="" />
          <form className="formulario" onSubmit={handleSubmit}>
            {errorMessage && <div className="error-message">{errorMessage}</div>}
            <h1 className="titulForm">Mas informacion</h1>

            <label>
              <h3>Nombre:</h3>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </label>

            <label>
              <h3>Empresa:</h3>
              <input
                type="text"
                name="enterprise"
                value={formData.enterprise}
                onChange={handleChange}
              />
            </label>

            <label>
              <h3>Número de Teléfono:</h3>
              <div className="center telefono-container">
                <select
                  name="phonePreposition"
                  value={formData.phonePreposition}
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
                  name="phoneNum"
                  value={formData.phoneNum}
                  onChange={handleChange}
                />
              </div>
            </label>

            <label>
              <h3>Correo:</h3>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </label>

            <label className="descripcion-label">
              <h3>Descripción:</h3>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                className="descripcion"
              />
            </label>

            <button type="submit">Enviar</button>
          </form>
          <img src={Astro} alt="" />
        </div>
      )}
    </div>
  );
};

export default Formulario;
