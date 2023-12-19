import { ObjectId } from "mongodb";
import { conection, client } from "../database/dbconection.js";

export const deleteControllers = async (req, res) => {
  try {
    const { colection, id } = req.params;
    const parsedId = new ObjectId(id);
    let message;

    switch (colection) {
      case "campers":
        message = await deleteCampers(parsedId);
        break;
      case "campersDetails":
        message = await deleteCampersDetails(parsedId);
        break;
      case "users":
        message = await deleteUsers(parsedId);
        break;
      case "usersType":
        message = await deleteUsersType(parsedId);
        break;
      case "programingLaguage":
        message = await deleteProgramingLanguage(parsedId);
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

const deleteCampers = async (identifier) => {
  try {
    const campersDB = (await conection()).campers;
    await campersDB.updateOne({ _id: identifier }, { $set: {status: false} });
    return { message: "camper actaulizado con éxito" };
  } catch (error) {
    console.error(error);
    return { message: "Error al imgresar el Camper" };
  }
};

const deleteCampersDetails = async (identifier) => {
  try {
    const campersDetailDB = (await conection()).campersDetails;
    await campersDetailDB.updateOne({ _id: identifier }, { $set: {status: false} });
    return { message: "camper actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const deleteUsers = async (identifier) => {
  try {
    const usersDB = (await conection()).users;
    await usersDB.updateOne({ _id: identifier }, { $set: {status: false} });
    return { message: "user actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const deleteUsersType = async (identifier) => {
  try {
    const usersTypeDB = (await conection()).usersType;
    await usersTypeDB.updateOne({ _id: identifier }, { $set: {status: false} });
    return { message: "tipo de Usuario actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};

const deleteProgramingLanguage = async (identifier) => {
  try {
    const programingLaguageDB = (await conection()).programingLaguage;
    await programingLaguageDB.updateOne({ _id: identifier }, { $set: {status: false} });
    return { message: "tecnología actaulizado con éxito" };
  } catch (error) {
    return error;
  }
};
