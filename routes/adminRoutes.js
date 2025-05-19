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

