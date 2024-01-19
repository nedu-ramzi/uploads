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

                const image = await ImageUpload.create({ imageUrl: urls.map(file => file.secure_url) });
                    
                    return res.status(201).json({
                        "success": true,
                        "message": "File uploaded Successfully",
                        "data": {
                            "upload": urls,
                            "image": image
                        }
                    });

            } catch (error) {
                return res.status(500).json({
                    "success": false,
                    "error": {
                        "msg": "Error uploading file",
                        "message": error
                    }
                });
            }
        } else {
            throw new ApplicationError('File upload not found', 404);
        }
    }

    // get file uploaded
    async getAllFile(req: Request, res: Response){
        try {
            const imageUrl = await ImageUpload.find();
            if (!imageUrl) {
                throw new ApplicationError('Image not found', 404);
            }
            return res.status(200).json({
                "success": true,
                "message": "File fetched Successfully",
                "data": {
                    "Image Url": imageUrl
                }
            })
        } catch (error) {
            return res.status(500).json({
                "success": false,
                "error": {
                    "msg": "Error fetchiing all file",
                    "error": error,
                }
            });
        }
    }

    // get a file uploaded by id
    async getFileById(req: Request, res: Response) {
        try {
            const id = req.params.id
            const imageUrl = await ImageUpload.findById(id);
            if (!imageUrl) {
                throw new ApplicationError('Image not found', 404);
            }
            return res.status(200).json({
                "success": true,
                "message": "File fetched Successfully by it url",
                "data": {
                    "Image Url": imageUrl
                }
            })
        } catch (error) {
            return res.status(500).json({
                "success": false,
                "error": {
                    "msg": "Error fetching file by id",
                    "error": error
                }
            });
        }
    }

    //Delete file by it ID
    async deleteFileById(req: Request, res: Response){
        try {
            const id = req.params.id
            const imageUrl = await ImageUpload.findByIdAndDelete(id);
            if (!imageUrl) {
                throw new ApplicationError('Image not found', 404);
            }
            return res.status(200).json({
                "success": true,
                "message": "File deleted Successfully",
                "data": {
                    "Image Url": imageUrl
                }
            })
        } catch (error) {
            return res.status(500).json({
                "success": false,
                "error": {
                    "message": error,
                }
            });
        }
    }
}