const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controller');

router.get('/login', userController.viewLogin);

router.post('/login', userController.loginUser);

router.get('/:id', userController.viewProfile);

module.exports = router;