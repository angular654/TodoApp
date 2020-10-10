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
    author_id:{
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now()
    },
    url: {
        type: String
    }
})
module.exports = model('files', Fileschema)