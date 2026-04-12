import { Router } from "express";

import { env } from "../config/env.js";
import { requireAdminAuth } from "../middleware/admin-auth.js";
import adminContentRouter from "./admin-content.js";
import adminUploadRouter from "./admin-upload.js";

const adminRouter = Router();

adminRouter.use(requireAdminAuth);

adminRouter.get("/me", (_req, res) => {
  return res.status(200).json({
    success: true,
    data: {
      username: env.adminUsername,
      role: "admin",
    },
  });
});

adminRouter.use("/content", adminContentRouter);
adminRouter.use("/upload", adminUploadRouter);

export default adminRouter;
