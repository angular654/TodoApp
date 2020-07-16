const { Schema, model } = require('mongoose')
const Fileschema = new Schema({
    caption: {
        type: String,
        required: true
    },
    name: {
        type: String
    },
    size: {
        type: Number
    },
    data: {
        type: Buffer
    },
    encoding: {
        type: String
    },
    type: {
        type: String
    },
    md5: {
        type: String
    }

})
module.exports = model('files', Fileschema)