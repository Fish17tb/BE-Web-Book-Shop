import {handleloginAPI, loginAPI } from "../controllers/auth/loginController";
import express, { Express } from "express";

const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/login", loginAPI);
    router.post("/login", handleloginAPI);


    app.use("/api", router);
};

export default webRoute;
