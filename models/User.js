const mongoose = require('mongoose');

/**
 * Schéma pour un utilisateur.
 */
const userSchema = new mongoose.Schema({
    nickname: {type: String, required: true},
    password: {type: String, required: true},
    isAdmin: Boolean,
}, { timestamps: true });

module.exports = mongoose.model('User', userSchema);