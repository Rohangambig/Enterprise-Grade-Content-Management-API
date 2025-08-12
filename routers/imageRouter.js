const express = require('express');
const { authController } = require('../middleware/auth.js');
const { uploadImage, getImages, deleteImageById , pegination } =  require('../controller/imageController.js');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null,'uploads/')
    },
    filename:function(req,file,cb) {
        cb(null,file.filename+'-'+Date.now()+path.extname(file.originalname));
    }
});

const imageFilter = (req,file,cb) => {
    if(file.mimetype.startsWith('image/')) {
        cb(null,true);
    } else {
        cb(new Error('Only image files are allowed!'));
    }
}

const upload = multer({storage : storage ,
    fileFilter:imageFilter,
    limits: { fileSize: 1024 * 1024 * 5 } //
});
        


const router = express.Router();

router.post('/upload',authController, upload.single('image') ,uploadImage);
router.get('/get',getImages);
router.delete('/delete/:id',authController,deleteImageById);
router.get('/pegination',pegination);

module.exports = router;