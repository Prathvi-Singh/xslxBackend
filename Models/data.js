import mongoose from 'mongoose';

const dataSchema = mongoose.Schema({

    "Name of the Candidate": {
        type: String,
        required: true
    },
    "Email": {
        type: String,
        required: true ,
        unique:true
    },
    "Mobile No.": {
        type: String,
        required: true
    },
    "Date of Birth": {
        type: String,
        required: true
    },
    "Work Experience": {
        type: String,
        required: true
    },
    "Resume Title": {
        type: String,
        required: true
    },
    "Current Location": {
        type: String,
        required: true
    },
    "Postal Address": {
        type: String,
        required: true
    },
    "Current Employer": {
        type: String
       
    },
    "Current Designation": {
        type: String
       
    }


});

const Data = mongoose.model('Data', dataSchema);
export default Data; 