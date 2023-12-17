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
      text: `Hola Estimado Camper ${newUserName},

es de nuestro agrado informar que tu CV ha sido añadido a nuestra página, para estár al tanto de sus actualizaciones o pedir cambios a tu usuario te reccomendamos iniciar sesión en nuestra página (URL DE LA PÁGINA)

Las claves de inicio de sesión a usar son las siguientes:

        - Usuario: ${newUserEMail}
        - Contraseña: ${newUserPassword}
`,
      html: "<p>Zuluaga, debes hacer el front de esto XD</p><br/><p>Debes pasar el menasje de arriba a HTML y luego borras el de arriba</p>",
    });
  } catch (error) {
    console.log(error);
  }
};
