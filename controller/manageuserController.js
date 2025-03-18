const User = require('../models/User');

exports.getmanageuser = async (req, res) => {
    try {
        const users = await User.find({}, 'username phonenumber email');
        res.render('admin/manageuser', { users });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
 };
 

// Express route handling deletion of users by ID
exports.deleteUser = async (req, res) => {
  const userId = req.params.userId;
  try {
      
    const deletedUser = await User.findByIdAndDelete(userId);
    if (deletedUser) {
        return res.status(200).send('User deleted successfully');
    } else {
        return res.status(404).send('User not found');
    }
  } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).send('Server error');
  }
};


const Order = require('../models/Order');

exports.gettrackuserhistory = async (req, res) => {
    try {

// amount paid for count of orders**************************
        const pipeline = [
            {
                $group: {
                    _id: "$name", 
                    totalAmountPaid: { $sum: "$amount" }, 
                    totalOrders: { $sum: 1 }, 
                    latestPurchaseDate: { $max: "$purchaseDate" } 
                }
            }
        ];

        const userData = await Order.aggregate(pipeline);

        res.render('admin/trackuserhistory', { userData });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).send('Error fetching user details');
    }
};

const Feedback = require('../models/feedbackModel')
exports.getuserfeedback = async (req, res) => {
    try {
        const feedback = await Feedback.find({});
        res.render('admin/feedbackhistory', { feedback });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Error fetching users');
    }
 };
 