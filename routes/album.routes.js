const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');

/**
 * Route vers la liste des albums.
 */
router.get('/albums', albumController.albums),

/**
 * Route vers la création d'un album.
 */
router.get('/albums/create', albumController.createAlbumForm);

 /**
  * Route qui traite le formulaire de création d'album.
  */
router.post('/albums/create', albumController.createAlbum);

router.get('/albums/:id', albumController.album);

module.exports = router;