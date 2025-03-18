const Razorpay = require('razorpay');
const { RAZORPAY_ID_KEY, RAZORPAY_SECRET_KEY } = process.env;
const Order = require('../models/Order'); 

const razorpayInstance = new Razorpay({
    key_id: RAZORPAY_ID_KEY,
    key_secret: RAZORPAY_SECRET_KEY
});

const createOrder = async (req, res) => {
    try {
        const amount = req.body.amount *100;
        const options = {
            amount: amount,
            currency: 'INR',
            receipt: 'razorUser@gmail.com'
        }

        razorpayInstance.orders.create(options,
            async (err, order) => {
                if (!err) {
                    // Save order details 
                    const newOrder = new Order({
                        orderId: order.id,
                        amount: amount/100,
                        productName: req.body.productname,
                        contact: req.body.mobile,
                        name: req.body.name,
                        email: req.body.email
                    });

                    res.status(200).send({
                        success: true,
                        msg: 'Order Created',
                        order_id: order.id,
                        amount: amount,
                        key_id: RAZORPAY_ID_KEY,
                        product_name: req.body.productname,
                         contact: req.body.mobile,
                        name: req.body.name,
                        email: req.body.email
                    });
                    
                    
                } else {
                    res.status(400).send({ success: false, msg: 'Something went wrong!' });
                }
            }
        );

    } catch (error) {
        console.log(error.message);
    }
}

module.exports = {
    createOrder
}
