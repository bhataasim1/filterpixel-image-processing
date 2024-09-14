import express, { Application, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import { sendApiResponseMiddleware } from "./middleware/apiResponse.middleware";
import { BaseEnvironment } from "./Environment";
import errorHandler from "./middleware/errorHandler.middleware";
import imageRouter from "./routes/image.routes";
import path from "path";

dotenv.config();

class App {
  public app: Application;
  private env: BaseEnvironment;

  constructor() {
    this.app = express();
    this.env = new BaseEnvironment();

    this.initializeMiddlewares();
    this.initializeRoutes();

    //temporarily serve uploaded images
    this.app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
  }

  private initializeMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(cors());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(sendApiResponseMiddleware);
    this.app.use(errorHandler);
  }

  private initializeRoutes(): void {
    this.app.use("/api/image", imageRouter);
    this.app.get("/health-check", (req: Request, res: Response) => {
      return res.send("I am alive!");
    });
  }

  public listen(): void {
    this.app.listen(this.env.PORT, () => {
      console.log(`Server is running on ${this.env.HOST}:${this.env.PORT}`);
    });
  }
}

export default App;
