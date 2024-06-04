import Express from "express";
import { validator } from "./validator";

export default function validateRequest(schemaName: string) {
  return (
    req: Express.Request,
    res: Express.Response,
    next: Express.NextFunction
  ) => {
    const { value, error } = validator(schemaName, req.body);
    console.log({body:req.body})
    if (error) {
      return res.status(400).json({ errors: error });
    }

    req.body = value;
    next();
  };
}
