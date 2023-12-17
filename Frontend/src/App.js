// App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Nav from './components/General/Nav';
import Footer from './components/Footer';
import General from './components/General/General';
import Filtro from './components/Filtro';
import Cards from './components/Cards';
import Astronautas from './components/General/Astronautas';
import Admin from './components/VistaAdmin/Admin';
import Carga from './components/Carga';

import './App.css';

function App() {
  const [filtro, setFiltro] = useState({
    especialidad: '',
    pais: '',
    programmerType: '',
    nivelIngles: '',
    seniority: '',
  });

  const [mostrarCarga, setMostrarCarga] = useState(true);

  useEffect(() => {
    // Ocultar el componente de carga después de un tiempo (ejemplo: 2000 milisegundos)
    const timer = setTimeout(() => {
      setMostrarCarga(false);
    }, 2000);

    return () => clearTimeout(timer); // Limpiar el temporizador al desmontar el componente
  }, []);

  const handleFilterChange = (filtro) => {
    setFiltro(filtro);
  };

  return (
    <Router>
      <Switch>
        <Route path="/admin">
          {mostrarCarga ? (
            <div className='centro'>
              <Carga />
            </div>
          ) : (
            <Admin />
          )}
        </Route>
        <Route path="/" exact>
          {mostrarCarga ? (
            <Carga />
          ) : (
            <div className="App">
              <Nav />
              <header className="App-header">
                <General />
                <br />
                <Filtro onFilterChange={handleFilterChange} />
                <Cards filtro={filtro} />
                <Footer />
                <Astronautas />
              </header>
            </div>
          )}
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
