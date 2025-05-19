//public image route

const express = require('express');
const router = express.Router();
const Image = require('../models/images.js');

//get all images
router.get('/image', async (req, res) => {
    try {
        const image = await Image.find();
        res.status(200).json(image);

    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router