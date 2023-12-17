// App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Nav from './components/General/Nav';
import Footer from './components/Footer';
import General from './components/General/General';
import Filtro from './components/Filtro';
import Cards from './components/Cards';
import Astronautas from './components/General/Astronautas';
import Admin from './components/VistaAdmin/Admin';
import './App.css';

function App() {
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

  return (
    <Router>
      
        <Route path="/" exact><div className="App">
        <Nav />
          <header className="App-header">
            <General />
            <br />
            <Filtro onFilterChange={handleFilterChange} />
            <Cards filtro={filtro} />
            <Footer />
            <Astronautas />
          </header></div>
        </Route>
        <Route path="/admin" exact>
          <Admin />
        </Route>
      
    </Router>
  );
}

export default App;
