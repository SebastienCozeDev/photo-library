const User = require('../models/User');
const catchAsync = require('../helpers/catchAsync');

/**
 * Permet de voir le profil d'un utilisateur.
 */
const viewProfile = catchAsync(async (req, res) => {
    try {
        const idUser = req.params.id;
        const objectUser = await User.findById(idUser);
        res.render('user/profile', {
            title: objectUser.nickname,
            user: objectUser,
        });
    } catch (err) {
        console.log(err);
        res.redirect('/404');
    }
});

/**
 * Permet de voir le formulaire de connexion.
 */
const viewLogin = catchAsync(async (req, res) => {
    res.render('user/login', {
        title: "Connexion",
        errors: req.flash('error'),
    });
});

/**
 * Permet à l'utilisateur de se connecter.
 */
const loginUser = catchAsync(async (req, res) => {
    try {
        if (!req.body.email) {
            req.flash('error', 'L\'adresse mail est obligatoire pour se connecter.');
            res.redirect('/users/login');
            return;
        } else if (!req.body.password) {
            req.flash('error', 'Le mot de passe est obligatoire pour se connecter.');
            res.redirect('/users/login');
            return;
        } else {
            // TODO A enlever
            console.error(err);
            req.flash('error', 'La connexion est indisponible pour le moment.');
            res.redirect('/users/login');
        }
    } catch (err) {
        console.error(err);
        req.flash('error', 'Erreur lors de la connexion.');
        res.redirect('/login');
    }
});

module.exports = {
    viewProfile,
    viewLogin,
    loginUser,
};
