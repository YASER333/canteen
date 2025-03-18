const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productId: {
    type: String,
    required: true,
    unique: true 
  },
  categoryName: String,
  productName: String,
  productImage: {
    data: Buffer,
    contentType: String
  },
  productPrice: Number, 
  productDescription: String, 
  productStock: Number,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
