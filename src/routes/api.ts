import { registerAPI } from "../controllers/auth/registerController";
import { createUserAPI, loginAPI } from "../controllers/auth/loginController";
import express, { Express } from "express";
import { getUserAPI } from "../controllers/userController";
import { checkValidJWT } from "../middlewares/JWT";
import { fetchAccountAPI } from "../controllers/auth/fetchAccount";
import { refreshTokenAPI } from "../controllers/refreshToken/refreshToken"; // 👈 path đúng

const router = express.Router();

const webRoute = (app: Express) => {
  // login & register & refresh: không check JWT
  router.post("/auth/login", loginAPI);
  router.post("/auth/register", registerAPI);
  router.post("/auth/refresh-token", refreshTokenAPI); 

  // Các route khác: có check JWT
  router.get("/users", checkValidJWT, getUserAPI);
  router.get("/users/create", checkValidJWT, createUserAPI);
  router.get("/account", checkValidJWT, fetchAccountAPI);

  app.use("/api/v1", router);
};

export default webRoute;
