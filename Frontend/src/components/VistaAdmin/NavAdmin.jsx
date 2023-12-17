import React from "react";
import { Link } from "react-router-dom";
import Logo from "../../logo-vertical-campus.png";

const NavAdmin = () => {
  const handleLogout = () => {
    // Redirigir a "/"
    window.location.assign("/");

    // Esperar un breve momento antes de recargar la página
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleAdminClick = () => {
    // Cambiar la ruta a "/admin" y recargar la página
    window.location.assign("/admin");
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const handleNotificacionesClick = () => {
    window.location.assign("/admin/notificaciones");
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
            to="/admin/notificaciones"
            className="login-btn"
            style={{ textDecoration: "none" }}
            onClick={handleNotificacionesClick}
          >
            Notificaciones
          </Link>
          <Link
            to="/admin"
            className="login-btn"
            style={{ textDecoration: "none" }}
            onClick={handleAdminClick}
          >
            Campers
          </Link>
          <Link
            to="/"
            className="login-btn"
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

export default NavAdmin;
