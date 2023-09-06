import express, { Request, Response } from "express";
import { pool } from "../utils/pg";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { checkAuth } from "../middleware/checkAuth";

export const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  console.log(req.email);
  const users = (await pool.query(`SELECT id,name,email,asset_url FROM users;`))
    .rows;
  return res.send({ message: users });
});
