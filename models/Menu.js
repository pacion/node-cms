const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const menuSchema = new Schema({
    order: { 
        type: Number,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        unique: true
    },
    target: {
        type: String
    },
    lvl: {
        type: Number
    }
}, { timestamps: true })

const Menu = mongoose.model('menu', menuSchema);

module.exports = Menu;