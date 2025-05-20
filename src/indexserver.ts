import express from "express";
import { Express, Request, Response, NextFunction } from "express";
import { setRequestId } from "../server/middlewares";

const app: Express = express();
const port = 3000;

app.use(setRequestId);

app.get("/home", (req: Request, res: Response, next: NextFunction) => {
  res.send("HOME");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
