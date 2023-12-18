import { ObjectId } from "mongodb";
import { conection, client } from "../database/dbconection.js";

export const getsOneControllers = async (req, res) => {
  try {
    const { colection, id } = req.params;

    const idParse = new ObjectId(id);

    let data;

    switch (colection) {
      case "campers":
        data = await getCampers(idParse);
        break;
      case "camperDetail":
        data = await getCampersDetails(idParse);
        break;
      case "campersDetailsbyCamper":
        data = await getCampersDetailsbyCamperId(idParse);
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
    const campers = await campersDB
      .findOne({ _id: identifier, status: true })
      .toArray();
    return campers;
  } catch (error) {
    return error;
  }
};

const getCampersDetails = async (identifier) => {
  try {
    const campersDetailDB = (await conection()).campersDetails;
    const campersDetail = await campersDetailDB
      .findOne({ _id: identifier, status: true })
      .toArray();
    return campersDetail;
  } catch (error) {
    return error;
  }
};

const getCampersDetailsbyCamperId = async (identifier) => {
  try {
    const campersDetailDB = (await conection()).campersDetails;
    const campersDetail = await campersDetailDB
      .findOne({ camper: identifier, status: true })
      .toArray();
    return campersDetail;
  } catch (error) {
    return error;
  }
};

const getUsers = async (identifier) => {
  try {
    const usersDB = (await conection()).users;
    const users = await usersDB
      .findOne({ _id: identifier, status: true })
      .toArray();
    return users;
  } catch (error) {
    return error;
  }
};

const getUsersType = async (identifier) => {
  try {
    const usersTypeDB = (await conection()).usersType;
    const usersType = await usersTypeDB
      .findOne({ _id: identifier, status: true })
      .toArray();
    return usersType;
  } catch (error) {
    return error;
  }
};

const getProgramingLanguage = async (identifier) => {
  try {
    const programingLaguageDB = (await conection()).programingLaguage;
    const programingLaguage = await programingLaguageDB
      .findOne({ _id: identifier, status: true })
      .toArray();
    return programingLaguage;
  } catch (error) {
    return error;
  }
};
