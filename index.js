const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
dotenv.config()
const PORT = process.env.PORT || 4000
const app = express()
const fileUpload = require('express-fileupload');
app.use(express.static('./files'));
app.use(fileUpload());
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/api/todos', require('./routes/router'))
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
            console.log(`Server has been started on port: ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()