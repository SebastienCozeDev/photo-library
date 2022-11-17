const mongoose = require('mongoose');

/**
 * Schéma pour une image.
 */
const imageASchema = new mongoose.Schema({
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    typeStr: {
        type: String,
        enum: [
            'image/jpeg',
            'image/png',
        ],
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "Album",
        required: true,
    }
});

module.exports = mongoose.model('ImageA', imageASchema);