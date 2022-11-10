const express = require('express');
const router = express.Router();
const albumController = require('../controllers/album.controller');

/**
 * Route vers la création d'un album.
 */
router.get('/albums/create', albumController.createAlbumForm);

/**
 * Route qui traite le formulaire de création d'album.
 */
router.post('/albums/create', albumController.createAlbum);

module.exports = router;