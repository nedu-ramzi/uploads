import { Router } from "express";
import file from './file';

const router = Router();

export default (): Router =>{
    file(router);

    return router;
}