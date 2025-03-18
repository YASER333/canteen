const mongoose = require('mongoose');

const cartItemSchema = new mongoose.Schema({ 
  userName: String,
  productName: String,
  productImage: 
  {
    data: Buffer,
    contentType: String
  }, 
  productPrice: Number,
  productDescription: String,
  productQuantity: String 
});

const CartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = CartItem;