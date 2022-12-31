// Imports of all exertnal files
const express = require('express');
const router = express.Router();

const User = require("../models/User");
const { body, validationResult } = require('express-validator');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");
const JWT_SECRET = "sohel@230$70";

// till here import......


// Route 1: Craete User using POST without login.. /api/auth/createuser , No Login Required
router.post('/createuser' ,[
    body('name', "Your name is too short...").isLength({ min: 3 }),
    body('email', "Enter a valid email").isEmail(),
    body('password', "Your Password must contain atleast 6 characters").isLength({ min: 6 })
], async (req,res)=>{

    // If error occurs, return Bad req.
    const errors = validationResult(req);
    let success=false;
    if (!errors.isEmpty()) { // validator wali web se liya 
        return res.status(400).json({success, errors: errors.array() });
    }
    
    try{
    // Check user with same email exist or not.
    let user = await User.findOne({email : req.body.email});

    if(user){
        return res.status(400).json({success, error: "User with same email already exist."});
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
    const authtoken = jwt.sign(data , JWT_SECRET); // web jwt.io
    console.log(authtoken)
    success=true;
    res.json({success, authtoken});
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
    let success = false // to chk
    if (!errors.isEmpty()) { // validator wali web se liya 
        return res.status(400).json({ errors: errors.array() });
    }
    const{email , password} = req.body;

    try {
        let user = await User.findOne({email}); // check if entered email wala user exist or not 
        if(!user){
            return res.status(400).json({success , error: "Login with proper credientials."});
        }

        // compare entered password  with hash password
        const PasswordCompare = await bcrypt.compare(password , user.password); 
        

        if(!PasswordCompare){
            return res.status(400).json({success, error: "Login with proper credientials."});
        }

        
        const data = {
            user:{
                id: user.id
            }
        }
        const authtoken = jwt.sign(data , JWT_SECRET);
        console.log(authtoken)
        success = true;
        res.json({success , authtoken});

    } 
    catch(error){
        console.error(error.message);
        res.status(500).send("Internal server error");
    }
})




//Route 3: Get the logged in user Data using POST .. /api/auth/getuser.  Login Required
router.post('/getuser' ,fetchuser, async (req,res)=>{
    let success = false;
    try {
        userid = req.user.id;
        const user = await User.findById(userid).select("-password");
        success=true;
        res.send(success,user);
    }
    catch(error){
        console.error(error.message);
        res.status(500).send(success , "Internal server error");
    }
})




//Route 3: Delete the user  using DELETE .. /api/auth/deletetuser/:email.  Login Required

router.delete('/deleteuser/:email' ,fetchuser,[
    body('email', "Enter a valid email").exists(),
    body('password', "Password cannnot be remain empty").exists()
], async (req,res)=>{

    const{email } = req.params;

    try {
        let user = await User.findOne({email:email}); // check if entered email wala user exist or not 
        console.log(email);
        if(!user){
            return res.status(400).json({error: "Not exist."});
        }

        // compare entered password  with hash password

        // const PasswordCompare = await bcrypt.compare(password , user.password); 
        // console.log(password);
        // console.log(user.password);

        // if(!PasswordCompare){
        //     return res.status(400).json({error: "Enternn a valid password."});
        // }

        user = await User.findOneAndDelete({email:email});
        res.json({Sucess: "Deleted Successfully" , user: user });
        console.log("donen");
    }
    catch(error){
        console.error(error.message);
        res.status(500).send( "Internal server error");
    }
})

module.exports = router ;