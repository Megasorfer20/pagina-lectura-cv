import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./Login.css";
import Logo from "../../logo-campus.png";

const Login = ({ onClose }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Nuevo estado para el estado de autenticación
  const history = useHistory();

  const handleLogin = (e) => {
    e.preventDefault();

    if (!username || !password) {
      setErrorMessage("Por favor, completa todos los campos.");
    } else {
      // Lógica de autenticación simulada
      if (username === "usuario1" && password === "contrasena1") {
        // Actualiza el estado de autenticación
        setIsLoggedIn(true);

        // Redirige a la ruta de administrador si las credenciales son correctas
        history.push("/admin");
      } else if (username === "usuario2" && password === "contrasena2") {
        // Actualiza el estado de autenticación
        setIsLoggedIn(true);

        // Redirige a la ruta de camper si las credenciales son correctas
        history.push("/camper");
      } else {
        setErrorMessage("Credenciales incorrectas. Intenta de nuevo.");
      }
    }
  };

  // Cierra el modal cuando el usuario esté autenticado
  if (isLoggedIn) {
    onClose();
  }

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
