
//public drink routes

const express = require('express');
const router = express.Router();

const Drink = require('../models/drink.js');


router.get('/drink', async (req, res) => {
    try {
        const drink = await Drink.find();
        res.status(200).json(drink);

    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

module.exports = router