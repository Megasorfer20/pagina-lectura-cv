import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo-vertical-campus.png";

const NavCamper = () => {
  const handleLogout = () => {
    // Redirigir a "/"
    window.location.assign("/");

    // Esperar un breve momento antes de recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };



  return (
    <div>
      <nav className="navbar">
        <div className="logo-container">
          <img src={Logo} alt="Logo" />
        </div>
        <div className="login-container">
          <Link
            to="/"
            className="login-btn irse"
            style={{ textDecoration: "none" }}
            onClick={handleLogout}
          >
            Cerrar sesión
          </Link>
        </div>
      </nav>
    </div>
  );
};

export default NavCamper;
