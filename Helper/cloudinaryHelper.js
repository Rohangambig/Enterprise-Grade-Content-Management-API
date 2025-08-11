const cloudinary = require('../Config/cloudinary');
const fs = require('fs');

const uploadeResult = async(filePath) => {
    try {

        const result = await cloudinary.uploader.upload(filePath);

        fs.unlinkSync(filePath)

        return {
            url:result.secure_url,
            publicId:result.public_id,
        }

    }catch(err) {
        console.error("Error uploading to Cloudinary:", err);
        throw new Error("Cloudinary upload failed");
    }
}

module.exports = {
    uploadeResult
}