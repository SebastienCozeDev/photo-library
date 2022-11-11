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

/**
 * Route vers l'affichage d'un album spécifique.
 */
router.get('/albums/:id', albumController.album);

/**
 * Route qui traite l'upload d'une nouvelle image dans un album.
 */
router.post('/albums/:id', albumController.addImage);

module.exports = router;