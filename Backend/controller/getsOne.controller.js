import { ObjectId } from "mongodb";
import { conection, client } from "../database/dbconection.js";

export const getsOneControllers = async (req, res) => {
  try {
    const { colection, id } = req.params;

const idParse = new ObjectId(id)

    let data;

    switch (colection) {
      case "campers":
        data = await getCampers(idParse);
        break;
      case "camperDetail":
        data = await getCampersDetails(idParse);
        break;
      case "users":
        data = await getUsers(idParse);
        break;
      case "usersType":
        data = await getUsersType(idParse);
        break;
      case "programingLaguage":
        data = await getProgramingLanguage(idParse);
        break;
      default:
        data = { message: "Registro No Encontrado" };
        break;
    }

    res.json(data);
  } catch (error) {
    console.log(error);
    res.end(error);
  }
};

const getCampers = async (identifier) => {
  try {
    const campersDB = (await conection()).campers;
    const campers = await campersDB.find({ _id:identifier, status: true }).toArray();
    return campers;
  } catch (error) {
    return error;
  }
};

const getCampersDetails = async (identifier) => {
  try {
    const campersDetailDB = (await conection()).campersDetail;
    const campersDetail = await campersDetailDB.find({ _id:identifier, status: true }).toArray();
    return campersDetail;
  } catch (error) {
    return error;
  }
};

const getUsers = async (identifier) => {
  try {
    const usersDB = (await conection()).users;
    const users = await usersDB.find({ _id:identifier, status: true }).toArray();
    return users;
  } catch (error) {
    return error;
  }
};

const getUsersType = async (identifier) => {
  try {
    const usersTypeDB = (await conection()).usersType;
    const usersType = await usersTypeDB.find({ _id:identifier, status: true }).toArray();
    return usersType;
  } catch (error) {
    return error;
  }
};

const getProgramingLanguage = async (identifier) => {
  try {
    const programingLaguageDB = (await conection()).programingLaguage;
    const programingLaguage = await programingLaguageDB.find({ _id:identifier, status: true }).toArray();
    return programingLaguage;
  } catch (error) {
    return error;
  }
};
