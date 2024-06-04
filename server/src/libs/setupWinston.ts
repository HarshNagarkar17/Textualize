import winston from "winston";

const { combine, colorize, printf, timestamp } = winston.format;

export const logger = winston.createLogger({
  level: "info",
  format: combine(
    colorize({ all: true }),
    timestamp({ format: "YYYY-MM-DD-hh:mm:ss A" }),
    printf((info) => `${info.timestamp} [${info.level}]: ${info.message} `)
  ),
  transports: [new winston.transports.Console()],
});
