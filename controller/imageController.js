const Image = require('../models/Image');
const { uploadeResult } = require('../Helper/cloudinaryHelper');
const cloudinary = require('../Config/cloudinary')

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

const getImages = async(req,res) => {

    try {

        const allImages = await Image.find();

        if(!allImages) {
            return res.status(401).json({
                success:false,
                message:'no imag found'
            })
        }

        return res.status(201).json({
            success:false,
            message:'image fetched successfully',
            image:allImages
        })

    }catch(err) {
         return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

const deleteImageById = async (req,res) => {
    try {

        const imageId = req.params.id;

        const findImage = await Image.findById(imageId);
        if(!findImage) {
            return res.status(401).json({
                success:false,
                message:'image not found'
            })
        }

        if(findImage.uploadedBy.toString() !== req.userInfo.userId) {
            return res.status(403).json({
                success:false,
                message:'unauthorized user for deleting the image'
            })
        }

        await cloudinary.uploader.destroy(findImage.public_id);
        await Image.findByIdAndDelete(findImage._id)

        return res.status(201).json({
            success:true,
            message:'image deleted successfully',
            deletedImage:findImage
        })

    }catch(err) {
         return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        })
    }
}

const pegination = async(req,res) => {

    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 1;
        const skip = ( page - 1) * limit;

        const allImages = await Image.find().skip(skip).limit(limit).sort({ createdAt: - 1 });
        const totalImage = await Image.countDocuments();

        if(allImages.length === 0) {
            return res.status(401).json({
                success:false,
                message:'no imag found'
            })
        }

        return res.status(200).json({
            success:true,
            page:page,
            limit:limit,
            totalPage:Math.ceil(totalImage / limit),
            totalImage,
            image:allImages
        })
        

    }catch(err) {
         return res.status(500).json({
            success:false,
            message:"Internal server error",
            error:err.message
        });
    }
}

module.exports = {
    uploadImage,
    getImages,
    deleteImageById,
    pegination
}