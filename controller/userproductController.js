const Product = require('../models/productModel');

exports.getProductByCategory = async (req, res) => {
    try {
      const categoryName = req.query.categoryName; 
      const username = req.session.username;
      
      const products = await Product.find({ categoryName }); 
    
      res.render('product', { products, username}); 
    } catch (error) {
      console.error(error);
      res.status(500).send('Internal Server Error');
    }
  };
