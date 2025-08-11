const { pdfHelper } = require("../Helper/cloudinaryPdf");
const PdfModel = require('../models/pdf')

const pdfController = async (req,res) => {

    try {
        if(!req.file) {
            return res.status({
                success:false,
                message:"need to upload the file"
            })
        }

        const { url, public_id } =  await pdfHelper(req.file.path);
        const newPDF = new PdfModel({
            url:url,
            public_id:public_id,
            uploadedBy:req.userInfo.userId
        });

        await newPDF.save();
        return res.status(201).json({
            success:true,
            message:'file stored successfully',
            pdf:newPDF
        })
    }

    catch(err) {
        return res.status(500).json({
            success:false,
            message:"Internal server error "+ err.message
        })
    }
}

module.exports = { pdfController };