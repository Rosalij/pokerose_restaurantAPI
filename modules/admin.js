const mongoose = require('mongoose');

//mongodb post schema
//this schema is used to store admin users

const adminSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
    
    created: {
        type: Date,
        default: Date.now()
    }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order