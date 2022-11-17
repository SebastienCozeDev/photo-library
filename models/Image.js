const mongoose = require('mongoose');

/**
 * Schéma pour une image.
 */
const imageSchema = new mongoose.Schema({
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    typeStr: {
        type: String,
        enum: [
            'PNG',
            'JPEG',
            'JPG',
            'SVG',
            'GIF',
            'BMP',
        ],
    },
    album: {
        type: mongoose.Types.ObjectId,
        ref: "Album",
        required: true,
    }
});

module.exports = mongoose.model('Image', imageSchema);