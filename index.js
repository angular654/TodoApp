const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = 'mongodb+srv://VlAdmin:22w99i@cluster0-pcusn.mongodb.net/ToDoApp'
const PORT = process.env.PORT || 4000
const app = express()
const multer = require("multer");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(multer({ storage: storage }).single("file"))
app.use('/api/todos',require('./routes/router')) 
async function start() {
    try {
        await mongoose.connect(db, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Server has been started on port: ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()