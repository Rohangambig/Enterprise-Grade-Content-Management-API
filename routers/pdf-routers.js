const express = require('express');
const path = require('path');
const {pdfController} = require('../controller/pdfController');
const multer = require('multer');
const router = express.Router();
const { authController } = require('../middleware/auth')

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'pdf/')
    },
    filename:function(req,file,cb) {
        cb(null,file.filename+'-'+Date.now()+path.extname(file.originalname));
    }
});

const fileFiler = (req,file,cb) => {
    if(file.mimetype.startsWith('application/pdf')) {
        cb(null,true)
    }
    else{
        cb(new Error('only pdf can be upload'))
    }
}

const upload = multer({
    storage:storage,
    fileFilter:fileFiler,
    limits: {
        fileSize:1024 * 1024 * 5
    }
})

router.post('/upload',authController,upload.single('pdf'),pdfController);

module.exports = router;