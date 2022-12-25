
const mongoose = require('mongoose');
const mongodbUri = "mongodb://localhost:27017/onlynotes";

const connectToDb=()=>{
    mongoose.connect(mongodbUri , ()=>{
        console.log('connected to db..');
    })
}

module.exports = connectToDb;