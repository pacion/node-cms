const FooterSlide = require('../models/FooterSlide');

module.exports.footerSlideAdd_post = (req, res) => {
    const { src, alt, target } = req.body || res.redirect('/404');;

    FooterSlide.create({ src, alt, target }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
        console.log(err) 
   })
}

module.exports.getFooterSlide_get = (req, res) => {
    FooterSlide.find().sort({ 'createdAt': -1 }).then((slides) => {
        res.json({"documents": slides});
    }).catch((err) => {
        console.log(err)
        res.redirect('/404')
    })
}

module.exports.footerSlideUpdateSingle_put = (req, res) => {
    const { _id, src, alt, target } = req.body || res.redirect('/404');

    FooterSlide.updateOne({ "_id": _id }, { src, alt, target }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    })
}

module.exports.footerSlideDelete_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');

    FooterSlide.deleteMany({_id: { $in: query}}).then(() => {
        res.json({ "ok": "ok" })
    }).catch((err) => {
        console.log(err);
    });
}
