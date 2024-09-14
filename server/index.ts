import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendApiResponseMiddleware } from "./middleware/apiResponse.middleware";
import { BaseEnvironment } from "./Environment";
import errorHandler from "./middleware/errorHandler.middleware";

dotenv.config();

const app: Application = express();
const env = new BaseEnvironment();

// Middleware
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(sendApiResponseMiddleware);
app.use(errorHandler);

app.get("/health-check", (req: Request, res: Response) => {
  return res.send("I am alive!");
});

app.listen(env.PORT, () => {
  console.log(`Server is running on ${env.HOST}:${env.PORT}`);
});
