import mongoose from 'mongoose';
import multer from 'multer';
import xlsx from 'xlsx';
import fs from 'fs';
import async from 'async';


import Data from '../Models/data.js'


const iteratorFunction = async(entry) => {
    try {
     
        const existingDocument = await Data.findOne({ Email: entry.Email });
        if (!existingDocument)  {
            const newData = new Data(entry);
            await newData.save();
        }

    } catch (error) {
        console.error(`Error during iteration: ${error}`);
        throw error;
    }
}

function callback(err){
        if (err) {
            console.error('Error in async.eachSeries:', err);
        } else {
            console.log('All Entries completed successfully.');
        }
}

export const uploadExcelFile=async(req, res) => {
    try {
        
        if (!req.file) {
            return res.status(400).send('No file uploaded.');
        }

        const jsonArray = [];
        const workBook = xlsx.readFile(req.file.path);
        const sheetName = workBook.SheetNames[0];
        const workSheet = workBook.Sheets[sheetName];
        var excelData = xlsx.utils.sheet_to_json(workSheet, { raw: true });
    
        await async.eachSeries(excelData,iteratorFunction,callback ); 
       
        res.status(200).json({message:'successful'});
        
       
       
    } catch (error) {
        console.error(error);
        return res.status(500).json({message:"facing Error"});
    }
}
