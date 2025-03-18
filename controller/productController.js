const Product = require('../models/productModel');
const Category = require('../models/categoryModel'); 
var fs = require('fs');
var path = require('path');


exports.getAddProduct = async (req, res) => {
  try {
    const categories = await Category.find({}, 'categoryName -_id'); 
    res.render('admin/addproduct', { 
      message: req.flash('error'),
      categories: categories 
    });
  } catch (error) {
    req.flash('error', 'Error fetching categories');
    res.redirect('/addproduct');
  }
};


exports.postAddProduct = (req, res) => {
  const { productId, productName, categoryName, productPrice, productDescription } = req.body;

  Product.exists({ productId: productId })
    .then((exists) => {
      if (exists) {
        req.flash('error', 'Product ID already exists');
        return res.redirect('/addproduct');
      } else {
        const newProduct = new Product({
          productId: productId,
          productName: productName,
          categoryName: categoryName,
          productImage: {
            data: fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)),
            contentType: 'image/png'
          }, 
          productPrice: productPrice, 
          productDescription: productDescription 
        });
       
        newProduct.save()
          .then(() => {
            req.flash('success', 'Product added successfully');
            return res.redirect('/addproduct');
          })
          .catch((err) => {
            req.flash('error', 'Error adding product');
            return res.redirect('/addproduct');
          });
      }
    })
    .catch((err) => {
      req.flash('error', 'Error checking product existence');
      return res.redirect('/addproduct');
    });
};


exports.getModifyProduct = async (req, res) => {
  try {
    // Render the modifyproduct.ejs 
    res.render('admin/modifyproduct');
  } catch (error) {
    req.flash('error', 'Error rendering modify product page');
    res.redirect('/admindashboard'); 
  }
};

exports.getModifyProduct = async (req, res) => {
  try {
      const products = await Product.find({});

      res.render('admin/modifyproduct', { products });
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
  }
};

exports.deleteproduct = async (req, res) => {
  const productId = req.params.productId;
  try {
      
    const deletedproduct = await Product.findByIdAndDelete(productId);
    if (deletedproduct) {
        return res.status(200).send('Product deleted successfully');
    } else {
        return res.status(404).send('product not found');
    }
  } catch (error) {
      console.error('Error deleting uproduct:', error);
      res.status(500).send('Server error');
  }
};

exports.updateProduct = async (req, res) => {
  const productId = req.params.productId; 
  try {
      // Find the product byID 
      const productToUpdate = await Product.findByIdAndUpdate(productId, {
          productName: req.body.productName,
          categoryName: req.body.categoryName,
          productPrice: req.body.productPrice,
          productDescription: req.body.productDescription
      }, { new: true }); 

      if (!productToUpdate) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Product updated successfully', updatedProduct: productToUpdate });
  } catch (error) {
      console.error('Error updating product:', error);
      res.status(500).json({ message: 'Failed to update product' });
  }
};


exports.getmanagestock = async (req, res) => {
  try {
      const products = await Product.find({});

      res.render('admin/managestock', { products });
  } catch (error) {
      console.error('Error fetching products:', error);
      res.status(500).send('Error fetching products');
  }
};
exports.managestock = async (req, res) => {
  const productId = req.params.productId; 
  try {
      const productToUpdate = await Product.findByIdAndUpdate(productId, {
          
          productStock: req.body.productStock
      }, { new: true }); 

      if (!productToUpdate) {
          return res.status(404).json({ message: 'Product not found' });
      }

      res.status(200).json({ message: 'Stock updated successfully', updatedProduct: productToUpdate });
  } catch (error) {
      console.error('Error updating Stock:', error);
      res.status(500).json({ message: 'Failed to update Stock' });
  }
};





