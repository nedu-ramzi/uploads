import { v2 as cloudinary } from "cloudinary";
import { config as dotenv } from 'dotenv';
dotenv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

export async function uploads(file: string) {
    const result = await cloudinary.uploader.upload(file, { folder: "Test", resource_type: "auto" });

    return result;
}