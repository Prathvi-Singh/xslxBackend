import express from 'express';
import connection from './Database/db.js';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import cors from 'cors';
import Router from './routes/route.js'
import dotenv from 'dotenv';


const app = express();
const PORT = 8000 || process.env.PORT;;

app.use(cors());

app.use('/',Router);

dotenv.config()

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

connection(URL);