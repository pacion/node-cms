const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contactMenuSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    building: {
        type: String,
        required: true
    }
}, { timestamps: true })

const ContactMenu = mongoose.model('contactMenu', contactMenuSchema);

module.exports = ContactMenu;