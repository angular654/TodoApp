const Todo = require('../models/Todo')
const User = require('../models/User')
const File = require('../models/File')
const emailValidator = require('email-validator')
const fs = require('fs')
const passValidator = require('password-validator')
const bcrypt = require('bcrypt')
const schema = new passValidator()
var creator = ''
var isSignUp = false;
errors = ''
module.exports.home = async (req, res) => {
    const todos = (await Todo.find({ author: creator }).lean()).reverse()
    res.render('index', {
        title: 'List',
        todos,
        isSignUp: isSignUp
    })
}
module.exports.createPage = (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true,
        isSignUp: isSignUp,
        errors: errors
    })
}
module.exports.authPage = async (req, res) => {
    res.render('auth', {
        title: 'Auth',
        isAuth: true,
        isSignUp: isSignUp,
        errors: errors
    })
}
module.exports.signinPage = (req, res) => {
    res.render('signin', {
        title: 'Sign In',
        isSignin: true,
        isSignUp: isSignUp,
        errors: errors
    })
}
module.exports.createTodo = async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        author: creator,
        completeTime: req.body.time,
        createdAt: Date.now()
    })
    try {
        await todo.save()
        res.redirect('/')
    }
    catch (e) {
        errors = `Ошибка при отправке Todo: ${e}`
        console.log(errors)
        res.redirect('/create')
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
    res.redirect('/')
}
module.exports.deleteTodo = async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    await todo.remove()
    res.redirect('/')
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
            await user.save()
            isSignUp = true
            creator = username
            res.redirect('/create')
        }
        catch (e) {
            errors = `${e}`
            console.log(errors)
            res.redirect('/auth')
        }
    }
    else {
        errors = 'Неверные данные'
        res.redirect('/auth')
    }
}
module.exports.signoutUser = async (req, res) => {
    await User.findByIdAndRemove(req.body.email, function (err) {
        if (err) errors = `${err}`
    })
    isSignUp = false
    res.redirect('/auth');
}
module.exports.signinUser = async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                console.warn(err);
            }
            else if (!user) {
                errors = 'Пользователь не найден'
                console.log(errors);
                return res.redirect('/signin');
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                creator = req.body.username
                isSignUp = true
                res.redirect('/');
            } else {
                errors = 'Неверный пароль'
                console.log(errors);
            }
        })
}
module.exports.uploadFile = async (req, res) => {
    const file = new File({
        name: req.file.originalname,
        size: req.file.size,
        type: req.file.mimetype,
        createdAt: Date.now()
    })
    let filedata = req.file;
    if (!filedata) {
        errors = "Ошибка при загрузке файла"
        console.log(errors);
    }
    else
        try {
            await file.save()
        }
        catch (e) {
            errors = `Не удалось загрузить информацию о файле : ${e}`
            console.log(errors)
            res.redirect("/create")
        }
    console.log("Файл загружен");
    res.redirect("/create")
}
module.exports.getFiles = async (req, res) => {
    const files = (await File.find().lean()).reverse()
    res.render('files', {
        title: 'Files',
        files,
        isUpload: true,
        isSignUp: isSignUp
    })
}
module.exports.deleteFile = async (req, res) => {
    const file = await File.findById(req.body.id)
    fs.unlink(`uploads/${req.body.name}`, (err) => {
        if (err) throw err;
        console.log(`Файл ${req.body.name} удален`);
    });
    await file.remove()
    res.redirect('/files')
}