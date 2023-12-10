import React from 'react';
import './Login.css';
import Logo from '../../logo-campus.png';

const Login = ({ onClose }) => {

  
  return (
    <div className="modal">
      <div className="modal-content">
        
        <button className="close-button" onClick={onClose}>X</button>
        
        <h2>Login</h2>

        <img className='logo' src={Logo} alt="Logo" />

        <h3>Usuario</h3>
        <input type="text" />

        <h3>Contraseña</h3>
        <input type="password" />

<div className='pased'>
        <button><h1>Ingresar</h1></button>
</div>       
      </div>
    </div>
  );
};

export default Login;
