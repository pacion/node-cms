const Menu = require('../models/Menu');
const ColorfulMenu = require('../models/ColorfulMenu');

const renderMenu = async (req, res, next) => {
    try {
        Menu.aggregate([{ $sort: { lvl: 1, order: 1 }}]).then((result) => {
            menu = {};
            for (const obj of result) {
                if (obj.path !== 'NULL') {
                    obj.path.split('.').reduce((r, e) => r[e] = (r[e] || { order: obj.order, target: obj.target }), menu)
                }
            }
            ColorfulMenu.aggregate([{ $sort: { lvl: 1, order: 1 }}]).then((result) => {
                colorfulMenu = {};
                for (const obj of result) {
                    if (obj.path !== 'NULL') {
                        obj.path.split('.').reduce((r, e) => r[e] = (r[e] || { order: obj.order, target: obj.target, color: obj.color, imageUrl: obj.imageUrl, backgroundUrl: obj.backgroundUrl, description: obj.description || ''}), colorfulMenu)
                    }
                }

                /* wstawic tu te linijki, async await zwieksza czas ale jest 100% errorproof, a to na dole moze sprawdic ze menu sie nie wczyta
                    res.locals.menu = menu;
                    res.locals.colorfulMenu = colorfulMenu;
                    next();
                */
            })
        })
        // jak bedzie blad czytaj powyzej
        res.locals.menu = menu;
        res.locals.colorfulMenu = colorfulMenu;
        next();
    } catch (err) {
        var fullUrl = req.protocol + '://' + req.get('host') + req.originalUrl;
        console.log('------------------- BLAD JEST NIEWAZNY, PROSZE CZEKAC 3 -------------------');
        res.redirect(fullUrl)
    }
}

module.exports = { renderMenu };