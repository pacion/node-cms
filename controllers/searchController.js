const News = require('../models/News')
const Content = require('../models/Content');

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

module.exports.search_get = (req, res) => {
    let query = req.query.s;

    if(query.split("").length < 4) {
       query = 'ADSJK563762542sdaf';
    }
    
    const regex = new RegExp(escapeRegex(query), 'gi');
    let news, contents;
    News.find({$or: [{title: regex}, {description: regex}, {body: regex}]}).then((news) => {
        Content.find({$or: [{path: regex}, {body: regex}]}).then((contents) => {
            let empty = {news: 1, contents: 1}
            if(news.length === 0) 
                empty.news = 0;
            if(contents.length == 0)
                empty.contents = 0;
            res.render('contents/search', {
                colorfulMenu: res.locals?.colorfulMenu,
                menu:  res.locals?.menu,
                path: '',
                title: 'CKZiU | Szukaj',
                contact: res.locals?.contact,
                footer: res.locals?.footerSlide,
                contents: contents,
                news: news,
                phrase: req.query.s,
                empty: empty
            });
        }).catch(err => { console.log(err) })
    }).catch(err => { console.log(err) })

}