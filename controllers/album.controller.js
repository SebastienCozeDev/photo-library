const createAlbumForm = (req, res) => {
    res.render('new-album', { title: 'Nouvel album' });
};

const createAlbum = (req, res) => {
    res.send('Ok');
};

module.exports = {
    createAlbumForm,
    createAlbum,
};