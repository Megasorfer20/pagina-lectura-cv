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
import Camper from './components/VistaCamper/Camper';

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
      {mostrarCarga ? (
        <div className="centro">
          <Carga />
        </div>
      ) : (
      
         
          
          <Switch>
            <Route path="/admin">
              {/* Renderiza el componente Admin solo en la ruta /admin */}
              <Admin />
            </Route>
            <Route path="/camper" exact>
              {/* Renderiza el componente Camper solo en la ruta /camper */}
              <Camper />
            </Route>
            <Route path="/" exact>
              
             <div className='App'><Nav />
              <header className="App-header">
                <General />
                <br />
                <Filtro onFilterChange={handleFilterChange} />
                <Cards filtro={filtro} />
                <Footer />
                <Astronautas />
              </header>
              </div>
            </Route>
          </Switch>
       
      )}
    </Router>
  );
}

export default App;
