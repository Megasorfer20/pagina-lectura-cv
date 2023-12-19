import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

export const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMPASSWORD,
  },
});

transporter.verify().then(() => {
  console.log("ready for send emails");
});

export const trasporterFunction = async (
  newUserEMail,
  newUserName,
  newUserPassword
) => {
  try {
    await transporter.sendMail({
      from: `"CampusLans Admins 💻" <${process.env.EMAIL}>`,
      to: newUserEMail,
      subject: "Bienvenido a nuestra plataforma de CV",
      html: `<h3>Hola Estimado Camper ${newUserName},</h3><br/>
      <p>Es de nuestro agrado informar que tu CV ha sido añadido a nuestra página, para estár al tanto de sus actualizaciones o pedir cambios a tu usuario te reccomendamos iniciar sesión en nuestra página http://localhost:3000</p>

      <br/>
      <p>Las claves de inicio de sesión a usar son las siguientes:</p>

<br/>
<ul>
        <li> Usuario: ${newUserEMail} </li>
        <li> Contraseña: ${newUserPassword} </li>
        </ul>
      `,
    });
  } catch (error) {
    console.log(error);
  }
};

export const chechInfoFunction = async (data) => {
  try {
    const idCamper = String(data.camperId);

    const response = await fetch(
      `http://localhost:5000/API/campers/${idCamper}`
    );
    const info = await response.json();

    await transporter.sendMail({
      from: `"${data.name} de ${data.enterprise}" <${process.env.EMAIL}>`,
      to: process.env.EMAIL,
      subject: "Nueva solicitud de información de Camper",
      html: `<h3>Hemos recibido una nueva solicitud para saber más información sobre el camper ${info[0].name} ${info[0].lastName}, </h3><br/>
      <p>
El señor/a ${data.name} representante de la empresa ${data.enterprise} le ha llamado la atención las habilidades del Camper ${info[0].name} ${info[0].lastName} y les gustaría tener más informacion sobre él.</p><br/>

<p>Su email de contacto es <strong>${data.email}</strong> y su número telefónico <strong>${data.phonePreposition} ${data.phoneNum}</strong>. </p>  <br/>

<p>Los detalles de la consulta que que se ha solicitado es el siguiente:</p> <br/>

<p>${data.description}
      </p>`,
    });

    console.log("Seguda verificacion tipo mensaje");
  } catch (error) {
    console.log(error);
  }
};
