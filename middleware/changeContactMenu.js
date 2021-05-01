const ContactMenu = require('../models/ContactMenu');

const changeContactMenu = (req, res, next) => {
    const arrayUrl = req.params[0].split('/')[2];
    let query = { building: arrayUrl };

    ContactMenu.findOne(query).then((result) => {
        if(result === null) {
            query = {building: 'ckziu'};
            ContactMenu.findOne(query).then((result) => {
                res.locals.contact = result;
                next();
            }).catch((err) => {
                console.log(err);
            })
        } else {
            res.locals.contact = result;
            next();
        }

        
    }).catch((err) => {
        console.log(err);
    });
}

module.exports = { changeContactMenu };