import express, { Request, Response } from "express";
import { assetsRouter } from "./routers/assetsRouter";
import * as dotenv from "dotenv";
import cors from "cors";
dotenv.config();
const app = express();
const port = 5000;
app.use(express.json());
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("helloworld");
});

app.use("/assets", assetsRouter);

app.listen(port, () => {
  console.log("app is listening at port ", port);
});
