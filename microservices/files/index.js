const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const File = require('./model/File');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();
const PORT = process.env.PORT || 5050;
const app = express();
const fileUpload = require('express-fileupload');
app.use(express.static('./uploads'));
app.use(fileUpload());
app.use(cors());
const fs = require('fs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
const host =  "http://localhost:5050" 
app.use('/files/:id/', (req, res, next) => {
    try {
        jwt.verify(req.params.id, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        console.log(err)
    }
})
app.post('/files/:id/upload', async (req,res) => {
    const myFile = req.files.file;
    const file = new File({
        name: myFile.name,
        size: myFile.size,
        author: req.body.author,
        author_id: req.body.author_id,
        createdAt: Date.now(),
        url: host + "/" + myFile.name
    })
    if (!req.files) {
        res.status(500).send({ msg: "file is not found" })
    }
    myFile.mv(`./uploads/${myFile.name}`, async function (err) {
        if (err) {
            console.log(err)
            res.status(500).send({ msg: "File upload error" });
        }
        console.log(`Файл ${myFile.name} загружен`)
        await file.save()
    });
})
app.get('/files/:id/get', async (req,res) => {
    let decode = jwt.decode(req.params.id).id
    res.send(await File.find({ author_id: decode}).lean())
})
app.delete('/files/:id/delete', async (req,res) => {
    fs.unlink(`./files/${req.body.name}`, async (err) => {
        if (err) console.log(`Ошибка при удалении файла: ${err}`);
        await File.deleteOne({ _id: req.body.id })
        console.log(`Файл ${req.body.name} удален`);
    });
})
async function start() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
            useCreateIndex: true,
            useUnifiedTopology: true
        })
        app.listen(PORT, () => {
            console.log(`Files microservice has been started on port: ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()