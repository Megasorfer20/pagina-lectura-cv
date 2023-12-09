import { config } from "dotenv";
import express from "express";
import { conection } from "./database/dbconection.js";
import getsRouter from "./routes/gets.routes.js";

config();

export default class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.path = "/API";

    this.middlewares();
    this.routes();
    this.conections();
  }

  middlewares() {
    this.app.use(cors());
    this.app.use(express.json());
    this.app.use(express.static("public"));
  }

  routes() {
    this.app.use(this.path, getsRouter);
  }

  async conections() {
    await conection();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server Running on Port ${this.port}`);
    });
  }
}
