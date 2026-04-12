import { NextFunction, Request, Response } from "express";

import { env } from "../config/env.js";
import { verifyAdminToken } from "../utils/jwt.js";

export const requireAdminAuth = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.[env.authCookieName] as string | undefined;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    const payload = verifyAdminToken(token);

    if (payload.role !== "admin" || payload.sub !== env.adminUsername) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized",
      });
    }

    return next();
  } catch {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }
};
