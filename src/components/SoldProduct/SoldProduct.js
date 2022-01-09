const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 * Schema
 */
const soldProduct = new Schema({
    // Schema attributes are defined here
    _id: mongoose.Types.ObjectId,
    name: String,
    producer: String,
    quantity: Number,
}, { timestamps: true, versionKey: false });


module.exports = mongoose.model('sold_product', soldProduct, 'sold_product');