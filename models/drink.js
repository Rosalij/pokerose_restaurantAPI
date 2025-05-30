
const mongoose = require('mongoose');

//mongodb drinks schema
//this schema is used for drinks in menu
const drinkSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },

    price: {
        type: String,
        required: true
    },

    created: {
        type: Date,
        default: Date.now()
    }


});
const Drink = mongoose.model("Drink", drinkSchema);
module.exports = Drink