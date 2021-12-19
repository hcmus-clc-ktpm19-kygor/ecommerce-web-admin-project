const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema( {
  // Schema attributes are defined here
  name: { type: String },
  status: { type: String },
  shipping_fee: { type: Number },
  price: Number,
  address: String,
  customer: Object,
  payment: String
}, { timestamps: true, versionKey: false });

// Create order model in db
module.exports = mongoose.model('order', orderSchema, 'order');