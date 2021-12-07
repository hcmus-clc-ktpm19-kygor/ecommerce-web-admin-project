const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
  // Schema attributes are defined here
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: String,
  phone: { type: String, required: true },
  address: String,
  email: String,
  account_status: { type: Boolean, default: true },
}, { timestamps: true, versionKey: false });

// Create account model in db
module.exports = mongoose.model('admin', adminSchema, 'admin');