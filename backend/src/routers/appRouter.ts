import express, { Request, Response } from "express";
import { pool } from "../utils/pg";
import jwt from "jsonwebtoken";
import { config } from "../config/config";

export const appRouter = express.Router();

appRouter.get("/", async (req: Request, res: Response) => {
  const accessToken = req.query.accessToken as string;
  const decoded = jwt.verify(accessToken, config.jwtSecret);
  console.log(decoded);
  const users = (await pool.query(`SELECT id,name,email,asset_url FROM users;`))
    .rows;
  return res.send({ message: users });
});
