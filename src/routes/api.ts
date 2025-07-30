import { registerAPI } from "../controllers/auth/registerController";
import { loginAPI } from "../controllers/auth/loginController";
import express, { Express } from "express";

const router = express.Router();

const webRoute = (app: Express) => {
  router.post("/login", loginAPI);
  router.post("/register", registerAPI);

  app.use("/v1/api", router);
};

export default webRoute;
