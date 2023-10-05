import express, { Request, Response } from "express";
import { checkAuth } from "../middleware/checkAuth";
import { pool } from "../utils/pg";
export const feedRouter = express.Router();

feedRouter.post("/", checkAuth, async (req: Request, res: Response) => {
  const { caption, users_id, photo_url } = req.body;
  // const isValid = caption.length > 0 && users_id > 0;
  // if (!isValid) return res.send(400);
  const newPost = (
    await pool.query(
      `INSERT INTO posts (caption,users_id,photo_url) VALUES($1,$2,$3) RETURNING *`,
      ["new Post", users_id, photo_url]
    )
  ).rows[0];
  res.send({ result: newPost });
});
