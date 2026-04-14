import dotenv from "dotenv";
import { z } from "zod";

import type { AppEnv } from "../types/env.js";

dotenv.config();

const envSchema = z.object({
  NODE_ENV: z
    .enum(["development", "test", "production"])
    .default("development"),
  PORT: z.coerce.number().int().positive().default(4000),
  DB_PATH: z.string().min(1).default("./data/portfolio.db"),
  FRONTEND_ORIGIN: z.string().min(1),
  ADMIN_USERNAME: z.string().min(1),
  ADMIN_PASSWORD_HASH: z.string().min(1),
  JWT_SECRET: z.string().min(16),
  AUTH_COOKIE_NAME: z.string().min(1).default("portfolio_admin_token"),
  CLOUDINARY_CLOUD_NAME: z.string().min(1),
  CLOUDINARY_API_KEY: z.string().min(1),
  CLOUDINARY_API_SECRET: z.string().min(1),
});

const parsedEnv = envSchema.safeParse(process.env);

if (!parsedEnv.success) {
  const issueText = parsedEnv.error.issues
    .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
    .join("\n");

  throw new Error(`Invalid environment variables:\n${issueText}`);
}

export const env: AppEnv = {
  nodeEnv: parsedEnv.data.NODE_ENV,
  port: parsedEnv.data.PORT,
  dbPath: parsedEnv.data.DB_PATH,
  frontendOrigin: parsedEnv.data.FRONTEND_ORIGIN,
  adminUsername: parsedEnv.data.ADMIN_USERNAME,
  adminPasswordHash: parsedEnv.data.ADMIN_PASSWORD_HASH,
  jwtSecret: parsedEnv.data.JWT_SECRET,
  authCookieName: parsedEnv.data.AUTH_COOKIE_NAME,
  cloudinaryCloudName: parsedEnv.data.CLOUDINARY_CLOUD_NAME,
  cloudinaryApiKey: parsedEnv.data.CLOUDINARY_API_KEY,
  cloudinaryApiSecret: parsedEnv.data.CLOUDINARY_API_SECRET,
};
