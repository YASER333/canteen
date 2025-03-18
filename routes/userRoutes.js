const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Product = require('../models/productModel');
const Aboutus = require('../models/aboutUs');


//AuthenticateToken function--------------
const authenticateToken = async (req, res, next) => {
    const token = req.cookies.token;
  
    if (!token) {
      return res.redirect('/login');
    }
  
    jwt.verify(token, 'secret_key', async (err, decoded) => {
      if (err) {
        return res.redirect('/login');
      }
  
      try {
        const user = await User.findById(decoded.userId);
        if (!user) {
          return res.redirect('/login');
        }
  
        req.user = { userId: decoded.userId, username: user.username };
        next();
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
      }
    });
  };
  router.get('/logout', (req, res) => {
    res.clearCookie('token');
    res.redirect('/login');
  });
  
  router.get('/signup', (req, res) => {
    res.redirect('/signup');
  });
  
  const Category = require('../models/categoryModel');
  //---------------------------------------Home page rendering-------------------------------------
  router.get('/', authenticateToken, async (req, res) => {
    try {
      const user = await User.findById(req.user.userId).exec();
      
      if (!user) {
        return res.redirect('/login');
      }
      const categories = await Category.find({},'categoryID categoryName categoryImage categoryDescription');
      const aboutUsContent = await Aboutus.findOne({}, 'content');
      const products = await Product.aggregate([{ $sample: { size: 6 } }]); 
      req.session.username=user.username;

      res.render('index', { username: user.username, categories, aboutUsContent , products});

    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  });
//------------------------------------user profile---------------------------------------
const userprofileController = require('../controller/userprofileController');
router.get('/myprofile', userprofileController.getmyprofilepage);
router.put('/updatemyprofile/:userId', userprofileController.updatemyprofilepage);

  //------------------------------------product page--------------------------------------------
const userproductController = require('../controller/userproductController');
router.get('/product', userproductController.getProductByCategory);

//---------------------------------------contactus---------------------------------------------
const contactController = require('../controller/usercontactController');
router.post('/contact', contactController.submitContactForm);

//-----------------------------------------cart-----------------------------------------------
const cartController = require('../controller/usercartController');
router.get('/cart', cartController.getCartItems);
router.get('/cart-count', cartController.getCartCount);
router.post('/add-to-cart/:productName', cartController.addToCart);
router.delete('/deletecartproduct/:cartId', cartController.deleteCartItem);
router.delete('/deleteAllCartItems', cartController.deleteAllCartItems);
router.put('/updateCartItem/:cartId', cartController.updateCartItemQuantity); 

//---------------------------------------------checkout page----------------------------------------------
const checkoutController = require('../controller/usercheckoutController');
router.get('/checkout', checkoutController.getCheckoutPage);

//------------------------------------------------order page----------------------------------------------
const orderController = require('../controller/userorderController');
router.get('/myorders', orderController.getMyOrders);

//---------------------------------------------------user feedback page-----------------------------------------------
const feedbackController = require('../controller/userfeedbackController');
router.get('/feedback', feedbackController.getFeedbackPage);
router.post('/submit-feedback', feedbackController.submitFeedback);
  

  module.exports = router;
  