const ColorfulMenu = require('../models/ColorfulMenu');

module.exports.renderPage = (req, res) => {
    let query = req.params[0];
    const x = query.split('/');
    let title = x[x.length-1].charAt(0).toUpperCase() + x[x.length-1].substring(1);
    if(title == '') {
        title = x[x.length-2].charAt(0).toUpperCase() + x[x.length-2].substring(1);
    }
    if(x.length > 3) {
        return res.redirect('/404');
    }

    res.render('buildings/building', {
        colorfulMenu: res.locals?.colorfulMenu,
        menu:  res.locals?.menu,
        title: 'CKZiU | '+ title,
        path: query,
        contact: res.locals?.contact,
        footer: res.locals?.footerSlide
    });
}

module.exports.getColorful_get = (req, res) => {
    let colorfulMenu;

    ColorfulMenu.find().then((result) => {
        colorfulMenu = {};
        for (const obj of result) {
            if (obj.path !== 'NULL') {
                obj.path.split('.').reduce((r, e) => r[e] = (r[e] || { order: obj.order, target: obj.target, _id: obj._id, type: obj.type, description: obj.description || 's' }), colorfulMenu)
            }
        }
        
        ColorfulMenu.find().sort({ 'createdAt': -1 }).then((documents) => {
            res.json({"colorfulMenu": colorfulMenu,  "documents": documents});
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports.colorfulMenuAdd_post = async (req, res) => {
    const { title, order, color, path, target, lvl, imageUrl, backgroundUrl, description } = req.body || res.redirect('/404')

   ColorfulMenu.create({title, order, color, path, target, lvl, imageUrl, backgroundUrl, description }).then(() => {
        res.json({"ok": "ok"});
    }).catch((err) => {
        console.log(err)
    }) 
}


module.exports.colorfulMenu_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');
    
    ColorfulMenu.deleteMany({_id: { $in: query}}).then((r) => {
        res.json({ "ok": "ok" })
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports.colorfulMenuUpdateSingle_put = (req, res) => {
    const { _id, title, order, color, fullPath, path, target, lvl, imageUrl, backgroundUrl, description } = req.body || res.redirect('/404');

    ColorfulMenu.updateOne({ "_id": _id }, { title, order, color, fullPath, path, target, lvl, imageUrl, backgroundUrl, description }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    }) 
}