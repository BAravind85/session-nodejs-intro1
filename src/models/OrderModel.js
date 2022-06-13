const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId

const OrderSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
        ref: "User1"
    },
    productId: {
        type: ObjectId,
        ref: "Product"
    },
    amount: Number,
    isFreeAppUser: Boolean,
    Date: String

}, { timestamps: true });

module.exports = mongoose.model('Order', OrderSchema)