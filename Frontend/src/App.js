import React, { useState } from 'react';
import Nav from './components/General/Nav';
import Footer from './components/Footer';
import General from './components/General/General';
import Filtro from './components/Filtro';
import Cards from './components/Cards';
import Astronautas from './components/General/Astronautas';
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
    <div className="App">
      <Nav />
      <header className="App-header">
        <General />
        <br />
        <Filtro onFilterChange={handleFilterChange} />
        <Cards filtro={filtro} />
      </header>
      <Footer />
      <Astronautas></Astronautas>
    </div>
  );
}

export default App;
