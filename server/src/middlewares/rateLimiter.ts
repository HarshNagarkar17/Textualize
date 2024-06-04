import Express from "express";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { logger } from "../libs/setupWinston";

const rateLimiter = new RateLimiterMemory({ points: 100, duration: 60 });

export default function rateLimiterMiddleware(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  const key = req.body.email;
  rateLimiter
    .consume(key)
    .then(() => {
      next();
    })
    .catch(() => {
      logger.error("Too many requests from this IP, request blocked.");
      res.status(429).json({
        message: "Too many requests, please try again later.",
      });
    });
}
