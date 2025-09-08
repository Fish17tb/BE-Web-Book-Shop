import express from "express";
import "dotenv/config";
import logger from "morgan";
import cors from "cors";
import * as path from "path";
import cookieParser from "cookie-parser";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import webRoute from "./routes/api";

// Create Express server
export const app = express();

// config cors
app.use(
  cors({
    origin: "http://localhost:3030", // domain frontend
    credentials: true, // cho phép gửi cookie / auth header
  })
);

// config req.body
app.use(express.urlencoded({ extended: true })); // để parse x-www-form-urlencoded
app.use(express.json()); // for json

// Express configuration
app.set("port", process.env.PORT || 8888);
// app.set("views", path.join(__dirname, "../views"));
// app.set("view engine", "pug");

app.use(logger("dev"));

app.use(cookieParser()); 

// Declare routes
webRoute(app);

app.use(express.static(path.join(__dirname, "../public")));

// app.use(errorNotFoundHandler);
// app.use(errorHandler);
