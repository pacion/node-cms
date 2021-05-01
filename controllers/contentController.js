const Content = require('../models/Content');

module.exports.contentAdd_post = (req, res) => {
    const { body, target } = req.body || res.redirect('/404');

    Content.create({ body, "path": target }).then(() => {
        res.json({"ok": "ok"});
    }).catch((err) => {
        console.log(err)
    }) 
}

module.exports.getContent_get = (req, res) => {
    const { path } = req.query || res.redirect('/404');

    Content.findOne({ path }).then((content) => {
        if(content.body == null) content.body = ' ';
        res.json({ "content": content.body});
    }).catch((err) => {
        if(err.message.includes('of null')) {
            Content.create({ path, "body": ' '}).then(() => {
                res.json({"ok": "ok"});
            }).catch((err) => {
                console.log(err)
            }) 
        } else {
            console.log(err);
        }
    }) 
}

module.exports.contentUpdate_put = (req, res) => {
    const { body, target } = req.body || res.redirect('/404');

    Content.updateOne({ "path": target }, { body }).then((result) => {
        res.json({"ok": "ok"});
    }).catch((err) => {
        console.log(err)
    }) 
}


module.exports.content_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');
    
    Content.deleteMany({path: { $in: query}}).then((r) => {
        res.json({ "ok": "ok" })
    })
    .catch((err) => {
        console.log(err);
    });
}
