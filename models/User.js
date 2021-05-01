const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Prosze podaj użytkownika'],
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: [true, 'Prosze podaj haslo'],
        minlength: [8, 'Minimalna dlugosc hasla wynosi 8 znakow']
    },
    privilege: {
        type: String
    }
}, { timestamps: true });

//dodanie prefixu i haszowanie
userSchema.pre('save', async function(next) {
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt);
    next();
})

userSchema.statics.changePassword = async function(_id, newPassword) {
    const salt = await bcrypt.genSalt();
    const password = await bcrypt.hash(newPassword, salt);
    const update = await User.updateOne({ "_id": _id }, { password });
}

//logowanie
userSchema.statics.login = async function(username, password) {
    const user = await this.findOne({ username });
    
    if(user) {
        const auth = await bcrypt.compare(password, user.password);
        if(auth) {
            return user;
        }
        throw Error('Podane dane są niepoprawne'); // haslo
    } 
    throw Error('Podane dane są niepoprawne'); //mail
}

const User = mongoose.model('user', userSchema);

module.exports = User;