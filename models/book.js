const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,'Book title is required'],
        trim:true,
        maxLegth:[100,'Book title cannot be more than  100 character']
    },
    author:{
        type:String,
        required:[true,'author name is required'],
        trim:true,
    },
    year:{
        type:Number,
        required:[true,'publication year is required'],
        min:[1000,'year atleast must be 1000'],
        max:[new Date().getFullYear(),'Year cannot be in the future']
    },
    cratedAt:{
        type:Date,
        default:Date.now
    }
})


module.exports = mongoose.model('Book',bookSchema);