const express = require('express');
const router = express.Router();

router.get('/' , (req,res)=>{
    obj = {
        a: "sohel",
        num: 90
    };

    res.json(obj);
})

module.exports =router;