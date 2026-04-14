import { Router } from "express";
import multer from "multer";

import { cloudinary } from "../config/cloudinary.js";

const adminUploadRouter = Router();

const upload = multer({
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 8 * 1024 * 1024,
  },
});

adminUploadRouter.post(
  "/file",
  upload.single("file"),
  async (req, res, next) => {
    try {
      const file = req.file;
      if (!file) {
        return res.status(400).json({
          success: false,
          message: "No file uploaded",
        });
      }

      const folder = typeof req.body?.folder === "string" ? req.body.folder : "portfolio";
      const publicIdPrefix =
        typeof req.body?.publicIdPrefix === "string" ? req.body.publicIdPrefix : "asset";
      const format = typeof req.body?.format === "string" ? req.body.format : undefined;

      const dataUri = `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;

      const resourceType = file.mimetype.startsWith("image/") ? "image" : "raw";

      const uploaded = await cloudinary.uploader.upload(dataUri, {
        folder,
        public_id: `${publicIdPrefix}-${Date.now()}`,
        resource_type: resourceType,
        format,
      });

      return res.status(201).json({
        success: true,
        data: {
          url: uploaded.secure_url,
          optimizedUrl: uploaded.secure_url.replace(
            "/upload/",
            "/upload/f_auto,q_auto/",
          ),
          publicId: uploaded.public_id,
          resourceType: uploaded.resource_type,
          format: uploaded.format,
          bytes: uploaded.bytes,
          originalFilename: uploaded.original_filename,
        },
      });
    } catch (error) {
      return next(error);
    }
  },
);

export default adminUploadRouter;
