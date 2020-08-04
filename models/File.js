const { Schema, model } = require('mongoose')
const Fileschema = new Schema({
    name: {
        type: String
    },
    size: {
        type: Number
    },
    type: {
        type: String
    },
    author: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
})
module.exports = model('files', Fileschema)