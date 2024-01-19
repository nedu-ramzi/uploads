import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../helpers/errors.helpers';
 
export const isFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.files) {
        throw new ApplicationError('Upload an Image', 400);
    }
    next();
}