import express from "express";
import { upload } from "../middleware/multer";
import { v2 as cloudinary } from "cloudinary";
import { config } from "../config/config";
cloudinary.config({
  cloud_name: config.cloudinaryName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});
export const assetsRouter = express.Router();

assetsRouter.post("/", upload.single("file"), async (req, res) => {
  // Get the image file from the request
  const imageFile = req.file;
  if (!imageFile) return res.send(400);
  cloudinary.uploader.upload(imageFile.path, function (err, result) {
    if (err) {
      console.log(err);
      return res.status(500).json({
        success: false,
        message: "Error",
      });
    }
    res.status(200).json({
      success: true,
      message: "Uploaded!",
      data: result?.secure_url,
    });
  });
});
