const { Schema, model }  = require('mongoose')
const ToDoschema = new Schema({
    title: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true,
        maxlength: 600
    },
    author: {
        type: String,
        required: true
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
        max: 59
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('todo', ToDoschema)