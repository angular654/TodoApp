const Todo = require('../models/Todo')
const User = require('../models/User')
const File = require('../models/File')
const emailValidator = require('email-validator')
const fs = require('fs')
const passValidator = require('password-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const schema = new passValidator()
module.exports.home = async (req, res) => {
    res.json((await Todo.find({}).lean()).reverse())
}
module.exports.note = async (req, res) => {
    res.json(await Todo.findfindById(req.body.id))
}
module.exports.createTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        author: req.body.author,
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
}
module.exports.completeTodo = async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    todo.process = req.body.process
    todo.completed = !!req.body.completed
    if (todo.completed === true) {
        todo.process = 100
    }
    if (todo.process === 100) {
        todo.completed = true
    }
    await todo.save()
    res.json({ state: 'saved' })
}
module.exports.deleteTodo = async (req, res) => {
    await Todo.deleteOne({ _id: req.body.id })
    res.json({ state: 'deleted' })
}
module.exports.authUser = async (req, res) => {
    let password = req.body.password
    let username = req.body.username
    let email = req.body.email
    const user = new User({
        username: username,
        password: bcrypt.hashSync(req.body.password, 15),
        email: email
    })
    if (schema.validate(password) === emailValidator.validate(email) && username.length > 3) {
        try {
            var token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),data: user._id}, 'secret');
            res.json({token: `${token}`});
            await user.save()
        }
        catch (e) {
            console.log(e)
        }
    }
}
module.exports.signoutUser = async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err) => {
            if (err) {
                console.warn(err);
            }
        })
    res.json({ state: 'signout' })
}
module.exports.signinUser = async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                console.warn(err);
            }
            else if (!user) {
                console.log('Пользователь не найден');
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                res.json({ state: 'signin' })
            } else {
                console.log('Неверный пароль');
            }
        })
}
module.exports.uploadFile = async (req, res) => {
    const myFile = req.files.file;
    const file = new File({
        name: myFile.name,
        size: myFile.size,
        author: req.body.author,
        createdAt: Date.now(),
        url: "http://localhost:4000/" + myFile.name
    })

    if (!req.files) {
        return res.status(500).send({ msg: "file is not found" })
    }
    myFile.mv(`./files/${myFile.name}`, async function (err) {
        if (err) {
            console.log(err)
            return res.status(500).send({ msg: "Error occured" });
        }
        console.log(`Файл ${myFile.name} загружен`)
        await file.save()
        return res.send({ name: myFile.name, path: `/${myFile.name}` });
    });
}
module.exports.getFiles = async (req, res) => {
    res.json(await File.find({}).lean())
}
module.exports.deleteFile = async (req, res) => {
    const file = await File.findById(req.body.id)
    fs.unlink(`./files/${req.body.name}`, (err) => {
        if (err) throw err;
        console.log(`Файл ${req.body.name} удален`);
    });
    await file.remove()
    res.json({ state: 'success deleted' })
}