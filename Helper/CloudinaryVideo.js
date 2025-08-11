const cloudinary = require('../Config/cloudinary');
const fs = require('fs')

const uploadVideo = async(filepath) => {

    try {
        const result = await cloudinary.uploader.upload(filepath, {resource_type:'video'});
        fs.unlinkSync(filepath);

        return  {
            url : result.secure_url,
            publicId: result.public_id,
        }

    } catch(err) {
        throw new Error("Video upload faild"+err.message);
    }
}

module.exports= {
    uploadVideo
}