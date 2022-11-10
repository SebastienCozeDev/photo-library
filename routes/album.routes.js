const express = require('express');
const router = express.Router();

/**
 * Route vers la création d'un album.
 */
router.get('/albums/create', (req, res) => {
    res.render('new-album', { title: 'Nouvel album' });
});

module.exports = router;