const mongoose = require('mongoose');

/**
 * Schéma pour un album.
 */
const albumSchema = new mongoose.Schema({
    title: { type: String, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);