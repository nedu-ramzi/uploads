import {Request, Response, NextFunction} from 'express';

export class ApplicationError extends Error {
    constructor(message: string, statusCode: number) {
        super(message);
    }

}

export function errorHandler(err: Error, req: Request, res: Response, next: NextFunction) {
    res.status(500).json({
        success: false,
        error: {
            message: err.message,
            code: 500, 
        }
    });
}