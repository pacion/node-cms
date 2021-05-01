const Menu = require('../models/Menu');

module.exports.getMenu_get = async (req, res) => {
    let menu = "";

    Menu.aggregate([{ $sort: { lvl: 1, order: 1 }}]).sort({ 'createdAt': -1 }).then((result) => {
        menu = {};
        for (const obj of result) {
            if (obj.path !== 'NULL') {
                obj.path.split('.').reduce((r, e) => r[e] = (r[e] || { order: obj.order, target: obj.target, _id: obj._id }), menu)
            }
        }
        Menu.find().sort({ 'createdAt': -1 }).then((documents) => {
            res.json({ "menu": menu,  "documents": documents });
        }).catch((err) => {
            console.log(err)
        })
    }).catch((err) => {
        console.log(err)
    })
}

module.exports.menuAdd_post = (req, res) => {
    const { order, type, path, target, lvl } = req.body || res.redirect('/404')
    
    Menu.create({order, type, path, target, lvl}).then((result) => {
        res.json({"ok": "ok"});
    }).catch((err) => {
        console.log(err)
    })
}

module.exports.menuDelete_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');
    
    Menu.deleteMany({_id: { $in: query}}).then(() => {
        res.json({ "ok": "ok" })
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.menuUpdateSingle_put = (req, res) => {
    const { _id, type, path, order, target, lvl } = req.body || res.redirect('/404');

    Menu.updateOne({ "_id": _id }, { _id, type, path, order, target, lvl }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    })
}