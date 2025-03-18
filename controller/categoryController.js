// controllers/categoryController.js
const Category = require('../models/categoryModel');
var fs = require('fs');
var path = require('path');


exports.getAddCategory = (req, res) => {
  res.render('admin/addcategory', { message: req.flash('error') });
};

exports.postAddCategory = (req, res) => {
  const { categoryid, categoryname,  categoryDescription} = req.body;

  Category.exists({ categoryID: categoryid })
    .then((exists) => {
      if (exists) {
        req.flash('error', 'Category ID already exists');
      } else {
        const newCategory = new Category({
          categoryID: categoryid,
          categoryName: categoryname,
          categoryDescription: categoryDescription,
          categoryImage: {
            data: fs.readFileSync(path.join(__dirname + '../../uploads/' + req.file.filename)),
            contentType: 'image/png'
          }
        });

        newCategory.save()
          .then(() => {
            req.flash('success', 'Category added successfully');
          })
          .catch((err) => {
            req.flash('error', 'Error adding category');
          });
      }
      res.redirect('/addcategory');
    })
    .catch((err) => {
      req.flash('error', 'Error checking category existence');
      res.redirect('/addcategory');
    });
  
};

exports.getcategory = async (req, res) => {
    try {
        const category = await Category.find({}, 'categoryID categoryName categoryImage categoryDescription');
        res.render('admin/managecategory', { category });
    } catch (error) {
        console.error('Error fetching category:', error);
        res.status(500).send('Error fetching category');
    }
 };
 
exports.managecategory = async (req, res) => {
  const categoryId = req.params.categoryId;
  try {
      
    const deletedcategory = await Category.findByIdAndDelete(categoryId);
    if (deletedcategory) {
        return res.status(200).send('Category deleted successfully');
    } else {
        return res.status(404).send('Category not found');
    }
  } catch (error) {
      console.error('Error deleting Category:', error);
      res.status(500).send('Server error');
  }
};


