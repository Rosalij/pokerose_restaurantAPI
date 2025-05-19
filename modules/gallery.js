
const mongoose = require('mongoose');

//mongodb drinks schema
//this schema is used for images in gallery
const gallerySchema = new mongoose.Schema({
    imageurl: {
        type: String,
        required: true,
    },


    desrciption: {
        type: Number,
        required: true
    },

});
const gallery = mongoose.model("gallery", gallerySchema);
module.exports = gallery