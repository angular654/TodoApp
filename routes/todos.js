const { Router } = require('express')
const Todo = require('../models/Todo')
const User = require('../models/User')
const sender = require('../mailer')
const emailValidator = require('email-validator')
const passValidator = require('password-validator')
const schema = new passValidator()
const router = Router()
let creator = ''
var isSignUp = false
router.get('/', async (req, res) => {
    const todos = (await Todo.find({ author: creator }).lean()).reverse()
    res.render('index', {
        title: 'List',
        todos,
        isSignUp: isSignUp
    })
})
router.get('/create', (req, res) => {
    res.render('create', {
        title: 'Create todo',
        isCreate: true,
        isSignUp: isSignUp
    })
})
router.get('/auth', (req, res) => {
    res.render('auth', {
        title: 'Sign Up',
        isAuth: true,
        isSignUp: isSignUp
    })
})
router.get('/signin', (req, res) => {
    res.render('signin', {
        title: 'Sign In',
        isSignin: true,
        isSignUp: isSignUp
    })
})
router.get('/files', (req, res) => {
    res.render('files', {
        title: 'Files',
        isUpload: true,
        isSignUp: isSignUp
    })
})
router.post('/create', async (req, res) => {
    const todo = new Todo({
        title: req.body.title,
        content: req.body.content,
        author: creator,
        createdAt: Date.now()
    })
    await todo.save()
    res.redirect('/')
})
router.post('/complete', async (req, res) => {
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
})
router.post('/delete', async (req, res) => {
    const todo = await Todo.findById(req.body.id)
    await todo.remove()
    res.redirect('/')
})
router.post('/auth', async (req, res) => {
    const user = new User({
        username: req.body.username,
        password: req.body.password,
        email: req.body.email
    })
    if (schema.validate(user.password) === emailValidator.validate(user.email) === true && user.username.length >= 4) {
        try {
            await user.save()
            sender(user.email, "Вы успешно зарегистрировались")
            isSignUp = true
            creator = user.username
            res.redirect('/create')
        }
        catch (e) {
            res.status(404).send(`<h1>Страница не найдена :(</h1>`)
        }
    }
    else {
        console.log('Неверные данные')
        res.redirect('/auth')
    }
})
router.get('/signout', async (req, res) => {
    await User.findByIdAndRemove(req.body.email, function (err) {
        if (err) res.send(err);
    })
    isSignUp = false
    res.redirect('/auth');
})
router.post('/signin', (req, res) => {
    User.findOne({ username: req.body.username, password: req.body.password })
        .exec((err, user) => {
            if (err) {
                console.warn(err);
            } else if (!user) {
                console.warn('User not found');
                return res.redirect('/signin');
            }
            creator = req.body.username
            isSignUp = true
            res.redirect('/');
        })

})
router.post('/upload', async (req, res) => {
    await res.send('<h3>In process :)</h3>')
})
module.exports = router