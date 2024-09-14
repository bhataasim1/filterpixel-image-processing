import { NextFunction, Request, Response } from "express";

export type ServerErrorResponse = {
  message: string;
  errors?: Record<string, string[]>;
};

export function sendApiResponseMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const originalSend = res.send;
  //@ts-ignore
  res.send = (apiResponse: any) => {
    if (apiResponse instanceof ApiResponse) {
      res.status(apiResponse.statusCode).json(apiResponse.body);
    } else {
      // If not an ApiResponse, just proceed with the default send
      return originalSend.call(res, apiResponse);
    }
  };

  next();
}

export class ApiResponse {
  constructor(
    public body: any,
    public statusCode = 200,
    public errors?: Record<string, string[]>
  ) {
    if (statusCode === 200 || statusCode === 201) {
      this.body = body;
    } else {
      this.body = {
        message: body,
        errors: errors,
      } as ServerErrorResponse;
    }
  }
}
