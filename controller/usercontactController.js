const ContactUs = require('../models/contactus');
exports.submitContactForm = async (req, res) => {
  try {
    const { name, email, phone, subject, message } = req.body;

    const newContact = new ContactUs({
      name,
      email,
      phone,
      subject,
      message,
    });

    await newContact.save();

    res.status(200).send('Message sent successfully!');
  } catch (error) {
    console.error(error);
    res.status(500).send('Error sending message. Please try again.');
  }
};