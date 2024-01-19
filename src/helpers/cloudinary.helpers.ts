import { v2 as cloudinary } from "cloudinary";
import { config } from "config/main.config";

config.cloudinary;

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