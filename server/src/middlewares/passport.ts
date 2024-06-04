import Express from "express";
import passport from "passport";

export default function passportHandler(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  passport.authenticate(
    "jwt",
    { session: false },
    (error: any, user: any, info: any) => {
      if (error || !user) {
        return res.status(400).json({
          message: "auth token missing or expired",
          user: user,
        });
      }

      next();
    }
  )(req, res, next);
}
