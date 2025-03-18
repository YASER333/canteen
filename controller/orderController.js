const Order = require('../models/Order');

exports.getmanageorders = async (req, res) => {
    try {
        const orders = await Order.find({}).sort({ purchaseDate: -1 }); 
  
        res.render('admin/vieworder', { orders });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).send('Error fetching products');
    }
  };
  
  // Update status route************
exports.updateorderstatus =  async (req, res) => {
      const { orderId } = req.params;
      const { status } = req.body;

    
      try {
          const order = await Order.findOneAndUpdate(
            { _id: orderId }, 
            { $set: { status } },
            { new: true }
          );
  
          if (!order) {
              return res.status(404).json({ message: 'Order not found' });
          }
  
          return res.status(200).json({ message: 'Status updated successfully', order });
      } catch (error) {
          console.error('Error updating status:', error);
          return res.status(500).json({ message: 'Internal Server Error' });
      }
  };
  
  