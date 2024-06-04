import mongoose from "mongoose";
import { logger } from "./setupWinston";
import { config } from "../config/config";

const MONGO_URI = config.MONGO_URI;
if (!MONGO_URI) {
  logger.error("Mongo URI is not defined");
  process.exit(1);
}

mongoose
  .connect(MONGO_URI)
  .then(() => logger.info("DATABASE CONNECTED"))
  .catch((error) => logger.error(error));
