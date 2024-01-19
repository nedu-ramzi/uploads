import { Router } from "express";
import { isFile } from '../middleware/file.middleware';
import { upload } from '../helpers/multer.helper'
import { FileController } from '../controller/file.controller';

const fileController = new FileController();

export default (router: Router) => {
    router.post('/upload', upload.array('image'), isFile, fileController.fileUpload);
    router.get('/image', fileController.getAllFile);

    router.get('/image/:id', fileController.getFileById);
    router.delete('/image/:id', fileController.deleteFileById);
}