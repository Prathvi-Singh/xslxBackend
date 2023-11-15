import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';



const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploads");
    },
    filename: (req, file, callback) => {
        callback(null, file.originalname);
    }
});

const upload = multer({
    storage,
});


export default upload;
