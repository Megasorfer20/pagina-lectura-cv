import { MongoClient } from "mongodb";
import { config } from "dotenv";

config();

const url1 = process.env.MONGO_URI;
const url2 = process.env.MONGO_URI2;
const dbkey = process.env.DBKEY;
const user = process.env.USUARIO;
const password = process.env.PASSWORD;
const cluster = process.env.CLUSTER;

const client = new MongoClient(`${url1}${user}:${password}@${cluster}${url2}/`);

const conection = async () => {
  try {
    await client.connect();
    const db = await client.db(dbkey);
    const colections = {
      campers: db.collection("campers"),
      campersDetails: db.collection("campersDetails"),
      programingLaguage: db.collection("programingLaguages"),
      usersType: db.collection("usersTypes"),
      users: db.collection("users"),
    };
    console.log(`Conección exitosa`);
    return colections;
  } catch (error) {
    console.log(error);
    throw new Error(`No se puede conectar a la database`);
  }
};

export { conection, client };
