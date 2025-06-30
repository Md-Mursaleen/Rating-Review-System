const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  rating: Number,
  src: String,
  id: Number,
});

module.exports = mongoose.model('Product', productSchema);
