import jwt from "jsonwebtoken";

import { env } from "../config/env.js";

type AdminJwtPayload = {
  sub: string;
  role: "admin";
};

const ADMIN_TOKEN_TTL_SECONDS = 60 * 60 * 8;

export const createAdminToken = (username: string) => {
  return jwt.sign({ role: "admin" }, env.jwtSecret, {
    subject: username,
    expiresIn: ADMIN_TOKEN_TTL_SECONDS,
  });
};

export const verifyAdminToken = (token: string): AdminJwtPayload => {
  const decoded = jwt.verify(token, env.jwtSecret);

  if (typeof decoded !== "object" || decoded === null) {
    throw new Error("Invalid token");
  }

  const sub = typeof decoded.sub === "string" ? decoded.sub : "";
  const role = decoded.role === "admin" ? "admin" : null;

  if (!sub || !role) {
    throw new Error("Invalid token payload");
  }

  return { sub, role };
};

export const adminCookieOptions = {
  httpOnly: true,
  secure: env.nodeEnv === "production",
  sameSite: "lax" as const,
  maxAge: ADMIN_TOKEN_TTL_SECONDS * 1000,
  path: "/",
};
