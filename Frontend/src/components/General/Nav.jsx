import React from 'react';
import Logo from '../../logo-vertical-campus.png';
import './Nav.css';

const Nav = () => {
  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-container">
        <button className="login-btn">Login</button>
      </div>
    </nav>
  );
};

export default Nav;
