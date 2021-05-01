const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Content = mongoose.model('content', contentSchema);

module.exports = Content;