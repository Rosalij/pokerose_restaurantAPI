
const mongoose = require('mongoose');

//mongodb post schema
//this schema is used for takeaway orders
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },

    food: {
        type: string,
    },

    drink: {
        type: string,
    },

    created: {
        type: Date,
        default: Date.now()
    }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order