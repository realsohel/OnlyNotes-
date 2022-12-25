const express = require('express');
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const JWT_SECRET = "sohel@230$70";


// Craete User using POST without login.. /api/auth/createuser
router.post('/createuser' ,[
    body('name', "Your name is too short...").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Your Password must contain atleast 6 characters").isLength({ min: 6 })
], async (req,res)=>{

    // If error occurs, return Bad req.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // validator wali web se liya 
        return res.status(400).json({ errors: errors.array() });
    }
    

    try{

    
    // Check user with same email exist or not.
    let user = await User.findOne({email : req.body.email});

    if(user){
        return res.status(400).json({error: "User with same email already exist."});
    }

    const salt = await bcrypt.genSaltSync(10);
    const secPass = await bcrypt.hashSync(req.body.password , salt);
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass,
        })
    
    const data = {
        user:{
            id: user.id
        }
    }
    const authtoken = jwt.sign(data , JWT_SECRET);
    console.log(authtoken)
    res.json({authtoken});
    // console.log(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Glitched occurs");
    }
})

module.exports = router ;