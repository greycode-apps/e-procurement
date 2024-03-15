const multer = require('multer');
const path = require('path');

// Define the storage for uploaded files
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads')
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}.${file.originalname}`)
    }
})

// Create the Multer middleware
const upload = multer({
     storage: storage,
     })
module.exports = {upload}