import bcryptjs from "bcryptjs";
import { conection, client } from "../database/dbconection.js";
import { generatePassword } from "../recurses/passwordGenerator.js";

export const postsControllers = async (req, res) => {
  try {
    const { colection } = req.params;
    const data = req.body;
    let message;

    switch (colection) {
      case "campers":
        message = await postCampers(data);
        break;
      case "camperDetail":
        message = await postCampersDetails(data);
        break;
      case "users":
        message = await postUsers(data);
        break;
      case "usersType":
        message = await postUsersType(data);
        break;
      case "programingLaguage":
        message = await postProgramingLanguage(data);
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
      submitedBy,
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
      submitedBy,
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
    const { biography, stack, experiencie,softSkills } = dataEntered;
    const data = {
      biography,
      stack,
      experiencie,
      softSkills,
      status: true,
    };
    const campersDetailDB = (await conection()).campersDetail;
    await campersDetailDB.insertOne(data);
    return { message: "camper ingresado con éxito" };
  } catch (error) {
    return error;
  }
};

const postUsers = async (dataEntered) => {
  try {
    const { username, email, usertype } = dataEntered;

    const password = generatePassword(10) 

    const salt = bcryptjs.genSaltSync()

    const newGenPass = bcryptjs.hashSync(password,salt)

    await trasporterFunction('sbstzuluaga@gmail.com', "Sebastian Zuluaga","SoyUnaContraseñaSegura");
    data = {message: "El correo se envio exitosamente"}

    const data = {
      username,
      email,
      password: newGenPass,
      usertype,
      status: true,
    };
    const usersDB = (await conection()).users;
    const newUser = await usersDB.insertOne(data);
    //return { message: "user ingresado con éxito" };
    return newUser;
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
    const usersTypeDB = (await conection()).usersType;
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
