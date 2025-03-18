const AboutUs = require('../models/aboutUs'); 
const ContactUs = require('../models/contactus');

exports.getaboutus = async (req, res) => {
  try {

// check old document
    const existingAboutUs = await AboutUs.findOne();

    // Render the page and pass 
    res.render('admin/aboutus', { aboutUsContent: existingAboutUs ? existingAboutUs.content : '' });
  } catch (error) {
    res.status(500).send('Error fetching AboutUs content.');
  }
};



exports.updateaboutus = async (req, res) => {
  try {
    const { aboutus } = req.body;

    let existingAboutUs = await AboutUs.findOne();

    if (!existingAboutUs) {
      //  create a new one******
      const newAboutUs = new AboutUs({
        content: aboutus,
      });

      await newAboutUs.save();
      res.status(201).send('AboutUs content saved successfully!');
    } else {
      // If a document exists, update its content
      existingAboutUs.content = aboutus;
      await existingAboutUs.save();
      res.status(200).send('AboutUs content updated successfully!');
    }
  } catch (error) {
    res.status(500).send('Error saving/updating AboutUs content.');
  }
};

exports.getcontactus = async (req, res) => {
  try {
      const user = await ContactUs.find({}, 'name email phone subject message');
      res.render('admin/userqueries', { user });
  } catch (error) {
      console.error('Error fetching category:', error);
      res.status(500).send('Error fetching category');
  }
};


