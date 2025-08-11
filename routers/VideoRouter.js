const express = require('express');
const multer = require('multer');
const path = require('path');
const {uploadVideController} = require('../controller/VideoController.js');
const { authController } = require('../middleware/auth.js');


const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'videoUploads/')
    },
    filename:function(req,file,cb) {
        cb(null,+Date.now()+path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize:1024* 1024 * 1024* 1024 * 5
    }
});

const router =  express.Router();

router.post('/upload', authController,upload.single('video'), uploadVideController);

module.exports = router;