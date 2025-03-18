//------------------------checkout page
const CartItem = require('../models/cartModel');
const User = require('../models/User');

exports.getCheckoutPage = async (req, res) => {
  try {
    const username=req.session.username;
      const cartitems = await CartItem.find({userName: username});
      const users = await User.findOne({ username: username });
      let grandTotal = 0;
      console.log(users);
    cartitems.forEach(cart => {
        grandTotal += cart.productQuantity * cart.productPrice;
    });
    console.log(users);
      res.render('checkoutpage', { cartitems, grandTotal, username , users });
  } catch (error) {
      console.error('Error fetching cart:', error);
      res.status(500).send('Error fetching cart');
  }
};
