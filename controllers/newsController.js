const { json } = require('express');
const News = require('../models/News');
const ColorfulMenu = require('../models/ColorfulMenu');

module.exports.oneNews = (req, res) => {
    let id = {};
    if(Number(req.params.id.substring(0,1))) {
        _id = req.params.id;
    } else {
        return res.redirect('/404')
    }

    News.findOne({ _id }).then((result) => {
        if(result) {
            res.render('contents/news-one', {
                menu:  res.locals?.menu,
                path: '',
                colorfulMenu: res.locals?.colorfulMenu,
                title: 'CKZiU | '+ result.title,
                article: result,
                contact: res.locals?.contact,
                footer: res.locals?.footerSlide
            })
        } else {
            return res.redirect('/404')
        }
    }).catch((err) => {
        console.log(err);
        return res.redirect('/404')
    })
}

module.exports.getDates = (req, res) => {
    let dbQuery = {}
    if(req.query.tag != 'wszystkie')
        dbQuery['tags'] = req.query.tag;

    News.countDocuments(dbQuery).then((result0) => { 
        News.find(dbQuery)
        .sort({ 'createdAt': -1})
        .then((result) => {
            res.json({"first": result[0]._id.getTimestamp().toISOString().substring(0,10), "last": result[result0 - 1]._id.getTimestamp().toISOString().substring(0,10)})
        })
    })
}

module.exports.manyNews = (req, res) => {
    const tag = req.params[0].split('/');

    let dbQuery = {};

    if(tag[1] != 'wszystkie'){
        dbQuery = {tags: tag[1]}
    }

    if(req.query.data && req.query.data.match(/[0-9]{4}-[0-9]{2}-[0-9]{2}/)) {
        const date = new Date(req.query.data);
        const date2 = new Date(req.query.data);
        date2.setHours(24)
        date2.setMinutes(59)
        date2.setSeconds(59)
        date2.setMilliseconds(999)
    
        dbQuery['createdAt'] = {$gte: date, $lt: date2};
    }

    let header = dbQuery.tags || 'Wszystkie';
    const page = req.query.strona || 1;
    const number = 9;

    News.countDocuments(dbQuery).then((result0) => {
        const pages = Math.ceil(result0 / number);
        let empty = 0;
        if(page > pages) {
            empty = 1;
        }
            

        News.find(dbQuery)
        .sort({ 'createdAt': -1})
        .skip((page - 1) * number)
        .limit(number)
        .then((result) => {
            let smile = 'Aktualności'
            if(empty == 1) {
                header = 'Nie znaleziono żadnych aktualności';  
                smile = ':('    
            }
            res.render('contents/news-many', {
                menu:  res.locals?.menu,
                title: 'CKZiU | ' + smile,
                path: '',
                colorfulMenu: res.locals?.colorfulMenu,
                content: result,
                pages: pages,
                currentPage: page,
                header: header,
                contact: res.locals?.contact,
                footer: res.locals?.footerSlide,
                tag: tag[1],
                empty: empty
            });
        }).catch((err) => {
            console.log(err);
        });
    }).catch((err) => {
         console.log(err)
    })
}

module.exports.getNews_get = (req, res) => {
    News.find().sort({ 'createdAt': -1 }).then((news) => {
        res.json({ "documents": news });
    }).catch((err) => {
        console.log(err)
    })
}

module.exports.newsAdd_post = (req, res) => {
    const {title, tags, description, body, imageUrl, imageAlt } = req.body || res.redirect('/404')
    
    News.create({title, tags, description, body, imageUrl, imageAlt }).then((result) => {
        res.json({"ok": "ok"});
    }).catch((err) => {
        console.log(err)
    })
}
module.exports.newsUpdateSingle_put = (req, res) => {
    const obj = req.body || res.redirect('/404');
    const { _id } = req.body;   
    delete obj._id;
    
    News.updateOne({ "_id": _id }, obj).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    })
}
module.exports.newsDelete_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');
    
    News.deleteMany({_id: { $in: query}}).then(() => {
        res.json({ "ok": "ok" })
    }).catch((err) => {
        console.log(err);
    });
}

module.exports.newsGetBuildings_get = (req, res) => {
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
    ]).sort({ 'createdAt': -1 }).then((result) => {
        result[0].buildings.push("strona główna");
        let buildings = result[0].buildings;
        res.json({"buildings":  buildings});
    }).catch((err) => {
        console.log(err)
        res.redirect('/404')
    })
}

module.exports.newsGetContent_get = async(req, res) => {
    const _id = req.query.id;

    News.findOne({ _id }).then((news) => {
        res.json({"content":  news.body});
    }).catch((err) => {
        console.log(err);
    })
}