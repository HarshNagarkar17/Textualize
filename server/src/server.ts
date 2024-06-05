import express from "express";
import applyMiddlewares from "./middlewares";
import dotenv from "dotenv";
import setupNconf from "./libs/setUpNconf";

dotenv.config()
const app = express();

setupNconf();
applyMiddlewares(app);

export default app;
