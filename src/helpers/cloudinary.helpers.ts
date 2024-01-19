import { v2 as cloudinary } from "cloudinary";
import { config as dotenv } from 'dotenv';
dotenv();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET,
})

exports.uploads = (file: string, folder:string) => {
    return new Promise((resolve, reject) => {
        cloudinary.uploader.upload(file, {
            resource_type: "auto",
            folder: folder
        }, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve({
                    url: result.url,
                    id: result.public_id
                });
            }
        });
    });
};