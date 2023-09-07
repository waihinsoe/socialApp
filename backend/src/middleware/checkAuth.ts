import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const checkAuth = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers["authorization"];
  const accessToken = authHeader?.split(" ")[1];
  if (!accessToken) return res.sendStatus(401);
  const user = jwt.verify(accessToken, config.jwtSecret);
  //@ts-ignore
  req["email"] = user.email;

  next();
};
