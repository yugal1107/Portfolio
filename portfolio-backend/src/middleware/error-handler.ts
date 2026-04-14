import { NextFunction, Request, Response } from "express";

type AppError = Error & {
  statusCode?: number;
};

export const errorHandler = (
  err: AppError,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => {
  const statusCode = err.statusCode ?? 500;

  res.status(statusCode).json({
    success: false,
    message: err.message || "Internal server error",
  });
};
