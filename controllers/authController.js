const User = require('../models/User');
const jwt = require('jsonwebtoken');

const maxAge = 3 * 24 * 60 * 60;
const createToken = (id) => {
    return jwt.sign({ id }, process.env.SECRET_KEY, {
        expiresIn: maxAge
    });
}

module.exports.login_get = (req, res) => {
    res.render('users/login', {
        title: 'login'
    });

}

const handleErrors = (err) => {
    console.log(err);
    let errors = { password: ''};

    //haslo - login 
    if(err.message === 'Podane dane są niepoprawne') {
        errors.password = 'Podane dane są niepoprawne';
        return errors;
    }

    //sprawdzenie czy istnieje - rejstracja
    if (err.code === 11000) {
        errors.username = 'ten uzytkownik juz jest zarejstrowany';
        return errors;
    }

    //errors - rejstracja
    if(err.message.includes('user validation failed')) {
        Object.values(err.errors).forEach(({properties}) => {
            errors[properties.path] = properties.message;
        });
    }
    
    return errors;
}

module.exports.login_post = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.login(username, password);
        const token = createToken(user._id);
        res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000});
        res.cookie('isLogged', 'true', { httpOnly: false, maxAge: maxAge * 1000});
        res.status(200).json({ user: user._id });
    }
    catch (err) {
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.logout_get = (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 });
    res.cookie('isLogged', '', { maxAge: 1 });
    return res.redirect('/');
}