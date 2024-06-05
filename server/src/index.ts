import http from "http";
import { logger } from "./libs/setupWinston";
import setupRoutes from "./routes";
import app from "./server";
import "./libs/setupMongoose";
import nconf from "nconf";

const server = http.createServer();

server.on("request", app);

const PORT = nconf.get("PORT")

if (!PORT) {
  logger.error("port is not defined");
  process.exit(1);
}

app.set("port", PORT);

setupRoutes(app);

app.listen(PORT, () => {
  logger.info(`[server]: server started http://localhost:${PORT}`);
});
