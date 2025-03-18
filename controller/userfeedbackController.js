
const Feedback = require('../models/feedbackModel');

exports.getFeedbackPage = (req, res) => {
  res.render('feedback');
};

exports.submitFeedback = async (req, res) => {
    const { feedbacktext, starrating } = req.body;
    const username = req.session.username;
    try {
        const feedback = new Feedback({
          feedbacktext,
            starrating,
            username,
        });
        await feedback.save();
        res.redirect('/');
    } catch (err) {
        res.status(500).send('Error saving feedback.');
    }
};
