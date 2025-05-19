require('dotenv').config();
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const Admin = require('../models/admin.js');
const Food = require('../models/food.js');
const Drink = require('../models/drink.js');
const Order = require('../models/order.js');
const Image = require('../models/images.js');
const authenticateToken = require('../authToken.js');


//login route
router.post('/login', async (req, res) => {
    try {

        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }
        //check if user exists
        const admin = await Admin.findOne({ username: username });
        if (!admin) {
            return res.status(401).json({ message: "Invalid username or password" });
        }

        //compare password
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            //password doesnt match
            return res.status(401).json({ message: "Invalid username or password" });
        } else {
            //password does match
            //create token   
            const payload = { username: username };
            const token = jsonwebtoken.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
            //remove password from user object
            const adminWithoutPassword = await Admin.findOne({ username }, { password: 0 });

            //send response with token
            const response = {

                admin: adminWithoutPassword,
                token: token,
                message: "user logged in successfully",
            }
            res.status(200).json(response);
        }

        //if error
    } catch (error) {
        console.error("Error during login:", error);
        res.status(500).json({ error: "server error" });
    }
});

//store a new user
router.post('/register', async (req, res) => {
    try {
        //get data from request
        const { username, password } = req.body;
        //validate input
        if (!username || !password) {
            return res.status(400).json({ error: "Username and password are required" });
        }

        //check if user already exists
        const existingAdmin = await Admin.findOne({ username });
        if (existingAdmin) {
            //user already exists
            return res.status(400).json({ error: "Username already exists" });
        }

        //hash password with bcrypt
        const hashedPassword = await bcrypt.hash(req.body.password, 10);


        //create new user   
        const newAdmin = new Admin({
            username: username,
            password: hashedPassword
        });
        
        //save user to database 
        await newAdmin.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error during registration:", error);
        res.status(500).json({ error: "Server error" });
    }
});


module.exports = router