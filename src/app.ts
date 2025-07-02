import express from "express";
import "dotenv/config";
import logger from "morgan";
import * as path from "path";

import { errorHandler, errorNotFoundHandler } from "./middlewares/errorHandler";

// Routes
import webRoute from "./routes/api";

// Create Express server
export const app = express();

// Express configuration
app.set("port", process.env.PORT || 8888);
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

app.use(logger("dev"));

// Declare routes
webRoute(app);

app.use(express.static(path.join(__dirname, "../public")));

app.use(errorNotFoundHandler);
app.use(errorHandler);
