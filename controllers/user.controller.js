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

module.exports = {
    viewProfile,
};