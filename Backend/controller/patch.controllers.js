import { ObjectId } from "mongodb";
import { conection, client } from "../database/dbconection.js";

export const updatesControllers = async (req, res) => {
  try {
    const { colection, id } = req.params;
    const parsedId = new ObjectId(id);
    const data = req.body;
    let message;

    switch (colection) {
      case "campers":
        message = await updateCampers(data, parsedId);
        break;
      case "camperDetail":
        message = await updateCampersDetails(data, parsedId);
        break;
      case "users":
        message = await updateUsers(data, parsedId);
        break;
      case "usersType":
        message = await updateUsersType(data, parsedId);
        break;
      case "programingLaguage":
        message = await updateProgramingLanguage(data, parsedId);
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

const updateCampers = async (dataEntered, identifier) => {
  try {
    const {
      name,
      seniority,
      especiality,
      tecnologies,
      position,
      locality,
      salary,
      englishLevel,
      photo,
    } = dataEntered;
    const data = {
      name,
      seniority,
      especiality,
      tecnologies,
      position,
      locality,
      salary,
      englishLevel,
      photo,
    };
    const campersDB = (await conection()).campers;
    await campersDB.updateOne({ _id: identifier }, { $set: data });
    return { message: "camper actaulizado con éxito" };
  } catch (error) {
    console.error(error);
    return { message: "Error al imgresar el Camper" };
  }
};

const updateCampersDetails = async (dataEntered, identifier) => {
  try {
    const { biography, stack, experiency } = dataEntered;
    const data = {
      biography,
      stack,
      experiency,
    };
    const campersDetailDB = (await conection()).campersDetails;
    await campersDetailDB.updateOne({ _id: identifier }, { $set: data });
    return { message: "camper actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const updateUsers = async (dataEntered, identifier) => {
  try {
    const { username, email } = dataEntered;
    const data = {
      username,
      email,
    };
    const usersDB = (await conection()).users;
    await usersDB.updateOne({ _id: identifier }, { $set: data });
    return { message: "user actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const updateUsersType = async (dataEntered, identifier) => {
  try {
    const { type, description } = dataEntered;
    const data = {
      type,
      description,
    };
    const usersTypeDB = (await conection()).usersType;
    await usersTypeDB.updateOne({ _id: identifier }, { $set: data });
    return { message: "tipo de Usuario actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const updateProgramingLanguage = async (dataEntered, identifier) => {
  try {
    const { technologyName, technologyDesccription } = dataEntered;
    const data = {
      technologyName,
      technologyDesccription,
    };
    const programingLaguageDB = (await conection()).programingLaguage;
    await programingLaguageDB.updateOne({ _id: identifier }, { $set: data });
    return { message: "tecnología actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};
