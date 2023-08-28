import * as dotenv from "dotenv";
dotenv.config();
interface Config {
  cloudinaryName: string;
  cloudinaryApiKey: string;
  cloudinaryApiSecret: string;
  jwtSecret: string;
}

export const config: Config = {
  cloudinaryName: process.env.CLOUDINARY_CLOUD_NAME || "",
  cloudinaryApiKey: process.env.CLOUDINARY_API_KEY || "",
  cloudinaryApiSecret: process.env.CLOUDINARY_API_SECRET || "",
  jwtSecret: process.env.JWT_SECRET || "",
};
