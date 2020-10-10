const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Todo = require('./model/Todo');
const bodyParser = require('body-parser');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
dotenv.config();
const PORT = process.env.PORT || 6060;
const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use('/todos/:id/', (req, res, next) => {
    try {
        jwt.verify(req.params.id, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        console.log(err)
    }
})
app.post('/todos/:id/create', async (req,res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
        author_id: req.body.author_id,
        completeTime: req.body.time,
        createdAt: Date.now()
    })
    try {
        await todo.save()
        res.json({ state: 'success' })
    }
    catch (e) {
        console.log(`Ошибка при отправке Todo: ${e}`)
    }
})
app.get('/todos/:id/get', async (req,res) => {
    let decode = jwt.decode(req.params.id).id
    res.send(await Todo.find({ author_id: decode }).lean())
})
app.delete('/todos/:id/delete', async (req,res) => {
    await Todo.deleteOne({ _id: req.body.id })
})
app.post('/todos/:id/complete', async (req,res) => {
    let completed = false 
    if (req.body.process === 100){
        completed = true
    }
    await Todo.findByIdAndUpdate(req.body.id, { process : req.body.process , completed : completed})
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
            console.log(`Todos microservice has been started on port: ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()