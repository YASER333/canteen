const express = require('express');
const router = express.Router();
const paymentController = require('../controller/paymentController');
router.post('/createOrder', paymentController.createOrder);
const Order = require('../models/Order');
const Cart = require('../models/cartModel');
const Product = require('../models/productModel');
router.post('/saveOrderDetails', async (req, res) => {
    try {
        const { mobile, email, productname, amount } = req.body;
    const orderId = req.body.orderId;
    const name =req.body.name;
 
        const products = productname.split(', '); 

        const newOrder = new Order({
          orderId: orderId,
            name: name,
            contact: mobile,
            email: email,
            productName: productname,
            amount: amount/100,
            purchaseDate: new Date()
        });

        await newOrder.save();

        for (const product of products) {
          const [productName, productStock] = product.split(' - '); 
          console.log(productName,productStock);

          const foundProduct = await Product.findOne({ productName: productName });
          if (foundProduct) {
              foundProduct.productStock -= parseInt(productStock); 
              await foundProduct.save(); 
          }
        }
        await Cart.deleteMany({ userName: name });

        res.status(200).json({ success: true, message: 'Order details saved successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: 'Failed to save order details' });
    }
});

module.exports = router;