const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,'Name is required'],
        trim:true,
        unique:[true,'Name must be unique']
    },
    email:{
        type:String,
        required:[true,"Email is required"],
        unique:[true,"Email must be unique"],
        trim:true,
        lowercase:true
    },
    password:{
        type:String,
        require:[true,"Password must be needed"],
        trime:true
    },
    role:{
        type:String,
        enum:['user','admin'],
        default:'user'
    }
},{timestamps:true});

module.exports = mongoose.model('User',userSchema);