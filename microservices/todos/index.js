const Koa = require('koa');
const app = new Koa();
const cors = require('@koa/cors');
const mongoose = require('mongoose');
const Todo = require('./model/Todo');
const dotenv = require("dotenv");
const jwt = require('jsonwebtoken');
const Router = require('@koa/router');
const koaBody = require('koa-body');
app.use(koaBody());
dotenv.config();
const router = new Router({
    prefix:'/'
});
app.use(cors())
const PORT = process.env.PORT || 6060;
router.use('/todos/:id/',(ctx,next) => {
    try {
        jwt.verify(ctx.params.id, process.env.TOKEN_SECRET);
        next();
    } catch (err) {
        console.log(err)
    }
})

router.post('todos/:id/create', async (ctx) => {
    const todo = new Todo({
        title: ctx.request.body.title,
        content: ctx.request.body.content,
        author: ctx.request.body.author,
        author_id: ctx.request.body.author_id,
        completeTime: ctx.request.body.time,
        createdAt: Date.now()
    })
    try {
        await todo.save()
        ctx.body = { state: 'success' }
    }
    catch (e) {
        console.log(`Ошибка при отправке Todo: ${e}`)
    }
})
router.get('todos/:id/get', async (ctx) => {
    let decode = jwt.decode(ctx.params.id).id
    let todos = await Todo.find({ author_id: decode }).lean()
    ctx.body = todos
})
router.delete('todos/:id/delete/:todo', async (ctx) => {
    ctx.body = await Todo.deleteOne({ _id : ctx.params.todo})
    })
router.post('todos/:id/complete', async (ctx) => {
    let completed = false 
    if (ctx.request.body.process === 100){
        completed = true
    }
    await Todo.findByIdAndUpdate(ctx.request.body.id, { process : ctx.request.body.process , completed : completed})
    ctx.body = { status:"completed!"}
})
app.use(router.routes()).use(router.allowedMethods());
async function start() {
    console.log(router.stack.map(i => i.path));
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