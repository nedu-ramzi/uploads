import multer from 'multer';
import { Request } from 'express';

const FILE_TYPE_MAP = {
    'image/png': 'png',
    'image/jpeg': 'jpeg',
    'image/jpg': 'jpg',
    'image/gif': 'gif'
}

const storage = multer.diskStorage({
    destination: function async(req: Request, file: Request['file'], cb: Function) {
        cb(null, './public/upload')
    },
    filename: function async(req: Request, file: Request['file'], cb: Function) {
        const fileName = file.originalname.split(' ').join('-');
        const extension = FILE_TYPE_MAP[file.mimetype as keyof typeof FILE_TYPE_MAP];
        cb(null, `${fileName}-${Date.now()}.${extension}`);
    }
})

const fileFilter = (req: Request, file: Express.Multer.File, cb: (error: Error | null, acceptFile: boolean) => void) => {
    if (file.mimetype in FILE_TYPE_MAP){
        cb(null, true);
    }else{
        cb(new Error('Unsupported file format'), false)
    }
}
export const upload = multer({
    storage: storage,
    limits: { fileSize: 1024 * 1024 * 5 },//5mb
    fileFilter: fileFilter
});