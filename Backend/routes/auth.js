const express = require('express');
const router = express.Router();

const User = require("../models/User");


// Craete User using POST ..
router.post('/' , (req,res)=>{
    console.log(req.body)

    const user = User(req.body);
    user.save();
    res.send("hello");
})

module.exports = router ;