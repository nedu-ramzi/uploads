import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../helpers/errors.helpers';
 
export const isFile = (req: Request, res: Response, next: NextFunction) => {
    console.log("Log files",req.file || req.files)
    if (!req.file) {
        throw new ApplicationError('Upload an Image', 400);
    }
    next();
}