const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    url: {
        type:String,
        required:true,
    },
    public_id: {
        type:String,
        required:true,
    },
    uploadedBy: {
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    }
} , {timestamps: true});

module.exports = mongoose.model('Video',videoSchema);