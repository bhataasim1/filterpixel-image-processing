import { ImageService } from "../services/Image.service";
import { ProcessImageInputType } from "../types/types";
import { BaseController } from "./_Base.controller";
import { NextFunction, Request, Response } from "express";

export class ImageController extends BaseController {
  private imageService: ImageService;
  constructor() {
    super();
    this.imageService = new ImageService();
  }

  uploadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const file = req.file;
      // console.log(file);
      if (!file) {
        return this._sendResponse(res, "No file uploaded", 400);
      }

      const filePath = file.path;
      // console.log(filePath);
      this._sendResponse(res, "Image Uploaded Successfully", 200, { filePath });
    } catch (error) {
      next(error);
    }
  };

  processImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filePath, operations }: ProcessImageInputType = req.body;
      const result = await this.imageService.processImage(filePath, operations);
      // console.log(result);
      return this._sendResponse(res, "Image Processed Successfully", 200, {
        result,
      });
    } catch (error) {
      next(error);
    }
  };

  downloadImage = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { filePath, format } = req.query;
      const result = await this.imageService.getProcessedImage(
        filePath as string,
        format as string
      );
      // console.log(result);
      res.contentType(`${format}`);
      res.send(result);
    } catch (error) {
      next(error);
    }
  };
}
