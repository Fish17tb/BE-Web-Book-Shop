import { registerAPI } from "../controllers/auth/registerController";
import { createUserAPI, loginAPI } from "../controllers/auth/loginController";
import express, { Express } from "express";
import { getUserAPI } from "../controllers/userController";
import { checkValidJWT } from "../middlewares/JWT";
import { fetchAccountAPI } from "../controllers/auth/fetchAccount";

const router = express.Router();

const webRoute = (app: Express) => {
  router.get("/users", getUserAPI);
  router.get("/users", createUserAPI);

  router.post("/login", loginAPI);
  router.post("/register", registerAPI);

  router.get("/account", fetchAccountAPI);

  app.use("/v1/api", checkValidJWT, router);
};

export default webRoute;
