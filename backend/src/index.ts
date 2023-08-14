import express, { Request, Response } from "express";
import { assetsRouter } from "./routers/assetsRouter";
import * as dotenv from "dotenv";
import cors from "cors";
import { pool } from "./utils/pg";
dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const query = `
CREATE TABLE IF NOT EXISTS likes (
  id SERIAL PRIMARY KEY,
  users_id INTEGER REFERENCES users (id),
  posts_id INTEGER REFERENCES posts (id),
  isLike boolean not null default false,
  createdAt timestamp not null default now(),
  updatedAt timestamp not null default now()
  );
  CREATE TABLE IF NOT EXISTS comments (
    id SERIAL PRIMARY KEY,
    users_id INTEGER REFERENCES users (id),
    posts_id INTEGER REFERENCES posts (id),
    content TEXT not null,
    createdAt timestamp not null default now(),
    updatedAt timestamp not null default now()
    );
    CREATE TABLE IF NOT EXISTS repleys (
      id SERIAL PRIMARY KEY,
      users_id INTEGER REFERENCES users (id),
      comments_id INTEGER REFERENCES comments (id),
      content TEXT not null,
      createdAt timestamp not null default now(),
      updatedAt timestamp not null default now()
      );
      CREATE TABLE IF NOT EXISTS shares (
        id SERIAL PRIMARY KEY,
        users_id INTEGER REFERENCES users (id),
        posts_id INTEGER REFERENCES posts (id),
        caption TEXT  null,
        createdAt timestamp not null default now(),
        updatedAt timestamp not null default now()
        );
`;
  const result = pool.query(query);
  res.send("helloworld");
});

app.use("/assets", assetsRouter);

app.listen(port, () => {
  console.log("app is listening at port ", port);
});
