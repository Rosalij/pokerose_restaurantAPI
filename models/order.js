
const mongoose = require('mongoose');

//mongodb post schema
//this schema is used for takeaway orders
const orderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phoneno: {
        type: String,
        required: true
    },

    food: {
        type: String,
    },

    drink: {
        type: String,
    },

    note: {
        type: String,
    },

    created: {
        type: Date,
        default: Date.now()
    }
});
const Order = mongoose.model("Order", orderSchema);
module.exports = Order