import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';



const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});

const upload = multer({
    storage,
});


export default upload;
