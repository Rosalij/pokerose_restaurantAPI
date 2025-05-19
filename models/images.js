
const mongoose = require('mongoose');

//mongodb drinks schema
//this schema is used for images in gallery
const imageSchema = new mongoose.Schema({
    imageurl: {
        type: String,
        required: true,
    },


    description: {
        type: String,
        required: true
    },

});
const Image = mongoose.model("Image", imageSchema);
module.exports = Image