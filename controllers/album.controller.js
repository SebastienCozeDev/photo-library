const Album = require('../models/Album');
const album = require('../models/Album');

const albums = async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Les albums',
        albums,
    });
};

const createAlbumForm = (req, res) => {
    res.render('new-album', {
        title: 'Nouvel album',
        errors: req.flash('error'),
    });
};

const createAlbum = async (req, res) => {
    console.log(req.flash('error'));
    try {
        if (!req.body.albumTitle) {
            req.flash('error', 'Le titre de l\'album ne doit pas être vide.');
            res.redirect('/albums/create');
            return;
        }
        await Album.create({
            title: req.body.albumTitle,
        });
        res.redirect('/albums');
    } catch (err) {
        console.error(err);
        req.flash('error', 'Erreur lors de la création de l\'album.');
        res.redirect('/albums/create');
    }
};

module.exports = {
    albums,
    createAlbumForm,
    createAlbum,
};