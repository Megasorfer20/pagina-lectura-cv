import React, { useState, useEffect, useMemo } from "react";
import ModalDescripAdmin from "./ModalDescripAdmin";
import Carga from "../Carga";
import Prede from "../../prede.jpg";

const CardsAdmin = ({ filtro }) => {
  const [campers, setCampers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCard, setSelectedCard] = useState({});
  const [dotsCount, setDotsCount] = useState(3);
  const [filterChangeFlag, setFilterChangeFlag] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

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
  }, [filterChangeFlag]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setDotsCount((prevCount) => (prevCount === 0 ? 3 : prevCount - 1));
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const toggleModal = (id, title, description) => {
    setSelectedCard({ id, title, description });
  };

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
          camper.englishLevel.toLowerCase() === filtro.nivelIngles.toLowerCase()) &&
        (!filtro.seniority ||
          camper.seniority.toLowerCase() === filtro.seniority.toLowerCase())
      );
    });
  }, [campers, filtro]);

  useEffect(() => {
    setFilterChangeFlag((prev) => !prev);
  }, [filtro]);

  const DEFAULT_IMAGE_URL = Prede;

  const totalPages = Math.ceil(filteredCampers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCampers = filteredCampers.slice(startIndex, endIndex);

  return (
    <div key={key} className="card-container">
      {loading && <div className="cargaerror"></div>}
      {!loading && filteredCampers.length > 0 ? (
        currentCampers.map((camper, index) => (
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
          <Carga />
          <div className="textFilter">
            Houston no se encontró ningún camper {"".repeat(dotsCount)}
          </div>
        </div>
      )}
      {selectedCard.id && (
        <ModalDescripAdmin
          camperId={selectedCard.id}
          onClose={() => setSelectedCard({})}
        />
      )}
      {/* Paginación */}
      {filteredCampers.length > itemsPerPage && (
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <div className="separate">
              <button
                key={index + 1}
                onClick={() => setCurrentPage(index + 1)}
                className={currentPage === index + 1 ? "active" : ""}
              >
                {index + 1}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CardsAdmin;
