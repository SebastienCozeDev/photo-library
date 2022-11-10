const Album = require('../models/Album');
const album = require('../models/Album');

const createAlbumForm = (req, res) => {
    res.render('new-album', {
        title: 'Nouvel album',
        errors: req.flash('error'),
    });
};

const createAlbum = async (req, res) => {
    console.log(req.flash('error'));
    try {
        await Album.create({
            title: req.body.albumTitle,
        });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Erreur lors de la création de l\'album.');
        res.redirect('/albums/create');
    }
};

module.exports = {
    createAlbumForm,
    createAlbum,
};