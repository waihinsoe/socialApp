import express, { Request, Response } from "express";
import { pool } from "../utils/pg";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
export const authRouter = express.Router();

authRouter.post("/register", async (req: Request, res: Response) => {
  const { name, email, password, imgUrl } = req.body;
  const isValid = name.length && email.length && password.length;
  if (!isValid) return res.sendStatus(400);
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (result.rows.length)
    return res.status(409).json({ message: "user is already exist" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUserResult = await pool.query(
    "INSERT INTO users (name,email,password,asset_url) VALUES($1,$2,$3,$4) RETURNING *",
    [name, email, hashedPassword, imgUrl]
  );

  const newUserRow = newUserResult.rows[0];
  const newUser = {
    id: newUserRow.id,
    name: newUserRow.name,
    email: newUserRow.email,
  };

  const accessToken = jwt.sign(newUser, config.jwtSecret);
  return res.send({ accessToken });
});

authRouter.post("/login", async (req: Request, res: Response) => {
  console.log(req.body);
  const { email, password } = req.body;
  const isValid = email.length && password.length;
  if (!isValid) return res.sendStatus(400);
  const result = await pool.query("SELECT * FROM users WHERE email=$1", [
    email,
  ]);
  if (!result.rows.length)
    return res.status(404).json({ message: "user doesn't exist" });

  const isPasswordValid = await bcrypt.compare(
    password,
    result.rows[0].password
  );
  if (!isPasswordValid)
    return res.status(401).json({ message: "wrong credentials" });

  const userInfo = {
    id: result.rows[0].id,
    name: result.rows[0].name,
    email: result.rows[0].email,
  };

  const accessToken = jwt.sign(userInfo, config.jwtSecret);
  return res.send({ accessToken });
});
