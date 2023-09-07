import express, { Request, Response } from "express";
import { pool } from "../utils/pg";
import jwt from "jsonwebtoken";
import { config } from "../config/config";
import { checkAuth } from "../middleware/checkAuth";

export const appRouter = express.Router();

appRouter.get("/", checkAuth, async (req: Request, res: Response) => {
  //@ts-ignore
  const ownerEmail: string = req.email;
  const owner = (
    await pool.query(
      `SELECT id,name,email,asset_url FROM users where email=$1;`,
      [ownerEmail]
    )
  ).rows[0];
  const users = (await pool.query(`SELECT id,name,email,asset_url FROM users;`))
    .rows;

  const posts = (await pool.query(`SELECT * FROM posts;`)).rows;
  const comments = (await pool.query(`SELECT * FROM comments;`)).rows;
  const likes = (await pool.query("SELECT * FROM likes;")).rows;
  const replys = (await pool.query("SELECT * FROM replys;")).rows;
  const shares = (await pool.query("SELECT * FROM shares;")).rows;
  const friendRequests = (await pool.query("SELECT * FROM friend_requests;"))
    .rows;
  return res.send({
    owner,
    users,
    posts,
    likes,
    comments,
    replys,
    shares,
    friendRequests,
  });
});
