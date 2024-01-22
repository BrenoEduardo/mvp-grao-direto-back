const { ObjectId } = require('mongodb');
const mongoose = require('../database/index');

const ProductSchema = new mongoose.Schema({
    userId: {
        type: ObjectId,
    },
    productType: {
        type: String,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    productPrice: {
        type: Number,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },
    productImage: {
        type: String,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const product = mongoose.model("Products", ProductSchema);

module.exports = product;
