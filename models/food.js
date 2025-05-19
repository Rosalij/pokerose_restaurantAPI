
const mongoose = require('mongoose');

//mongodb drinks schema
//this schema is used for food in menu
const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },


    price: {
        type: String,
        required: true
    },

    description: {
        type: String,
        required: true,
    },

    created: {
        type: Date,
        default: Date.now()
    }

});
const Food = mongoose.model("Food", foodSchema);
module.exports = Food