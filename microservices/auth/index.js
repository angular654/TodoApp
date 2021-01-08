const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const bodyParser = require('body-parser');
const dotenv = require("dotenv")
const User = require('./model/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
dotenv.config()
const PORT = process.env.PORT || 4040
const app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.post('/auth/signin', async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err, user) => {
            if (err) {
                console.log(err);
            }
            else if (!user) {
                res.json({status:'Пользователь не найден'});
            }
            else if (bcrypt.compareSync(req.body.password, user.password)) {
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
                    user: user.username,
                    user_id: user._id,
                })
            } else {
                res.json({status:'Ошибка при входе'});
            }
        })
})
app.post('/auth/reg', async (req, res) => {
    const email_re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const password = req.body.password
    const username = req.body.username
    const email = req.body.email
    const user = new User({
        username: username,
        password: bcrypt.hashSync(req.body.password, 15),
        email: email
    })
    if (password.length > 10 === email_re.test(email) && username.length > 3) {
        try {
            let token = jwt.sign(
                {
                    id: user.id
                },
                process.env.TOKEN_SECRET,
                {
                    expiresIn: "2d"
                });
            await user.save()
            res.json({
                token: `${token}`,
                auth: true,
                user: user,
            })
        }
        catch (e) {
            res.json({status:'Ошибка при регистрации'});
        }
    } else {
        res.json({status:'Неверные данные'});
    }
})
app.post('/auth/signout', async (req, res) => {
    await User.findOne({ username: req.body.username })
        .exec((err) => {
            if (err) {
                console.log(err);
            }
        })
    res.json({ state: 'signout' })
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
            console.log(`Auth microservice has been started on port: ${PORT}`)
        })
    }
    catch (e) {
        console.log(e)
    }
}
start()