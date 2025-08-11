const { uploadVideo } = require('../Helper/CloudinaryVideo.js');
const Video = require('../models/video.js')

const uploadVideController = async(req,res) => {

    try {

        if(!req.file) {
            return res.status(400).json({
                success:false,
                message:"no file uploaded"
            })
        }

        const { url, publicId } = await uploadVideo(req.file.path);
        
        const newVideo = new Video({
            url,
            public_id:publicId,
            uploadedBy:req.userInfo.userId
        })

        await newVideo.save();

        return res.status(201).json({
            success:true,
            message:'video uploaded successfully',
            vide:newVideo
        })

    }
    catch(err) {
        return res.status(500).json({
            success:false,
            message:"Internal server error"
        })
    }
}

module.exports = {
    uploadVideController
}