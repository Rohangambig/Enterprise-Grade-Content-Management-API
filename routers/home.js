const express = require('express');
const  { authController } = require('../middleware/auth.js');
const router = express.Router();

router.get('/home',authController,(req,res) => {
    
    // allow only admin can able to acces this page
    if(req.userInfo.role !== 'admin') {
        return res.status(403).json({
            success: false,
            message: "Access denied, you are not authorized to view this page"
        });
    }

    res.status(200).json({
        success: true,
        message: "Welcome to the Book Store API"
    });
});

module.exports = router;