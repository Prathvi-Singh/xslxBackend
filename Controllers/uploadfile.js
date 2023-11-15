import mongoose from 'mongoose';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';

import Data from '../Models/data.js'

export const uploadExcelFile=async(req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const jsonArray = [];
        const workBook = xlsx.readFile(req.file.path);
        const sheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(workSheet, { raw: true });

 
        for (const row of excelData) {
            try {
               
                const existingDocument = await Data.findOne({ Email: row.Email });
                if (existingDocument) {
                    continue;
                }
                const newData = new Data(row);
                await newData.save();
               
            } catch (error) {
                console.error(`Error inserting document with email ${row.Email}:`, error);
            }
        }
        
        res.status(200).json({message:"Successful"});
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"facing Error"});
    }
}