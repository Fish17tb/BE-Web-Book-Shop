import { registerAPI } from "../controllers/auth/registerController";
import { handleloginAPI, loginAPI } from "../controllers/auth/loginController";
import express, { Express } from "express";

const router = express.Router();

const webRoute = (app: Express) => {
  router.get("/login", loginAPI);
  router.post("/login", handleloginAPI);
  router.post("/register", registerAPI);

  app.use("/v1/api", router);
};

export default webRoute;
