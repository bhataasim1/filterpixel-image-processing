import sharp from "sharp";
import path from "path";
import fs from "fs/promises";

type operations = {
  brightness?: number;
  saturation?: number;
  rotate?: number;
  crop?: { left: number; top: number; width: number; height: number };
};

export class ImageService {
  private readonly UPLOAD_DIR = path.join(__dirname, "..", "uploads");

  constructor() {
    this.ensureUploadDir();
  }

  private async ensureUploadDir() {
    try {
      await fs.access(this.UPLOAD_DIR);
    } catch {
      await fs.mkdir(this.UPLOAD_DIR, { recursive: true });
    }
  }

  async saveImage(file: Express.Multer.File): Promise<{ filePath: string }> {
    const fileName = `${Date.now()}-${file.originalname}`;
    const filePath = path.join(this.UPLOAD_DIR, fileName);
    await fs.writeFile(filePath, file.buffer);
    return { filePath };
  }

  async processImage(
    filePath: string,
    operations: operations
  ): Promise<{ preview: string }> {
    const image = sharp(filePath);

    if (operations.brightness) {
      image.modulate({ brightness: operations.brightness });
    }
    if (operations.saturation) {
      image.modulate({ saturation: operations.saturation });
    }
    if (operations.rotate) {
      image.rotate(operations.rotate);
    }
    if (operations.crop) {
      image.extract(operations.crop);
    }

    const previewBuffer = await image
      .resize(300)
      .jpeg({ quality: 60 })
      .toBuffer();

    return {
      preview: `data:image/jpeg;base64,${previewBuffer.toString("base64")}`,
    };
  }

  async getProcessedImage(filePath: string, format: string): Promise<Buffer> {
    try {
      const image = sharp(filePath);
      // console.log(image);
      if (format === "png") {
        return image.png().toBuffer();
      } else {
        return image.jpeg().toBuffer();
      }
    } catch (error) {
      throw new Error("Error in downloading image");
    }
  }
}
