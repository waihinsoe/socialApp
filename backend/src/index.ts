import express, { Request, Response } from "express";
import { assetsRouter } from "./routers/assetsRouter";
import * as dotenv from "dotenv";
import cors from "cors";
import { pool } from "./utils/pg";
import { authRouter } from "./routers/authRouter";
import { appRouter } from "./routers/appRouter";
dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", async (req: Request, res: Response) => {
  const query = `

  CREATE TABLE IF NOT EXISTS friend_requests (
    id SERIAL PRIMARY KEY,
    sender_id INTEGER REFERENCES users (id),
    receiver_id INTEGER REFERENCES users (id),
    status friend_request_status,
    createdAt timestamp not null default now(),
    updatedAt timestamp not null default now()
    );
`;
  const result = await pool.query(query);
  res.send(result.rows[0]);
});

app.use("/assets", assetsRouter);
app.use("/auth", authRouter);
app.use("/app", appRouter);

app.listen(port, () => {
  console.log("app is listening at port ", port);
});
