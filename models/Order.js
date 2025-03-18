const mongoose = require('mongoose');


const orderSchema = new mongoose.Schema({
    orderId: {
        type: String,
        required: false
    },
    amount: {
        type: Number,
        required: true
    },
    productName: {
        type: String,
        required: true
    },
    
    contact: {
        type: String
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    status: String ,   // Add more fields as needed
    purchaseDate: { type: Date }
});

// Create a model using the schema
const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
