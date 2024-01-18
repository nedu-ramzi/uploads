import { Request, Response } from "express";
import { ApplicationError } from "../helpers/errors.helpers";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
// import ImageUpload from '../model/images.model';

export class FileController {
    async fileUpload(req: Request, res: Response) {
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            try {
                const uploader = async (path: string) => await cloudinary.uploader.upload(req.file.path);
            
                    const urls: any[] = [];
                    const files = req.files as Express.Multer.File[];

                    for (const file of files) {
                        const { path } = file;
                        const newPath = await uploader(path);
                        urls.push(newPath);
                        fs.unlinkSync(path);
                    }
                    // const image = await ImageUpload.create();

                    return res.status(201).json({
                        "success": true,
                        "message": "File uploaded Successfully",
                        "data": {
                            "upload": urls,

                        }
                    });

            } catch (error) {
                return res.status(error.code || 500).json({
                    "success": false,
                    "error": {
                        "message": error.message,
                        "code": error.code
                    }
                });
            }
        } else {
            throw new ApplicationError('File upload not found', 404);
        }
    }
}