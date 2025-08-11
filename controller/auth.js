const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const registerUser = async(req,res) => {
    try {
        const {name,email,password} = req.body;
        const user = await User.findOne({$or:[{name:name},{email:email}]})

        if(user) {
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password,salt);

        const newUser = new User({
            name,
            email,
            password:hashPassword
        });

        await newUser.save();
        return res.status(201).json({
            success:true,
            message:'User registered successfully',
            user:newUser
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

const loginUser = async(req,res) => {
    try {

        const {email,password} = req.body;

        const user = await User.findOne({email:email});

        if(!user) {
            return res.status(400).json({
                success:false,
                messsage:'user does not exist'
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);
        if(!isMatch) 
            return res.status(400).json({
            success:false,
            message:'Invalid credentials'
        });

        // user authenticated token
        const token =  jwt.sign({
            userId:user._id,
            name:user.name,
            role:user.role
        }, process.env.JWT_SECRET, {
            expiresIn:'1hr'
        });

        return res.status(200).json({
            success:true,
            message:"User logged in successfully",
            token:token
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
    registerUser,
    loginUser
}