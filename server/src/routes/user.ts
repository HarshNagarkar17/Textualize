import express from "express";
import passportHandler from "../middlewares/passport";

const userRouter = express.Router();

userRouter.post("/dashboard");

userRouter.get("/", passportHandler, async (req, res) => {
  res.send("page");
});
export default userRouter;
