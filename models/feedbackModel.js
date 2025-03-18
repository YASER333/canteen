const mongoose = require('mongoose');

const feedbackSchema = new mongoose.Schema({
    feedbacktext: String,
    username: String,
    starrating: Number
});

const Feedback = mongoose.model('Feedback', feedbackSchema);

module.exports = Feedback;