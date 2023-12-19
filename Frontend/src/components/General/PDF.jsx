import React from "react";
import jsPDF from "jspdf";

const PDF = ({ camperDetail, additionalDetails }) => {
  const generarPDF = () => {
    if (!camperDetail || Object.keys(camperDetail).length === 0) {
      console.error("No hay datos del Camper para generar el PDF.");
      return;
    }

    const pdf = new jsPDF();

    // Estilos en línea
    const titleStyle = { fontSize: 18, fontWeight: "bold", marginBottom: 5 };
    const detailStyle = { marginBottom: 5 };
    const listStyle = { marginLeft: 20, marginBottom: 5 };

    // Funciones para mejorar la legibilidad
    const addTitle = (text, x, y, style = {}) => {
      pdf.text(text, x, y, { ...titleStyle, ...style });
    };

    const addList = (items, x, y, style = {}) => {
      items.forEach((item, index) => {
        pdf.text(`- ${item}`, x, y + index * 10, { ...listStyle, ...style });
      });
    };

    // Título
    addTitle("Detalles del Camper", 80, 10);

    // Detalles generales
    const detailsBoxY = 20;
    const detailsBoxHeight = 7 * 9 + 9;
    pdf.setFillColor(255, 255, 255);
    pdf.setDrawColor(0, 0, 0);
    pdf.rect(15, detailsBoxY, 180, detailsBoxHeight, "FD");

    const details = [
      `Nombre: ${additionalDetails.name} ${additionalDetails.lastName}`,
      `Seniority: ${additionalDetails.seniority}`,
      `Tipo de programador: ${additionalDetails.programmerType}`,
      `Especialidad: ${additionalDetails.especiality}`,
      `Nivel de inglés: ${additionalDetails.englishLevel}`,
      `País: ${additionalDetails.locality}`,
      `Preferencia salarial: $${additionalDetails.salary}`,
    ];

    details.forEach((detail, index) => {
      pdf.text(detail, 20, detailsBoxY + 10 + index * 10, detailStyle);
    });

    // Agregar la foto en la esquina superior derecha (con margen)
    if (additionalDetails.photo) {
      const imgData = `data:image/png;base64, ${additionalDetails.photo}`;
      const imgWidth = 50;
      const imgHeight = 50;
      const margin = 10;
      const x = pdf.internal.pageSize.width - imgWidth - margin;
      const y = margin;
      pdf.addImage(imgData, "PNG", x, y, imgWidth, imgHeight);
    }

    // Tecnologías
    addTitle("Tecnologias:", 20, 100);
    if (additionalDetails.tecnologies && additionalDetails.tecnologies.length > 0) {
      addList(additionalDetails.tecnologies, 25, 110);
    }

    // Stack
    const stackX = pdf.internal.pageSize.width / 2;
    addTitle("Stack:", stackX, 100);
    if (camperDetail.stack && camperDetail.stack.length > 0) {
      addList(camperDetail.stack, stackX + 5, 110);
    }

    // Experiencia
    addTitle("Experiencia:", 20, 170);
    if (camperDetail.experiencie && camperDetail.experiencie.length > 0) {
      addList(camperDetail.experiencie, 25, 180);
    }

    // Soft Skills a la derecha
    const softSkillsX = pdf.internal.pageSize.width - 60;
    const softSkillsY = 165;
    addTitle("Soft Skills:", softSkillsX, softSkillsY - 10);
    if (camperDetail.softSkills && camperDetail.softSkills.length > 0) {
      addList(camperDetail.softSkills, softSkillsX + 5, softSkillsY);
    }

    // Biografía
    const biografiaTitleY = 230;
    const biografiaContentY = 240;
    addTitle("Biografía:", 20, biografiaTitleY);
    const maxWidth = 160;

    if (camperDetail.biography) {
      const lines = pdf.splitTextToSize(camperDetail.biography, maxWidth);
      const lineHeight = 10;
      let currentY = biografiaContentY;

      lines.forEach((line, index) => {
        if (currentY + lineHeight > pdf.internal.pageSize.height) {
          pdf.addPage();
          currentY = 20;
        }
        pdf.text(line, 20, currentY);
        currentY += lineHeight;
      });
    }

    pdf.save("camper_details.pdf");
  };

  return (
    <div>
      <button className="descraga" style={{ padding: 10, fontSize: 16 }} onClick={generarPDF}>
        Generar PDF
      </button>
    </div>
  );
};

export default PDF;
