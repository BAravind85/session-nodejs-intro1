const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookName: {
        type: String,
        required: true
    },
    AuthorName: {
        type: String,
        required: true
    },
    category: String,
    year: Number


}, { timestamps: true });
module.exports = mongoose.model('Book', bookSchema)