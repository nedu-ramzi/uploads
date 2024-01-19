import { Router } from "express";
import file from './fileRoute';

const router = Router();

export default (): Router =>{
    file(router);

    return router;
}