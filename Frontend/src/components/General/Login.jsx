// Login.jsx
import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Logo from "../../logo-campus.png";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault(); // Evita la recarga de la página
    if (!username || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
    } else {
      // Lógica de autenticación simulada

      // Navegar a la ruta deseada después de autenticar con éxito
      history.push("/admin"); // Reemplaza '/admin' con la ruta que deseas
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>
          X
        </button>

        <div className="center">
          <h2 className="titul">Login</h2>
        </div>

        <img className="logol" src={Logo} alt="Logo" />

        <form onSubmit={handleLogin}>
          <h3>Usuario:</h3>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <h3>Contraseña:</h3>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          {errorMessage && <p className="error-message">{errorMessage}</p>}

          <div className="pased">
            <button className="ingresa" type="submit">
              <h1>Ingresar</h1>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
