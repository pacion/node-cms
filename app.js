const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const { render } = require('ejs');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const _ = require('lodash');
const { compareSync } = require('bcrypt');
const fileUpload = require('express-fileupload');

const newsRoutes = require('./routes/newsRoutes');
const searchRoutes = require('./routes/searchRoutes');
const tinyRoutes = require('./routes/tinyRoutes');
const authRoutes = require('./routes/authRoutes');
const adminRoutes = require('./routes/adminRoutes');
const ckziuRoutes = require('./routes/ckziuRoutes');
const budynkiRoutes = require('./routes/budynkiRoutes');

const biuletynController = require('./controllers/biuletynController');
const authorsController = require('./controllers/authorsController');
const indexController = require('./controllers/indexController');
const newsController = require('./controllers/newsController');

const authMiddleware = require('./middleware/authMiddleware');
const { changeContactMenu } = require('./middleware/changeContactMenu.js');
const { getFooterSlides }= require('./middleware/footerSlide');
const { existsMenu }= require('./middleware/existsMenu');
const {generate} = require('./functions/generate');
const {generateColorful} = require('./functions/generateColorful');

const app = express();
require('dotenv').config();

app.locals.generate = generate;
app.locals.generateColorful = generateColorful;

const db = process.env.DB;
mongoose.connect(db, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
    .then((result) => app.listen(process.env.PORT || 3000))
    .catch((err) => console.log(err));

app.set('view engine', 'ejs');
//app.disable('etag'); // naprawia 304 - cache

app.use(express.static('public')); // uploads
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev')); // comment if want to hide logs
app.use(express.json());
app.use(cookieParser());
app.use(fileUpload({ createParentPath: true }));
app.use(cors());


app.get('*', authMiddleware.checkUser, existsMenu, changeContactMenu, getFooterSlides);

app.get('', indexController.index);

app.use('', authRoutes); // zaloguj wyloguj
app.use('/admin', adminRoutes);
app.use('/upload', tinyRoutes);
app.use((req, res, next) =>{
    res.header('Cache-Control', 'public, max-age=31557600')
    return next()
})
app.use('/autorzy', authorsController.render)
app.use('/ckziu', ckziuRoutes);
app.use('/budynki', budynkiRoutes);
app.use('/aktualnosc/:id', newsController.oneNews);
app.use('/aktualnosci', newsRoutes);
app.use('/szukaj', searchRoutes);
app.use('/biuletyn', biuletynController.showMap);
app.use((req, res) => {
    res.status(404).render('404', {
        title: '404'
    });
});

