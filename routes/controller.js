const Todo = require('../models/Todo')
const User = require('../models/User')
const File = require('../models/File')
const sender = require('../modules/mailer')
const emailValidator = require('email-validator')
const passValidator = require('password-validator')
const bcrypt = require('bcrypt')
const schema = new passValidator()
var creator = ''
var isSignUp = false

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
        isSignUp: isSignUp
    })
}
module.exports.authPage = (req, res) => {
    res.render('auth', {
        title: 'Sign Up',
        isAuth: true,
        isSignUp: isSignUp
    })
}
module.exports.signinPage = (req, res) => {
    res.render('signin', {
        title: 'Sign In',
        isSignin: true,
        isSignUp: isSignUp
    })
}
module.exports.filesPage = (req, res) => {
    res.render('files', {
        title: 'Files',
        isUpload: true,
        isSignUp: isSignUp
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
        console.log(`Ошибка при отправке Todo: ${e}`)
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
            sender(email, "Вы успешно зарегистрировались")
            isSignUp = true
            creator = username
            res.redirect('/create')
        }
        catch (e) {
            console.log(`${e}`)
            res.redirect('/auth')
        }
    }
    else {
        console.log(`Неверные данные ${username}  ${email}  ${password}`)
        res.redirect('/auth')
    }
}
module.exports.signoutUser = async (req, res) => {
    await User.findByIdAndRemove(req.body.email, function (err) {
        if (err) res.send(err);
    })
    isSignUp = false
    res.redirect('/auth');
}
module.exports.signinUser = async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                console.warn(err);
            } else if (!user) {
                console.log('Пользователь не найден');
                return res.redirect('/signin');
            }
            if (bcrypt.compareSync(req.body.password, user.password)) {
                creator = req.body.username
                isSignUp = true
                res.redirect('/');
            } else {
                console.log('Неверный пароль')
            }
        })

}
module.exports.fileUpload = async(req, res) => {
    const storagefile = new File({
        caption : req.body.caption,
        name : req.body.name,
        size : req.files.file.size,
        encoding : req.files.file.encoding,
        data : req.files.file.data,
        type : req.files.file.mimetype,
        md5 : req.files.file.md5
    })
    if (req.files.file) {
        await storagefile.save()
        console.log(req.files.file)
        res.redirect('/create');
    }
}