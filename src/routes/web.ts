import { getPageLogin } from "controllers/auth/loginController";
import express, { Express } from "express";

const router = express.Router();

const webRoute = (app: Express) => {
    router.get("/login", getPageLogin);

    app.use("/", router);
};

export default webRoute;
