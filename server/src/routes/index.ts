import { Application } from "express";
import authRouter from "./auth";
import userRouter from "./user";
import apiRouter from "./api";

export default function setupRoutes(app: Application) {
  app.use("/", userRouter);
  app.use("/auth", authRouter);
  app.use("/api",apiRouter)
}
