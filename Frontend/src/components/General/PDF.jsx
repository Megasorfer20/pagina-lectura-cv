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

    // Título
    pdf.text("Detalles del Camper", 80, 10, titleStyle);

    // Detalles generales
    const detailsBoxY = 20;
    const detailsBoxHeight = 7 * 9 + 9; // 7 detalles con altura de línea de 10 y 10 de margen superior
    pdf.setFillColor(255, 255, 255); // Color blanco para el fondo
    pdf.setDrawColor(0, 0, 0); // Color negro para el borde
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
    pdf.text("Tecnologias:", 20, 100);
    if (
      additionalDetails.tecnologies &&
      additionalDetails.tecnologies.length > 0
    ) {
      additionalDetails.tecnologies.forEach((tech, index) => {
        pdf.text(`- ${tech}`, 25, 110 + index * 10, listStyle);
      });
    }

    // Stack
    const stackX = pdf.internal.pageSize.width / 2;
    pdf.text("Stack:", stackX, 100, titleStyle);
    if (camperDetail.stack && camperDetail.stack.length > 0) {
      camperDetail.stack.forEach((item, index) => {
        pdf.text(`- ${item}`, stackX + 5, 110 + index * 10, listStyle);
      });
    }

    // Experiencia
    pdf.text("Experiencia:", 20, 170);
    if (camperDetail.experiencie && camperDetail.experiencie.length > 0) {
      camperDetail.experiencie.forEach((item, index) => {
        pdf.text(`- ${item}`, 25, 180 + index * 10, listStyle);
      });
    }

    // Soft Skills a la derecha
    const softSkillsX = pdf.internal.pageSize.width - 60;
    const softSkillsY = 165;
    pdf.text("Soft Skills:", softSkillsX, softSkillsY - 10, titleStyle);
    if (camperDetail.softSkills && camperDetail.softSkills.length > 0) {
      camperDetail.softSkills.forEach((item, index) => {
        pdf.text(
          `- ${item}`,
          softSkillsX + 5,
          softSkillsY + index * 10,
          listStyle
        );
      });
    }

    // Biografía
    const biografiaTitleY = 215;
    const biografiaContentY = 225;
    pdf.text("Biografía:", 20, biografiaTitleY);
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

    // Guardar el PDF con un nombre específico
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
