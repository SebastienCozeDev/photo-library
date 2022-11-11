const Album = require('../models/Album');
const catchAsync = require('../helpers/catchAsync');
const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');

const albums = catchAsync(async (req, res) => {
    const albums = await Album.find();
    res.render('albums', {
        title: 'Les albums',
        albums,
    });
});

const album = catchAsync(async (req, res) => {
    try {
        const idAlbum = req.params.id;
        const objectAlbum = await Album.findById(idAlbum);
        res.render('album', {
            title: objectAlbum.title,
            album: objectAlbum,
            errors: req.flash('error'),
        });
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
});

const addImage = catchAsync(async (req, res) => {
    const idAlbum = req.params.id;
    const objectAlbum = await Album.findById(idAlbum);
    if (!req?.files?.image) {
        req.flash('error', 'Aucun fichier mis en ligne.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const image = req.files.image;
    if (image.mimetype != 'image/jpeg' && image.mimetype != 'image/png') {
        req.flash('error', 'Seuls les fichiers JPEG et PNG sont accepté.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const imageName = image.name;
    const folderPath = path.join(__dirname, '../public/uploads', idAlbum);
    const localPath = path.join(folderPath, imageName);
    if (fs.existsSync(localPath)) {
        req.flash('error', 'Cette image est déjà présente dans l\'album.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    fs.mkdirSync(folderPath, { recursive: true });
    await image.mv(localPath);
    objectAlbum.images.push(imageName);
    await objectAlbum.save();
    res.redirect(`/albums/${idAlbum}`);
});

const createAlbumForm = (req, res) => {
    res.render('new-album', {
        title: 'Nouvel album',
        errors: req.flash('error'),
    });
};

const createAlbum = catchAsync(async (req, res) => {
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
});

const deleteImage = catchAsync(async (req, res) => {
    const idAlbum = req.params.id;
    const objectAlbum = await Album.findById(idAlbum);
    const imageIndex = req.params.imageIndex;
    const image = objectAlbum.images[imageIndex];
    const imagePath = path.join(__dirname, '../public/uploads', idAlbum, image);
    if (!image) {
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    objectAlbum.images.splice(imageIndex, 1);
    await objectAlbum.save();
    fs.unlinkSync(imagePath);
    res.redirect(`/albums/${idAlbum}`);
});

const deleteAlbum = catchAsync(async (req, res) => {
    const idAlbum = req.params.id;
    const albumPath = path.join(__dirname, '../public/uploads', idAlbum);
    await Album.findByIdAndDelete(idAlbum);
    rimraf(albumPath, () => {
        res.redirect('/albums');
    });
});

module.exports = {
    albums,
    album,
    addImage,
    createAlbumForm,
    createAlbum,
    deleteImage,
    deleteAlbum,
};