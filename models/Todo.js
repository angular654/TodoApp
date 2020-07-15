const { Schema, model }  = require('mongoose')
const ToDoschema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 500
    },
    author: {
        type: String,
        required: false
    },
    process: {
        type: Number,
        default: 0
    },
    completed: {
        type: Boolean,
        default: false
    },
    completeTime: {
        type: Number,
        required: true,
        max:50
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('todo', ToDoschema)