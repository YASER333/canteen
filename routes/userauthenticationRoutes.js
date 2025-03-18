const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
router.get('/signup', (req, res) => {
  res.render('signup', { message: req.flash('error') });
});
router.post('/signup', async (req, res) => {
  try {
    const { username, password, email, phonenumber } = req.body;
    const existingUser = await User.findOne({  email });
    if (existingUser) {
      req.flash('error', 'Username or email already exists. Please choose a different username or email.');
      return res.redirect('/signup');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      email,
      phonenumber,
    });
    await user.save();
    res.redirect('/login');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});
router.get('/login', (req, res) => {
  res.render('login', { message: req.flash('error') });
});
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/login');
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      req.flash('error', 'Invalid username or password');
      return res.redirect('/login');
    }
    const token = jwt.sign({ userId: user._id }, 'secret_key', { expiresIn: '1h' });

    res.cookie('token', token);

    res.redirect('/');
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

 module.exports = router;


