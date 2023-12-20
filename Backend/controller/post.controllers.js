import bcryptjs from "bcryptjs";
import { conection, client } from "../database/dbconection.js";
import { generatePassword } from "../recurses/passwordGenerator.js";
import { ObjectId } from "mongodb";
import { chechInfoFunction, trasporterFunction } from "../recurses/mailer.js";

export const postsControllers = async (req, res) => {
  try {
    const { colection } = req.params;
    const data = req.body;

    console.log(data);

    let message;

    switch (colection) {
      case "campers":
        message = await postCampers(data);
        break;
      case "campersDetails":
        message = await postCampersDetails(data);
        break;
      case "users":
        message = await postUsers(data);
        await trasporterFunction(
          message.email,
          message.username,
          message.password
        );
        message = message.message;
        break;
      case "usersTypes":
        message = await postUsersType(data);
        break;
      case "programingLaguage":
        message = await postProgramingLanguage(data);
        break;
      case "reqMoreInfo":
        message = await postReqMoreInfo(data);
        break;
      default:
        message = { message: "Registro No Encontrado" };
        break;
    }

    res.json(message);
  } catch (error) {
    console.log(error);
    res.end(error);
  }
};

const postCampers = async (dataEntered) => {
  try {
    const {
      name,
      lastName,
      seniority,
      programmerType,
      especiality,
      tecnologies,
      locality,
      salary,
      englishLevel,
      photo,
    } = dataEntered;
    const data = {
      name,
      lastName,
      seniority,
      programmerType,
      especiality,
      tecnologies,
      locality,
      salary,
      englishLevel,
      photo,
      status: true,
    };
    const campersDB = (await conection()).campers;
    await campersDB.insertOne(data);
    return { message: "camper ingresado con éxito" };
  } catch (error) {
    console.error(error);
    return { message: "Error al imgresar el Camper" };
  }
};

const postCampersDetails = async (dataEntered) => {
  try {
    const { camper, biography, stack, experiencie, softSkills } = dataEntered;

    const parsedCamperid = new ObjectId(camper);

    const data = {
      camper: parsedCamperid,
      biography,
      stack,
      experiencie,
      softSkills,
      status: true,
    };
    const campersDetailDB = (await conection()).campersDetails;
    await campersDetailDB.insertOne(data);
    return { message: "camper ingresado con éxito" };
  } catch (error) {
    return error;
  }
};

const postUsers = async (dataEntered) => {
  try {
    const { username, email, usertype } = dataEntered;

    const password = generatePassword(10);
    console.log(password);
    const salt = bcryptjs.genSaltSync();
    const newGenPass = bcryptjs.hashSync(password, salt);
    console.log(newGenPass);

    const parsedUT = new ObjectId(usertype);

    const data = {
      username,
      email,
      password: newGenPass,
      usertype: parsedUT,
      status: true,
    };
    console.log(data);

    const usersDB = (await conection()).users;
    await usersDB.insertOne(data);

    return {
      message: "user ingresado con éxito",
      username: String(data.username),
      email: String(data.email),
      password: String(password),
    };
  } catch (error) {
    return error;
  }
};

const postUsersType = async (dataEntered) => {
  try {
    const { type, description } = dataEntered;
    const data = {
      type,
      description,
      status: true,
    };
    const usersTypeDB = (await conection()).usersTypes;
    await usersTypeDB.insertOne(data);
    return { message: "tipo de Usuario ingresado con éxito" };
  } catch (error) {
    return error;
  }
};

const postProgramingLanguage = async (dataEntered) => {
  try {
    const { technologyName, technologyDesccription } = dataEntered;
    const data = {
      technologyName,
      technologyDesccription,
      status: true,
    };
    const programingLaguageDB = (await conection()).programingLaguage;
    await programingLaguageDB.insertOne(data);
    return { message: "tecnología ingresada con éxito" };
  } catch (error) {
    return error;
  }
};

const postReqMoreInfo = async (dataEntered) => {
  try {
    const {
      name,
      enterprise,
      phonePreposition,
      phoneNum,
      email,
      description,
      camperId,
    } = dataEntered;

    const parsedCamperId = new ObjectId(camperId);
    const data = {
      name,
      enterprise,
      phonePreposition,
      phoneNum,
      email,
      description,
      tittle: "Solicitud de Información de Camper",
      type: `El usuario ${name}  de la empresa ${enterprise} ha solicitado información sobre un camper`,
      camperId: parsedCamperId,
      read: false,
      status: true,
    };

    console.log(data);
    const notificationsDB = (await conection()).notifications;
    await notificationsDB.insertOne(data);
    await chechInfoFunction(data);
    console.log("Mensaje Enviasdo con exito");
    return { message: "Notificacion ingresado con éxito" };
  } catch (error) {
    return error;
  }
};
