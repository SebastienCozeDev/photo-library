const express = require('express');
const session = require('express-session');
const fileUpload = require('express-fileupload');
const flash = require('connect-flash');
const mongoose = require('mongoose');
const path = require('path');
const albumRoute = require('./routes/album.routes');

/**
 * Correspond au port d'écoute.
 */
const port = 3001;

const app = express();

/**
 * Se connecte à le base de données.
 */
mongoose.connect('mongodb://localhost:27017/photo-library');

/**
 * Configure l'application.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(fileUpload());
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

/**
 * Configure spécifiquement express-session.
 */
app.set('trust proxy', 1);
app.use(session({
    secret: '824194ED2BE8EB31B32157FD84964',
    resave: false,
    saveUninitialized: true,
}));
app.use(flash());

app.get('/', (req, res) => {
    res.redirect('/albums');
});

app.use('/', albumRoute);

app.use((req, res) => {
    const errorCode = 404;
    const errorDescription = 'Oups... Il semblerait que cette page n\'existe pas.';
    res.status(errorCode);
    res.render('error', {
        title: `Erreur ${errorCode}`,
        errorCode,
        errorDescription,
    });
});

app.use((err, req, res, next) => {
    const errorCode = 500;
    const errorDescription = 'Oups... Il semblerait qu\'il y ai eu une erreur interne au serveur. Nous vous conseillons de prendre contact avoir l\'administrateur de ce site.';
    console.log(err);
    res.status(errorCode);
    res.render('error', {
        title: `Erreur ${errorCode}`,
        errorCode,
        errorDescription,
    });
});

app.listen(port, () => {
    console.log(`Server running at ${port} port.`)
});