import express from "express";
import multer from "multer";
import { ImageController } from "../controller/Image.controller";

const imageController = new ImageController();
const imageRouter = express.Router();

// Multer configuration...
const upload = multer({ storage: multer.memoryStorage() });

imageRouter.post(
  "/upload",
  upload.single("image"),
  imageController.uploadImage
);
imageRouter.post("/process", imageController.processImage);
imageRouter.get("/download", imageController.downloadImage);

export default imageRouter;
