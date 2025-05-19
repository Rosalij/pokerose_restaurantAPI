
const mongoose = require('mongoose');

//mongodb drinks schema
//this schema is used for images in gallery
const imageSchema = new mongoose.Schema({
    imageurl: {
        type: String,
        required: true,
    },


    desrciption: {
        type: Number,
        required: true
    },

});
const Image = mongoose.model("Image", imageSchema);
module.exports = Image