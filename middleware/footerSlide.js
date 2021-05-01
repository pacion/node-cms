const FooterSlide = require('../models/FooterSlide');

const getFooterSlides = (req, res, next) => {
    FooterSlide.find().then((result) => {
        res.locals.footerSlide = result;
        next();
    }).catch((err) => {
        console.log(err)
    })
}

module.exports = { getFooterSlides }