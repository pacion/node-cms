const User = require('../models/User');

const handleErrors = (err) => {
    console.log(err);
    let errors = {username: '', password: ''};

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

module.exports.userAdd_post = async (req, res) => {
    const { username, password, privilege } = req.body || res.redirect('/404');

    try {
        const user = await User.create({ username, password, privilege });
        const users = await User.find();
        res.status(200).json({ "ok": "ok", "users": users });
    }
    catch(err){
        const errors = handleErrors(err);
        res.status(400).json({ errors });
    }
}

module.exports.userUpdateSingle_put = (req, res) => {
    const { _id, username, privilege } = req.body || res.redirect('/404');

    User.updateOne({ "_id": _id }, { username, privilege }).then(() => {
        res.json({"ok": "ok"})
    }).catch((err) => {
         console.log(err) 
    }) 
}

module.exports.userChangePassword_post = async (req, res) => {
    const { _id, password } = req.body;
    const update = await User.changePassword(_id, password);
    res.json({"ok": "ok"});
}

module.exports.userDelete_delete = (req, res) => {
    const query = Object.getOwnPropertyNames(req.query) || res.redirect('/404');
    
    User.deleteMany({_id: { $in: query}}).then(() => {
        res.json({ "ok": "ok" })
    })
    .catch((err) => {
        console.log(err);
    });
}

module.exports.getUsers_get = (req, res) => {
    User.find().sort({ 'createdAt': -1 }).then((users) => {
        res.json({"users": users});
    }).catch((err) => {
        console.log(err)
        res.redirect('/404')
    })
}