const mongoose = require('mongoose');

/**
 * Schéma pour un album.
 */
const albumSchema = new mongoose.Schema({
    title: { type: String, required: true },
    images: [String],
}, { timestamps: true });

module.exports = mongoose.model('Album', albumSchema);