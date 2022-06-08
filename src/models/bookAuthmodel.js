const mongoose = require('mongoose');

const authBookSchema = new mongoose.Schema({
    Name: String,
    author_id: Number,
    price: Number,
    ratings: Number
}, { timestamps: true });

module.exports = mongoose.model('BookAuth', authBookSchema)