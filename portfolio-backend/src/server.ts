import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";

import { env } from "./config/env.js";
import { ensureDbConnection } from "./db/index.js";
import { errorHandler } from "./middleware/error-handler.js";
import { notFoundHandler } from "./middleware/not-found.js";
import { publicRateLimiter } from "./middleware/rate-limit.js";
import apiRouter from "./routes/index.js";

const app = express();

app.disable("x-powered-by");

app.use(
  cors({
    origin: env.frontendOrigin,
    credentials: true,
  }),
);
app.use(helmet());
app.use(publicRateLimiter);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan(env.nodeEnv === "production" ? "combined" : "dev"));

ensureDbConnection();

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "Portfolio backend API",
  });
});

app.use("/api", apiRouter);

app.use(notFoundHandler);
app.use(errorHandler);

app.listen(env.port, () => {
  console.log(`Server running on port ${env.port}`);
});
