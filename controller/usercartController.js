
const CartItem = require('../models/cartModel');
const Product = require('../models/productModel');
exports.getCartCount = async (req, res) => {
  const { username } = req.session;
  try {
     
      const cartCount = await CartItem.countDocuments({ userName: username }); 
      res.json(cartCount); 
  } catch (error) {
      console.error('Error fetching cart count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
};

exports.addToCart = async (req, res) => {
  const { productName } = req.params; 
  const { username } = req.session;
  
  try {
    const product = await Product.findOne({productName});
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
        let cartItem = await CartItem.findOne({ productName, userName: username });
    if (cartItem) {
      cartItem.productQuantity = Number(cartItem.productQuantity) + 1; 
    } else {
      cartItem = new CartItem({
        productName: product.productName,
        productDescription: product.productDescription,
        productImage: product.productImage,
        productPrice: product.productPrice,
        productQuantity: 1,  
        userName: username,
      });
    }
    const savedCartItem = await cartItem.save();
    res.status(201).json(savedCartItem);
  } catch (err) {
    console.error('Error adding to cart:', err);
    res.status(500).json({ message: 'Internal server error' });
  }
};


exports.getCartItems = async (req, res) => {
  try {
    const username=req.session.username;
      const cartitems = await CartItem.find({userName: username});
      let grandTotal = 0;
    cartitems.forEach(cart => {
        grandTotal += cart.productQuantity * cart.productPrice;
    });
      res.render('cart', { cartitems, grandTotal, username });
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Error fetching cart');
  }
};


exports.updateCartItemQuantity = async (req, res) => {
  const cartId = req.params.cartId;
  const newQuantity = req.body.quantity;

  try {
      const cartItem = await CartItem.findById(cartId);

      if (!cartItem) {
          return res.status(404).json({ message: 'Cart item not found' });
      }

      cartItem.productQuantity = newQuantity;
      await cartItem.save();

      res.status(200).json({ message: 'Quantity updated successfully' });
  } catch (error) {
      console.error('Error updating quantity:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};

exports.deleteCartItem = async (req, res) => {
  const cartId = req.params.cartId;
  const username = req.session.username;
  console.log(username);
  try {
      
    const deletedproduct = await CartItem.findByIdAndDelete( {_id: cartId , userName: username} );
    if (deletedproduct) {
        return res.status(200).send('Cartproduct deleted successfully');
    } else {
        return res.status(404).send('cartproduct not found');
    }
  } catch (error) {
      console.error('Error deleting product:', error);
      res.status(500).send('Server error');
  }
};

exports.deleteAllCartItems = async (req, res) => {
  const username = req.session.username;
  try {
      await CartItem.deleteMany({ userName: username});

      res.status(200).json({ message: 'All cart items deleted successfully' });
  } catch (error) {
      console.error('Error deleting cart items:', error);
      res.status(500).json({ message: 'Internal server error' });
  }
};



