import express, { Application } from "express";
import passport from "passport";
import "../libs/setupPassport";
import corsMiddleware from "./cors";
import rateLimiterMiddleware from "./rateLimiter";
import path from "path";

export default function applyMiddlewares(app: Application) {

  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(corsMiddleware);
  app.use(rateLimiterMiddleware);
  app.use(passport.initialize());

  app.use("/images", express.static(path.join(__dirname, "../images")))
}
