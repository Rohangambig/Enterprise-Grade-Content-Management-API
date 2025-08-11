const cloudinary =  require('../Config/cloudinary');
const fs = require('fs')

const pdfHelper = async(filepath) => {

    try {

        const result = await cloudinary.uploader.upload(filepath, { resource_type : 'raw' });

        fs.unlinkSync(filepath);

        return {
            url : result.secure_url,
            public_id:result.public_id
        }

    }

    catch(err) {
        throw new Error("Error storing in cloudinary "+err.message)
    }
}

module.exports = { pdfHelper };