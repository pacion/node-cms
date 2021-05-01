const Content = require('../models/Content');

module.exports.findContent = (req, res) => {

    let query = req.params[0];
    const x = query.substring(1).split('/');
    const title = x[x.length-1].charAt(0).toUpperCase() + x[x.length-1].substring(1);
    
    const path = '/ckziu' + query;

    Content.findOne({ path }).then((result) => {
        if(result) {
            if (x[0] != 'poj') {
                res.render('contents/content', {
                    colorfulMenu: res.locals?.colorfulMenu,
                    menu:  res.locals?.menu,
                    title: 'CKZiU | '+ title,
                    path: query,
                    content: result,
                    contact: res.locals?.contact,
                    footer: res.locals?.footerSlide
                }); 
            } else {
                res.render('contents/content-no-side', {
                    colorfulMenu: res.locals?.colorfulMenu,
                    menu:  res.locals?.menu,
                    title: 'CKZiU | '+ title,
                    path: query,
                    content: result,
                    contact: res.locals?.contact,
                    footer: res.locals?.footerSlide
                });   
            }
        } else {
            return res.redirect('/404');
        }
    }).catch((err) => {
        console.log(err);
    })
}