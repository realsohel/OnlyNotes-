const connectToDb = require("./db");
const express = require('express')

connectToDb();

const app = express()
const port = 3000

app.get('/', (req, res) => {
    res.send('Hello people!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})