const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    Balance: {
        type: Number,
        default: 100
    },
    address: String,
    age: Number,
    Gender: {
        enum: ['male', 'female', 'others']
    },
    isFreeAppUser: {
        type: Boolean,
        default: false
    }

}, { timestamps: true });

module.exports = mongoose.model('User1', UserSchema)