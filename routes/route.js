import express from 'express';
import { uploadExcelFile } from '../Controllers/uploadfile.js';
import upload from '../Callback/upload.js'

const router= express();

router.post('/upload', upload.single("excelfile"), uploadExcelFile);


export default router;