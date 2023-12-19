import React from 'react';
import NavCamper from './NavCamper';
import Footer from '../Footer';
import Astora1 from '../../Astro1.png';
class Camper extends React.Component {
  render() {
    
    return (
      <div className='App'>
      <div className='App-header'>
        <NavCamper></NavCamper><h2>Camper</h2>
        <div className='center miltt'>
        <img src={Astora1} width='45%' className='camperr' alt=""/>
        <h3>En tu perfil, puedes revisar detalladamente tus habilidades, con descripciones y estadísticas. 
          <br></br>
          Conoce más sobre ti mismo explorando las características personales y profesionales registradas. 
          <br></br>Mantente al tanto de tus notas y comentarios de instructores, visualiza tu horario de manera personalizada y descubre cuántos Camper Coins has acumulado. 
          <br></br>Además, si necesitas un respaldo o compartir tus logros, puedes generar un PDF con todos tus datos con un solo clic. 
          <br></br>
          <br></br>
           ¡Es tu espacio completo para gestionar y optimizar tu experiencia en CampusLands!</h3>
        </div>
        
      </div>
      <Footer></Footer>
      </div>
    );
  }
}

export default Camper;
