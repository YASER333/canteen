const mongoose = require('mongoose');

const connectDB = async () => {
    try{
        const con = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
             useUnifiedTopology: true,
        })
        createIndex();

        console.log(`MongoDB connected : ${con.connection.host}`);
    }catch(err){
        console.log(err);
        process.exit(1);
    }
}
const Order = require('../models/Order'); 

async function createIndex() {
    try {
        await Order.collection.createIndex({ purchaseDate: -1 });
    } catch (error) {
        console.error('Error creating index:', error);
    }
}

module.exports = connectDB;