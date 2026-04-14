import { Router } from "express";

import adminRouter from "./admin.js";
import adminAuthRouter from "./admin-auth.js";
import healthRouter from "./health.js";
import publicRouter from "./public.js";

const apiRouter = Router();

apiRouter.use("/", healthRouter);
apiRouter.use("/public", publicRouter);
apiRouter.use("/admin", adminAuthRouter);
apiRouter.use("/admin", adminRouter);

export default apiRouter;
