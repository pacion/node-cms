const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const footerSlideSchema = new Schema({
    src: {
        type: String,
        required: true
    },
    alt: {
        type: String,
        required: true
    },
    target: {
        type: String
    }
}, { timestamps: true })

const FooterSlide = mongoose.model('footerSlider', footerSlideSchema);

module.exports = FooterSlide;