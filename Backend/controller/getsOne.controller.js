import { conection, client } from "../database/dbconection.js";

export const getsOneControllers = async (req, res) => {
  try {
    const { colection, id } = req.params;

    let data;

    switch (colection) {
      case "campers":
        data = getCampers(id);
        break;
      case "camperDetail":
        data = getCampersDetails(id);
        break;
      case "users":
        data = getUsers(id);
        break;
      case "usersType":
        data = getUsersType(id);
        break;
      case "programingLaguage":
        data = getProgramingLanguage(id);
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

const getCampers = async () => {
  try {
    const campersDB = (await conection()).campers;
    const campers = await campersDB.find({ status: true }).toArray();
    return campers;
  } catch (error) {
    return error;
  }
};

const getCampersDetails = async () => {
  try {
    const campersDetailDB = (await conection()).campersDetail;
    const campersDetail = await campersDetailDB.find({ status: true }).toArray();
    return campersDetail;
  } catch (error) {
    return error;
  }
};

const getUsers = async () => {
  try {
    const usersDB = (await conection()).users;
    const users = await usersDB.find({ status: true }).toArray();
    return users;
  } catch (error) {
    return error;
  }
};

const getUsersType = async () => {
  try {
    const usersTypeDB = (await conection()).usersType;
    const usersType = await usersTypeDB.find({ status: true }).toArray();
    return usersType;
  } catch (error) {
    return error;
  }
};

const getProgramingLanguage = async () => {
  try {
    const programingLaguageDB = (await conection()).programingLaguage;
    const programingLaguage = await programingLaguageDB.find({ status: true }).toArray();
    return programingLaguage;
  } catch (error) {
    return error;
  }
};