import express, { Request, Response } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { pool } from "../utils/pg";
export const feedRouter = express.Router();

feedRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { caption, usersId, photo_url } = req.body;
  const isValid = caption.length > 0 && usersId > 0;
  if (!isValid) return res.send(400);
  const newPost = (
    await pool.query(
      `INSERT INTO posts (caption,users_id) VALUES($1,$2) RETURNING *`,
      [caption, usersId]
    )
  ).rows[0];
  res.send({ result: newPost });
});
