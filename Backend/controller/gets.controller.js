import { conection, client } from "../database/dbconection.js";

export const getsControllers = async (req, res) => {
  try {
    const { colection } = req.params;

    switch (colection) {
      case "campers":
        const campers = getCampers();
        res.json(campers);
        break;
      case "users":
        break;
      default:
        break;
    }
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
