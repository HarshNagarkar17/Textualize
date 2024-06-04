import express from "express";
import { login, register } from "../controllers/top-level/auth";
import validateRequest from "../middlewares/validator";

const authRouter = express.Router();

authRouter.post("/register", validateRequest("auth"), register);
authRouter.post("/login", validateRequest("auth"), login);

export default authRouter;
