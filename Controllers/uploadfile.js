import mongoose from 'mongoose';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';

import Data from '../Models/data.js'

export const uploadExcelFile=async(req, res) => {
    try {
        const jsonArray = [];
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const excelData = xlsx.utils.sheet_to_json(worksheet, { raw: false });

 
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
        
        res.status(200).json(excelData);
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"facing Error"});
    }
}