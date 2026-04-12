import { Router } from "express";
import { z } from "zod";

import { env } from "../config/env.js";
import { authRateLimiter } from "../middleware/rate-limit.js";
import { createAdminToken, adminCookieOptions } from "../utils/jwt.js";
import { verifyPassword } from "../utils/password.js";

const adminAuthRouter = Router();

const loginBodySchema = z.object({
  username: z.string().trim().min(1),
  password: z.string().min(1),
});

adminAuthRouter.post("/login", authRateLimiter, async (req, res, next) => {
  try {
    const parsed = loginBodySchema.safeParse(req.body);

    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        message: "Invalid login payload",
      });
    }

    const isUsernameMatch = parsed.data.username === env.adminUsername;
    const isPasswordMatch = await verifyPassword(
      parsed.data.password,
      env.adminPasswordHash,
    );

    if (!isUsernameMatch || !isPasswordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid credentials",
      });
    }

    const token = createAdminToken(env.adminUsername);

    res.cookie(env.authCookieName, token, adminCookieOptions);

    return res.status(200).json({
      success: true,
      message: "Login successful",
    });
  } catch (error) {
    return next(error);
  }
});

adminAuthRouter.post("/logout", (_req, res) => {
  res.clearCookie(env.authCookieName, {
    ...adminCookieOptions,
    maxAge: undefined,
  });

  return res.status(200).json({
    success: true,
    message: "Logout successful",
  });
});

export default adminAuthRouter;
