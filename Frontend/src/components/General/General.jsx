import React from "react";
import Logo from "../../logo-campus.png";
import "../css/General.css";

const General = () => {
  return (
    <div className="descrip">
      <div className="center">
        <h2 className="tituloGen">
          <span>Portafolio de Candidatos destacados</span>
        </h2>
      </div>
      <img className="logo" src={Logo} alt="Logo" />
      <p className="pe">
        Queremos acercarte algunos de nuestros mejores candidatos entrevistados.
        Por su experiencia, formación, actitud y disponibilidad entre otros
        factores, representan una excelente oportunidad para tu equipo. Te
        invitamos a conocerlos y que nos cuentes si pueden aportar valor a tu
        compañía.
      </p>
    </div>
  );
};

export default General;
