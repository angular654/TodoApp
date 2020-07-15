const { Schema, model }  = require('mongoose')
const Fileschema = new Schema({
    filename: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    buffer: {
        type: Buffer,
        required: true
    }
})
module.exports = model('files', Fileschema)