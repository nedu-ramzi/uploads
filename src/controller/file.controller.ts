import { Request, Response } from "express";
import { ApplicationError } from "../helpers/errors.helpers";
import { v2 as cloudinary } from "cloudinary";
import fs from 'fs';
import {ImageUpload} from '../model/images.model';

export class FileController {
    async fileUpload(req: Request, res: Response) {
        if (req.files && Array.isArray(req.files) && req.files.length > 0) {
            try {
                const uploader = async (path: string) => await cloudinary.uploader.upload(path);
            
                const files = req.files as Express.Multer.File[];

                const uploadPromises = files.map(async (file) => {
                    const { path } = file;
                    const newPath = await uploader(path);
                    fs.unlinkSync(path);
                    return newPath;
                });

                const urls = await Promise.all(uploadPromises);

                const image = await ImageUpload.create({ imageUrl: urls });
                    
                    return res.status(201).json({
                        "success": true,
                        "message": "File uploaded Successfully",
                        "data": {
                            "upload": urls,
                            "image": image
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

    // get file uploaded
    // async getFile(req: Request, res: Response){
    //     try {
    //         const image = await ImageUpload.findOne({imageUrl});
    //         if (!image) {
    //             throw new ApplicationError('Image not found', 404);
    //         }
    //         return res.status(200).json({
    //             "success": true,
    //             "message": "File fetched Successfully",
    //             "data": {
    //                 "image": image
    //             }
    //         })
    //     } catch (error) {
    //         return res.status(error.code || 500).json({
    //             "success": false,
    //             "error": {
    //                 "message": error.message,
    //                 "code": error.code
    //             }
    //         });
    //     }
    // }
}