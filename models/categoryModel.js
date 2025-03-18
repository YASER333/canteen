const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  categoryID: {
    type: String,
    required: true,
    unique: true 
  },
  categoryDescription: String,
  categoryName: String,
  categoryImage:
    {
      data: Buffer,
      contentType: String
  }
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;