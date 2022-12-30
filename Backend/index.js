const connectToDb = require("./db");
const express = require('express');
var cors = require('cors');


connectToDb();
const app = express()
const port = 5000

app.use(cors())
app.get('/', (req, res) => {
    res.send('Hello login!')
})

app.use(express.json());


// For Authentication...
app.use("/api/auth" , require("./routes/auth"));
app.use("/api/notes" , require("./routes/notes"));

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})