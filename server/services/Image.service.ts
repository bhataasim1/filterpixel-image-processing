import sharp from "sharp";
import { operations } from "../types/types";

export class ImageService {
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
