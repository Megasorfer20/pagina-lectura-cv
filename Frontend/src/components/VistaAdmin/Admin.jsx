// Admin.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavAdmin from './NavAdmin';
import Footer from '../Footer';
import Filtro from '../Filtro';
import CardsAdmin from './CardsAdmin';
import Edit from './Edit';
import './Admin.css';

const Admin = () => {
  const [filtro, setFiltro] = useState({
    especialidad: '',
    pais: '',
    programmerType: '',
    nivelIngles: '',
    seniority: '',
  });

  const handleFilterChange = (filtro) => {
    setFiltro(filtro);
  };

  useEffect(() => {
    // Desplazar la página hacia arriba al renderizar el componente
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="App">
      <NavAdmin />
      <div className="App-header">
        <Router>
          <Switch>
            <Route path="/admin/notificaciones">
              <h2>Contenido de Notificaciones</h2>
            </Route>
            <Route path="/admin/editar/:camperId">
            <Edit />
            </Route>

            <Route path="/admin">
              <div className="mesajeAdd">
                <h2>Bienvenido a tu Panel de Administrador.</h2>
                <p>
                  Aquí puedes gestionar la información de campers en nuestra comunidad. Realiza las siguientes acciones:
                </p>
                <ul className="action-list">
                  <li>
                    <strong>Editar:</strong> Actualiza detalles de campers existentes.
                  </li>
                  <li>
                    <strong>Eliminar:</strong> Retira información obsoleta.
                  </li>
                  <li>
                    <strong>Subir:</strong> Añade nuevos campers.
                  </li>
                  <li>
                    <strong>Notificaciones:</strong> Recibe alertas de cambios y publicaciones.
                  </li>
                </ul>
                <p>Gracias por tu dedicación al mantener nuestra plataforma actualizada.</p>
                </div>
              <Filtro onFilterChange={handleFilterChange} />
              <CardsAdmin filtro={filtro} />
            </Route>
          </Switch>
        </Router>
      </div>
      <Footer />
    </div>
  );
};

export default Admin;