const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const db = 'mongodb+srv://VlAdmin:22w99i@cluster0-pcusn.mongodb.net/ToDoApp'
const PORT = process.env.PORT || 4000
const app = express()
const fileUpload = require('express-fileupload');
app.use(express.static('./client/src/files'));
app.use(fileUpload());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/api/todos',require('./routes/router')) 
app.use(bodyParser.json());
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