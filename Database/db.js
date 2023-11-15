import mongoose from 'mongoose'
mongoose.set('strictQuery', true);
import dotenv from 'dotenv';

dotenv.config()

const connection =async()=>{
    const URL=process.env.URL;;
    try{
        await mongoose.connect(URL,{useNewUrlParser:true}) 
        console.log("Database connected successfully");
    }
    catch(err){
       console.log("there is some error in connecting database",err.message);
    }
}

export default connection; 