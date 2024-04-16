import multer from 'multer';
import DatauriParser from 'datauri/parser.js'; 
import path from 'path';

//storage
const storage = multer.memoryStorage();
// Define allowed formats
const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg'];

const multerUploads = multer({ storage }).single('image');
const dUri = new DatauriParser(); 

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };