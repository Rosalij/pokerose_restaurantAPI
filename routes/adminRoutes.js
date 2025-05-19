
/**
 * Admin routes for:
 * POST register
 * POST login
 * POST image
 * POST drink
 * POST food 
 * PATCH food 
 * PATCH drink 
 * PATCH order 
 * GET order
 * DELETE order
 * DELETE drink
 * DELETE food
 * DELETE image
 */

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
const upload = require('../multer.js'); // memory or disk multer
const cloudinary = require('../cloudinary.js');


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


//post new food item to menu
router.post('/food', authenticateToken, async (req, res) => {
    try {
        //get data from request
        const name = req.body.name;
        const description = req.body.description;
        const price = req.body.price;

        //validate input
        if (!name || !description || !price) {
            return res.status(400).json({ error: "You must fill in all fields" });
        }

        const newFood = new Food({
            name: name,
            description: description,
            price: price,
        });

        //save post to database
        await newFood.save();
        res.status(201).json({ message: "Food item created successfully" });
    } catch (error) {
        console.error("Error during food item creation:", error);
        res.status(500).json({ error: "Server error" });
    }
});


//post new drink to menu
router.post('/drink', authenticateToken, async (req, res) => {
    try {
        //get data from request
        const name = req.body.name;
        const price = req.body.price;

        //validate input
        if (!name || !price) {
            return res.status(400).json({ error: "You must fill in all fields" });
        }

        const newDrink = new Drink({
            name: name,
            price: price,
        });

        //save post to database
        await newDrink.save();
        res.status(201).json({ message: "Drink item created successfully" });
    } catch (error) {
        console.error("Error during drink item creation:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//post new image to gallery
router.post('/image', authenticateToken, async (req, res) => {
    try {
        //get data from request
        const imageurl = req.body.imageurl;
        const description = req.body.description;
    

        //validate input
        if (!imageurl || !description ) {
            return res.status(400).json({ error: "You must fill in all fields" });
        }

        const newImage = new Image({
            imageurl: imageurl,
            description: description
        });

        //save post to database
        await newImage.save();
        res.status(201).json({ message: "Image created successfully" });
    } catch (error) {
        console.error("Error during image creation:", error);
        res.status(500).json({ error: "Server error" });
    }
});

//rotue to add new image, using cloudinary and multer to upload and create URL
router.post('/image', authenticateToken, upload.single('image'), async (req, res) => {
  try {
    const file = req.file;
    const description = req.body.description;

    if (!file || !description) {
      return res.status(400).json({ error: "Image file and description are required" });
    }
//upload to cloudinary
    const base64 = `data:${file.mimetype};base64,${file.buffer.toString('base64')}`;
    const result = await cloudinary.uploader.upload(base64, {
      folder: 'restaurant_gallery',
    });

    const newImage = new Image({
      imageurl: result.secure_url,
      description: description,
    });

    await newImage.save();
    res.status(201).json({ message: "Image uploaded and saved", image: newImage });

  } catch (error) {
    console.error("Error uploading and saving image:", error);
    res.status(500).json({ error: "Server error" });
  }
});



//get all orders
router.get('/order', authenticateToken, async (req, res) => {
    try {
        const order = await Order.find();
        res.status(200).json(order);

    }
    catch (error) {
        res.status(500).json({ error: "Server error" });
    }
});

/*
--DELETE ROUTES---
 */

//delete an order
router.delete('/order/:_id', authenticateToken, async (req, res) => {
  try {
    const order = await Order.findByIdAndDelete(req.params._id);

    if (!order) {
      return res.status(404).json({ message: 'order not found' });
    }

    res.status(200).json({ message: 'order deleted', deletedOrder: order });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete food item
router.delete('/food/:_id', authenticateToken, async (req, res) => {
  try {
    const food = await Food.findByIdAndDelete(req.params._id);

    if (!food) {
      return res.status(404).json({ message: 'Food not found' });
    }

    res.status(200).json({ message: 'food deleted', deletedFood: food });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete image from gallery
router.delete('/image/:_id', authenticateToken, async (req, res) => {
  try {
    const image = await Image.findByIdAndDelete(req.params._id);

    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    res.status(200).json({ message: 'image deleted', deletedImage: image });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//delete drink item
router.delete('/drink/:_id', authenticateToken, async (req, res) => {
  try {
    const drink = await Drink.findByIdAndDelete(req.params._id);

    if (!drink) {
      return res.status(404).json({ message: 'drink not found' });
    }

    res.status(200).json({ message: 'drink deleted', deletedDrink: drink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


/*
--UPDATE ROUTES---
 */

//PATCH update part of the food item
router.patch('/food/:_id', authenticateToken, async (req, res) => {
  try {
    const updatedFood = await Food.findByIdAndUpdate(
      req.params._id,
      req.body,               
      { new: true, runValidators: true } //return update & run schema validators
    );

    if (!updatedFood) {
      return res.status(404).json({ message: 'Food item not found' });
    }

    res.json(updatedFood);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//PATCH update part of the drink item
router.patch('/drink/:_id', authenticateToken, async (req, res) => {
  try {
    const updatedDrink = await Drink.findByIdAndUpdate(
      req.params._id,
      req.body,               
      { new: true, runValidators: true } //return update & run schema validators
    );

    if (!updatedDrink) {
      return res.status(404).json({ message: 'Drink item not found' });
    }

    res.json(updatedDrink);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

//PATCH update part of the order
router.patch('/order/:_id', authenticateToken, async (req, res) => {
  try {
    const updatedOrder = await Order.findByIdAndUpdate(
      req.params._id,
      req.body,               
      { new: true, runValidators: true } //return update & run schema validators
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: 'order not found' });
    }

    res.json(updatedOrder);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router