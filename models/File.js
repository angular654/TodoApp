const { Schema, model }  = require('mongoose')
const Fileschema = new Schema({
    path: {
        type: String,
    },
    caption: {
        type: String,
        required: true
    }
})
module.exports = model('files', Fileschema)