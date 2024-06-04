import express from "express";
import applyMiddlewares from "./middlewares";
import dotenv from "dotenv";
import path from "path";

dotenv.config()
const app = express();

// setupNconf();
applyMiddlewares(app);

export default app;
