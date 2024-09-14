import { Response } from "express";
import { ApiResponse } from "../middleware/apiResponse.middleware";

export class BaseController {
  constructor() {}

  async _sendResponse(
    res: Response,
    message: string,
    statusCode = 200,
    data = {}
  ) {
    return res
      .status(statusCode)
      .send(new ApiResponse({ message, ...data }, statusCode));
  }

  async _sendError(res: Response, error: any) {
    console.error(error);
    return res
      .status(500)
      .send(new ApiResponse({ message: "Something Went Wrong" }, 500));
  }
}
