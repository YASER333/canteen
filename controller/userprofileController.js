const User = require('../models/User');

exports.getmyprofilepage = async (req, res) => {
    const username = req.session.username;
    try {
        const user = await User.findOne({ username: username });
        console.log(user);

        res.render('userprofile', { user , username });
    } catch (error) {
        console.error('Error fetching user:', error);
        res.status(500).send('Error fetching user');
    }
};
exports.updatemyprofilepage = async (req, res) => {
    const userId = req.params.userId;  
    try {
        const userToUpdate = await User.findByIdAndUpdate(userId, {
            email: req.body.email,
            phonenumber: req.body.phonenumber
        }, { new: true }); 
  
        if (!userToUpdate) {
            return res.status(404).json({ message: 'user not found' });
        }
  
        res.status(200).json({ message: 'user updated successfully', updatedUser: userToUpdate });
    } catch (error) {
        console.error('Error updating user:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
  };
  
