import express from "express";
import { ImageController } from "../controller/Image.controller";
import { upload } from "../middleware/fileUpload.middleware";

const imageController = new ImageController();
const imageRouter = express.Router();

imageRouter.post(
  "/upload",
  upload.single("image"),
  imageController.uploadImage
);
imageRouter.post("/process", imageController.processImage);
imageRouter.get("/download", imageController.downloadImage);

export default imageRouter;
