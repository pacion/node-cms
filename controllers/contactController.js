const ContactMenu = require('../models/ContactMenu');
const ColorfulMenu = require('../models/ColorfulMenu');

module.exports.getContacts_get = (req, res) => {
    ContactMenu.find().sort({ 'createdAt': -1 }).then((content) => {
        ColorfulMenu.aggregate([{
                $match: {
                    "target": /[/]budynki[/]/
                }
            }, {
                $project: {
                    columnName: {
                        $arrayElemAt:[
                            {
                                $split: ["$target", "/"]
                            },
                            2
                        ]
                    }
                }
            },{
                $unwind: "$columnName"
            },{
                $group: {
                    _id: null,
                    buildings: {
                        $addToSet: "$columnName"
                    }
                }
            }
        ]).then((result) => {
            result[0].buildings.push("ckziu");
            let buildings = result[0].buildings;
            res.json({"contacts": content, "buildings":  buildings});
        }).catch((err) => {
            console.log(err)
            res.redirect('/404')
        })
    }).catch((err) => {
        console.log(err)
        res.redirect('/404')
    })
}

module.exports.contactAdd_post = (req, res) => {
    const { email, phone, address, building } = req.body || res.redirect('/404');

    ContactMenu.create({email, phone, address, building}).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
        console.log(err) 
   })
}

module.exports.contactUpdateSingle_put = (req, res) => {
    const { _id, email, phone, address, building } = req.body || res.redirect('/404');

    ContactMenu.updateOne({ "_id": _id }, { email, phone, address, building }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    })
}

module.exports.contactDelete_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');

    ContactMenu.deleteMany({_id: { $in: query}}).then(() => {
        res.json({ "ok": "ok" })
    }).catch((err) => {
        console.log(err);
    });
}