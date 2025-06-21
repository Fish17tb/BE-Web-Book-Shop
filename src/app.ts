import express from "express";
import "dotenv/config";
import dotenv from "dotenv";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Load .env file
dotenv.config({ path: path.resolve(__dirname, "../.env") });

// Routes
import webRoute from "./routes/web";
// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 8080);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

// Declare routes
webRoute(app);

app.use(express.static(path.join(__dirname, "../public")));

app.use(errorNotFoundHandler);
app.use(errorHandler);
