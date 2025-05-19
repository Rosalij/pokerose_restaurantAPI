
//public food routes

const express = require('express');
const router = express.Router();

const Food = require('../models/food.js');


router.get('/food', async (req, res) => {
    try {
        const food = await Food.find();
        res.status(200).json(food);

    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router