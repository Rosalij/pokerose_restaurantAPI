
//public order routes

const express = require('express');
const router = express.Router();

const Order = require('../models/order.js');
const Food = require('../models/food.js');
const Drink = require('../models/drink.js');

 
//get both drink and food menu names for order forms
router.get('/menu', async (req, res) => {
  try {
    const food = await Food.find({}, 'name');   // Only return the name field
    const drink = await Drink.find({}, 'name');

    res.json({ food, drink });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

//post new order
router.post('/order', async (req, res) => {
    try {
        //get data from request
        const name = req.body.name;
        const phoneno = req.body.phoneno;
        const drink = req.body.drink;
        const food = req.body.food;
        const note = req.body.note;
    

        //validate input
        if (!name || !phoneno ) {
            return res.status(400).json({ error: "name and phone number required" });
        }

        const newOrder = new Order({
            name: name,
            phoneno: phoneno,
            drink: drink,
            food: food,
            note: note,
        });

        //save order to database
        await newOrder.save();
        res.status(201).json({ message: "Order created successfully" });
    } catch (error) {
        console.error("Error during order creation:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router