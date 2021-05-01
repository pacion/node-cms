const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const colorfulMenuSchema = new Schema({
    order: {
        type: Number,
        required: true
    },
    color: {
        type: String
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
    },
    imageUrl: {
        type: String
    },
    backgroundUrl: {
        type: String
    },
    description: {
        type: String
    }
}, { timestamps: true })

const ColorfulMenu = mongoose.model('colorfulMenu', colorfulMenuSchema);

module.exports = ColorfulMenu;