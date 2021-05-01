const News = require('../models/News');

module.exports.index = (req, res) => {
    const username = res.locals.user?.username;
    const query = {tags: 'strona główna'};
    News.findOne(query).sort({ 'createdAt': -1 }).then((result) => {
        res.render('index.ejs', {
            colorfulMenu: res.locals?.colorfulMenu,
            menu:  res.locals?.menu,
            footer: res.locals?.footerSlide,
            article: result,
            title: 'CKZiU | Strona główna',
            path: '/',
            contact: res.locals?.contact
        })
    }).catch((err) => {
        console.log(err);
    })
}


