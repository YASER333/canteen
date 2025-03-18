// contactUsModel.js
const mongoose = require('mongoose');

const contactUsSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  subject: String,
  message: String,
});

const ContactUs = mongoose.model('ContactUs', contactUsSchema);

module.exports = ContactUs;