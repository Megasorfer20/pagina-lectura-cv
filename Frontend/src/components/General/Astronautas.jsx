import React from 'react';
import Astro1 from '../../Astro1.png';
import Astro2 from '../../Astro2.png';
import Astro3 from '../../Astro3.png';
import Astro4 from '../../astora.png';
import Astro5 from '../../astroF.png';
import './Astronautas.css';

const Astronautas = () => {
  return (
    <div className="astronautas-container">
      <img className="astronauta-image astronauta-1" src={Astro1} alt="astral" />
      <img className="astronauta-image astronauta-2" src={Astro2} alt="astral" />
      <img className="astronauta-image astronauta-3" src={Astro3} alt="astral" />
      <img className="astronauta-image astronauta-4" src={Astro4} alt="astral" />
      <img className="astronauta-image astronauta-5" src={Astro5} alt="astral" />
      <img className="astronauta-image astronauta-6" src={Astro1} alt="astral" />
      <img className="astronauta-image astronauta-7" src={Astro2} alt="astral" />
      <img className="astronauta-image astronauta-8" src={Astro3} alt="astral" />
      <img className="astronauta-image astronauta-9" src={Astro4} alt="astral" />
      <img className="astronauta-image astronauta-10" src={Astro5} alt="astral" />
    </div>
  );
};

export default Astronautas;
