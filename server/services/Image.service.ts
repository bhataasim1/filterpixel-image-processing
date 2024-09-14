import sharp from "sharp";
import { operations } from "../types/types";

export class ImageService {
  private currentImageBuffer: Buffer | null = null;
  private highQualityImageBuffer: Buffer | null = null;
  constructor() {}

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

    this.currentImageBuffer = await image
      .resize(300)
      .jpeg({ quality: 40 })
      .toBuffer();

    this.highQualityImageBuffer = await image.jpeg({ quality: 100 }).toBuffer();

    return {
      preview: `data:image/jpeg;base64,${this.currentImageBuffer.toString(
        "base64"
      )}`,
    };
  }

  async getProcessedImage(format: string): Promise<Buffer> {
    if (!this.highQualityImageBuffer) {
      throw new Error("No processed image available");
    }
    try {
      const image = sharp(this.highQualityImageBuffer);
      // console.log(image);
      if (format === "png") {
        return image.png().toBuffer();
      } else {
        return image.jpeg({ quality: 100 }).toBuffer();
      }
    } catch (error) {
      throw new Error("Error in downloading image");
    }
  }
}
