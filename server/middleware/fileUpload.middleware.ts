import { Request } from "express";
import multer from "multer";
import { BaseEnvironment } from "../Environment";
import fs from "fs";

const env = new BaseEnvironment();

const allowedTypes: string[] = ["image/png", "image/jpg", "image/jpeg"];

const ensureUploadDir = (dir: string) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
};

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    ensureUploadDir(env.UPLOAD_DIR);
    cb(null, env.UPLOAD_DIR);
  },
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}-${file.originalname}`;
    cb(null, fileName);
  },
});

const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) => {
  if (!allowedTypes.includes(file.mimetype)) {
    return cb(new Error("Invalid file type"));
  }
  cb(null, true);
};

export const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024,
  },
});
