const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

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
app.set('views engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send("Server running.");
});

app.use((req, res) => {
    res.status(404);
    res.send('Erreur 404 : Page non trouvé...');
});

app.listen(port, () => {
    console.log(`Server running at ${port} port.`)
});