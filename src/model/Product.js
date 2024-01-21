const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');

const ProductSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productImage: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const product = mongoose.model("Products", ProductSchema);

module.exports = product;
