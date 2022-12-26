const express = require('express');
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "sohel@230$70";


// Route 1: Craete User using POST without login.. /api/auth/createuser , No Login Required
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
        res.status(500).send("Internal server error");
    }
})





//Route 2:   Authenticate user Login using POST without login.. /api/auth/login. No Login Required
router.post('/login' ,[
    body('email', "Enter a valid email").isEmail(),
    body('password', "Password cannnot be remain empty").exists()
], async (req,res)=>{

    // If error occurs, return Bad req.
    const errors = validationResult(req);
    if (!errors.isEmpty()) { // validator wali web se liya 
        return res.status(400).json({ errors: errors.array() });
    }
    const{email , password} = req.body;

    try {
        let user = await User.findOne({email}); // check if entered email wala user exist or not 
        if(!user){
            return res.status(400).json({error: "Login with proper credientials."});
        }

        // compare entered password  with hash password
        const PasswordCompare = await bcrypt.compare(password , user.password); 

        if(!PasswordCompare){
            return res.status(400).json({error: "Login with proper credientials."});
        }

        
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        console.log(authtoken)
        res.json({authtoken});

    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




//Route 3: Get user Data using POST .. /api/auth/getuser.  Login Required
router.post('/getuser' ,fetchuser, async (req,res)=>{

    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password")
        res.send(user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})

module.exports = router ;