const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const orderSchema = new Schema({
    date: { type: String, required: true },
    products: { type: Array, required: true },
    totalPrice: { type: Number, required: true },
    userId: { type: String, required: true }
}, {
    timestamps: true,
});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;