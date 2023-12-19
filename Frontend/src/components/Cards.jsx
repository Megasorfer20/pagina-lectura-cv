import React, { useState, useEffect, useMemo } from "react";
import ModalDescrip from "./ModalDescrip";
import Prede from "../prede.jpg";
import Carga from "./Carga";
import "./css/Card.css";

const Cards = ({ filtro }) => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [dotsCount, setDotsCount] = useState(3);
  const [filterChangeFlag, setFilterChangeFlag] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/API/campers");
        const data = await response.json();
        setCampers(data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching campers:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [filterChangeFlag]); // Se ejecuta cada vez que filterChangeFlag cambia

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCount((prevCount) => (prevCount === 0 ? 3 : prevCount - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleModal = (id, title, description) => {
    setSelectedCard({ id, title, description });
  };

  // Usar useMemo para crear una clave única basada en el filtro actual
  const key = useMemo(() => JSON.stringify(filtro), [filtro]);
  const filteredCampers = useMemo(() => {
    return campers.filter((camper) => {
      return (
        (!filtro.especialidad ||
          camper.especiality.toLowerCase() ===
            filtro.especialidad.toLowerCase()) &&
        (!filtro.pais ||
          camper.locality.toLowerCase() === filtro.pais.toLowerCase()) &&
        (!filtro.programmerType ||
          camper.programmerType.toLowerCase() ===
            filtro.programmerType.toLowerCase()) &&
        (!filtro.nivelIngles ||
          camper.englishLevel.toLowerCase() ===
            filtro.nivelIngles.toLowerCase()) &&
        (!filtro.seniority ||
          camper.seniority.toLowerCase() === filtro.seniority.toLowerCase())
      );
    });
  }, [campers, filtro]);

  useEffect(() => {
    // Al cambiar el filtro, actualiza el flag para forzar la recarga
    setFilterChangeFlag((prev) => !prev);
  }, [filtro]);

  const DEFAULT_IMAGE_URL = {Prede};

  return (
    <div key={key} className="card-container">
      {loading && <div className="cargaerror"></div>}
      {!loading && filteredCampers.length > 0 ? (
        filteredCampers.map((camper, index) => (
          <div key={`${camper._id}_${index}`} className="card animate">
            <div className="contenido">
              <p className="senior">{camper.seniority}</p>
              <div className="encabezado">
                <p className="name">{`${camper.name} ${camper.lastName}`}</p>
              </div>
              <img
                className="avatar"
                src={`data:image/png;base64,${camper.photo}`}
                alt=""
                onError={(e) => {
                  e.target.src = DEFAULT_IMAGE_URL;
                }}
              />
              <p className="enfoque">{camper.especiality}</p>
              <div className="valorr">
                <div className="center valorcontent">
                  <div className="centerrr">
                    <span>Nivel de inglés:</span>
                    <span>País:</span>
                    <span>Preferencia salarial:</span>
                  </div>
                  <div className="centerrr">
                    <div className="result ">{camper.englishLevel}</div>
                    <div className="result ">{camper.locality}</div>
                    <div className="result ">${camper.salary}</div>
                  </div>
                </div>
                <p className="centerrr lola">
                  <span>Tecnologías:</span>
                </p>
                <ul className="lineal">
                  {camper.tecnologies.slice(0, 3).map((tech, techIndex) => (
                    <li key={techIndex}>{tech}</li>
                  ))}
                  {camper.tecnologies.length > 3 && <li>...</li>}
                </ul>
              </div>
            </div>
            <button
              className="detalles"
              onClick={() =>
                toggleModal(camper._id, camper.name, camper.lastName)
              }
            >
              Detalles
            </button>
          </div>
        ))
      ) : (
        <div className="notfund">
    <div className="spinner-container">
      <div className="cara">
        <Carga />
      </div>
    </div>
    <div className="textFilter">
      Houston no se encontró ningún camper {".".repeat(dotsCount)}
    </div>
  </div>
      )}
      {selectedCard.id && (
        <ModalDescrip
          camperId={selectedCard.id}
          onClose={() => setSelectedCard({})}
        />
      )}
    </div>
  );
};

export default Cards;
