import multer from 'multer';
import DatauriParser from 'datauri/parser.js'; 
import path from 'path';

// Storage configuration
const storage = multer.memoryStorage();

// Define allowed formats
const allowedFormats = ['image/png', 'image/jpg', 'image/jpeg'];

// Define a file filter function to accept only specific image formats
const fileFilter = (req, file, cb) => {
  if (allowedFormats.includes(file.mimetype)) {
    // Accept the file
    cb(null, true);
  } else {
    // Reject the file
    cb(new Error('Only PNG, JPG, and JPEG files are allowed!'), false);
  }
};

// Update multerUploads to use the fileFilter
const multerUploads = multer({ storage, fileFilter }).single('image'); // Corrected field name 'image'

const dUri = new DatauriParser();

/**
* @description This function converts the buffer to data url
* @param {Object} req containing the field object
* @returns {String} The data url from the string buffer
*/
const dataUri = req => dUri.format(path.extname(req.file.originalname).toString(), req.file.buffer);

export { multerUploads, dataUri };