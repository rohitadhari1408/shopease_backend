const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: String,
  quantity: Number,
  price: Number,
  category: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Product', productSchema);
