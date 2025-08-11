const Image = require('../models/Image');
const { uploadeResult } = require('../Helper/cloudinaryHelper');

const uploadImage = async(req,res) => {
    try {

        if(!req.file) {
            return res.status(400).json({
                success:false,
                message:'No file uploaded'
            })
        }

        const { url, publicId } = await uploadeResult(req.file.path);

        const newImage = new Image({
            url:url,
            public_id:publicId,
            uploadedBy:req.userInfo.userId
        });

        await newImage.save();
        return res.status(201).json({
            success:true,
            message:'Image uploaded successfully',
            image:newImage
        })

    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

module.exports = {
    uploadImage
}