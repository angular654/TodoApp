const Todo = require('../models/Todo')
const User = require('../models/User')
const File = require('../models/File')
const emailValidator = require('email-validator')
const fs = require('fs')
const passValidator = require('password-validator')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const dotenv = require("dotenv")
dotenv.config()
const schema = new passValidator()
const host = process.env.PORT || "http://localhost:4000"
module.exports.getNotes = async (res, req) => {
    let decode = jwt.decode(res.params.id).id
    let user = await User.findById(decode).lean()
    req.send(await Todo.find({ author: user.username }).lean())
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
    await todo.save()
    res.json({ state: 'saved' })
}
module.exports.deleteTodo = async (req, res) => {
    await Todo.deleteOne({ _id: req.body.id })
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
            let token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "2d" // expires in 24 hours
                });
            await user.save()
            res.json({
                token: `${token}`,
                auth: true,
                user: user
            })
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
                console.log(err);
            }
            else if (!user) {
                console.log('Пользователь не найден');
            }
            if (!user.password) {
                console.log("Нет пароля")
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                let token = jwt.sign(
                    {
                        id: user.id
                    },
                    process.env.TOKEN_SECRET,
                    {
                        expiresIn: "2d"
                    });
                res.json({
                    token: `${token}`,
                    auth: true,
                    user: user.username
                })
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
        url: host + "/" + myFile.name
    })
    if (!req.files) {
        res.status(500).send({ msg: "file is not found" })
    }
    myFile.mv(`./files/${myFile.name}`, async function (err) {
        if (err) {
            console.log(err)
            res.status(500).send({ msg: "File upload error" });
        }
        console.log(`Файл ${myFile.name} загружен`)
        await file.save()
    });
}
module.exports.getFiles = async (req, res) => {
    let decode = jwt.decode(req.params.id).id
    let user = await User.findById(decode).lean()
    res.send(await File.find({ author: user.username }).lean())
}
module.exports.deleteFile = async (req, res) => {
    await File.deleteOne({ _id: req.body.id })
    fs.unlink(`./files/${req.body.name}`, (err) => {
        if (err) console.log(`Ошибка при удалении файла: ${err}`);
        console.log(`Файл ${req.body.name} удален`);
    });
}