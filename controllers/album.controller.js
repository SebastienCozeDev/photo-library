const Album = require('../models/Album');
const ImageA = require('../models/ImageA');
const User = require('../models/User');
const catchAsync = require('../helpers/catchAsync');
const path = require('path');
const fs = require('fs');
const jszip = require('jszip');
const rimraf = require('rimraf');

/**
 * Number maximum d'octets que peut prendre la taille d'une image.
 * Ici, on est à 700Mo.
 */
const maxOctets = 734003200;

const albums = catchAsync(async (req, res) => {
    const albums = await Album.find();
    res.render('album/albums', {
        title: 'Les albums',
        albums,
    });
});

const album = catchAsync(async (req, res) => {
    try {
        const idAlbum = req.params.id;
        const objectAlbum = await Album.findById(idAlbum);
        const images = await ImageA.find().where('album').equals(objectAlbum._id);
        const creator = await User.findById(objectAlbum.user);
        //console.log(images); // TODO A enlever
        res.render('album/album', {
            title: objectAlbum.title,
            album: objectAlbum,
            images,
            creator,
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
        req.flash('error', 'Veuillez sélectionner un fichier.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const image = req.files.image;
    if (image.size > maxOctets) {
        req.flash('error', 'Le fichier est trop volumineux. Sa taille ne peut pas être plus grande que 70 Mo.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    const folderPath = path.join(__dirname, '../public/uploads', idAlbum);
    if (image.mimetype == 'application/zip') {
        const zipName = image.name;
        const localPath = path.join(folderPath, zipName);
        fs.mkdirSync(folderPath, { recursive: true });
        await image.mv(localPath);
        const fileContent = fs.readFileSync(localPath);
        const jszipInstance = new jszip();
        const result = await jszipInstance.loadAsync(fileContent);
        const keys = Object.keys(result.files);
        for (let key of keys) {
            const item = result.files[key];
            if (!item.dir) {
                const imageName = item.name.split('/')[1];
                const imagePath = path.join(folderPath, imageName);
                if (fs.existsSync(imagePath)) {
                    req.flash('error', 'L\'une des images de l\'archive est déjà présente dans l\'album.');
                    res.redirect(`/albums/${idAlbum}`);
                    return;
                }
                fs.mkdirSync(folderPath, { recursive: true });
                fs.writeFileSync(imagePath, Buffer.from(await item.async('arraybuffer')));
                /* Création de l'image dans la base de données */
                try {
                    await ImageA.create({
                        filename: imageName,
                        size: 0,
                        typeStr: item.mimetype,
                        name: imageName,
                        album: objectAlbum._id,
                    });
                } catch (err) {
                    console.log(err);
                    req.flash('error', 'Erreur lors de l\'ajout de l\'image. Si le problème persiste, merci de contacter l\'administrateur du site.');
                    res.redirect(`/albums/${idAlbum}`);
                }
                /* =========================================== */
            }
        }
        fs.rmSync(localPath);
        res.redirect(`/albums/${idAlbum}`);
    } else if (image.mimetype == 'image/jpeg' || image.mimetype == 'image/png') {
        const imageName = image.name;
        const localPath = path.join(folderPath, imageName);
        if (fs.existsSync(localPath)) {
            req.flash('error', 'Cette image est déjà présente dans l\'album.');
            res.redirect(`/albums/${idAlbum}`);
            return;
        }
        fs.mkdirSync(folderPath, { recursive: true });
        await image.mv(localPath);
        /* Création de l'image dans la base de données */
        try {
            await ImageA.create({
                filename: imageName,
                size: image.size,
                typeStr: image.mimetype,
                name: imageName,
                album: objectAlbum._id,
            });
        } catch (err) {
            console.log(err);
            req.flash('error', 'Erreur lors de l\'ajout de l\'image. Si le problème persiste, merci de contacter l\'administrateur du site.');
            res.redirect(`/albums/${idAlbum}`);
        }
        /* =========================================== */
        res.redirect(`/albums/${idAlbum}`);
    } else {
        req.flash('error', 'Seuls les fichiers JPEG, PNG et ZIP sont accepté.');
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
});

const createAlbumForm = (req, res) => {
    res.render('album/new-album', {
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
            user: '6378dc61819dae6bb95a6f15',
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
    const objectAlbum = await Album.findById(idAlbum); // TODO A enlever
    const idImage = req.params.idImage;
    const image = await ImageA.findById(idImage);
    const images = await ImageA.find().where('album').equals(objectAlbum._id);
    const imagePath = path.join(__dirname, '../public/uploads', idAlbum, image.filename);
    if (!image) {
        res.redirect(`/albums/${idAlbum}`);
        return;
    }
    await objectAlbum.save();
    await image.delete();
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