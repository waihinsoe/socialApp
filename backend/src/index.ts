import express, { Request, Response } from "express";

const app = express();
const port = 5000;

app.get("/", (req: Request, res: Response) => {
  res.send("helloworld");
});

app.listen(port, () => {
  console.log("app is listening at port ", port);
});
