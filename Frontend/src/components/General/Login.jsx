import React from 'react';
import './Login.css';
import Logo from '../../logo-campus.png';

const Login = ({ onClose }) => {

  
  return (
    <div className="modal">
      <div className="modal-content">
        
        <button className="close-button" onClick={onClose}>X</button>
        <div className='center'>
        <h2 className='titul'>Login</h2>
        </div>
        <img className='logol' src={Logo} alt="Logo" />

        <h3>Usuario:</h3>
        <input type="text" />

        <h3>Contraseña:</h3>
        <input type="password" />

<div className='pased'>
        <button className='ingresa'><h1>Ingresar</h1></button>
</div>       
      </div>
    </div>
  );
};

export default Login;
