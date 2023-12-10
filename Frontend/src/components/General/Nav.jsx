import React, { useState } from 'react';
import Logo from '../../logo-vertical-campus.png';
import Login from './Login';
import './Nav.css';

const Nav = () => {
  const [isLoginModalOpen, setLoginModalOpen] = useState(false);

  const openLoginModal = () => {
    setLoginModalOpen(true);
  };

  const closeLoginModal = () => {
    setLoginModalOpen(false);
  };

  return (
    <nav className="navbar">
      <div className="logo-container">
        <img src={Logo} alt="Logo" />
      </div>
      <div className="login-container">
        <button className="login-btn" onClick={openLoginModal}>
          Login
        </button>
        {isLoginModalOpen && <Login onClose={closeLoginModal} />}
      </div>
    </nav>
  );
};

export default Nav;
