import Express from "express";

export default function corsMiddleware(
  req: Express.Request,
  res: Express.Response,
  next: Express.NextFunction
) {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "OPTIONS,GET,POST,PUT,HEAD,DELETE",
    "Access-Control-Allow-Headers":
      "Authorization,Content-Type,Accept,Content-Encoding,X-Requested-With,x-api-user,x-api-key,x-client",
    "Access-Control-Expose-Headers":
      "X-RateLimit-Limit,X-RateLimit-Remaining,X-RateLimit-Reset,Retry-After",
  });

  return next();
}
