const express = require('express');
const session = require('express-session');
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
mongoose.connect('mongodb://localhost/photo-library');

/**
 * Configure l'application.
 */
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
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
    res.render('album', { title: 'Album' });
});

app.use('/', albumRoute);

app.use((req, res) => {
    res.status(404);
    res.send('Erreur 404 : Page non trouvé...');
});

app.listen(port, () => {
    console.log(`Server running at ${port} port.`)
});