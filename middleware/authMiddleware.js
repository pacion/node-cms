const jwt = require('jsonwebtoken');
const User = require('../models/User');

const requireAuth = (req, res, next) => {
    const token = req.cookies.jwt;

    //token istnieje i jest poprawny
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, (err, decodedToken)=> {
            if (err) {
                console.log(err.message);
                res.redirect('/404');
            }
            else {
                next();
            }
        })
    }
    else {
        res.redirect('/404');
    }
}

//aktualny uzytkownik
const checkUser = (req, res, next) => {
    const token = req.cookies.jwt;
    
    if(token) {
        jwt.verify(token, process.env.SECRET_KEY, async (err, decodedToken)=> {
            if (err) {
                console.log(err.message);
                res.locals.user = undefined; //null
                next();
            }
            else {
                let user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        })
    }
    else {
        res.locals.user = undefined;//null
        next();
    }
}

module.exports = { requireAuth, checkUser };