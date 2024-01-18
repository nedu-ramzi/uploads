import { Request, Response, NextFunction } from 'express';
import { ApplicationError } from '../helpers/errors.helpers';
 
export const isFile = (req: Request, res: Response, next: NextFunction) => {
    if (!req.file) {
        throw new ApplicationError('Upload a Profile Image', 400);
    }
    next();
}