/**
 * Applikation för projekt i Backend-utveckling Mittuniversitetet
 * av Rosali Johansson
 * 
 */


const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const foodRoutes = require('./routes/foodRoutes.js');
const drinkRoutes = require('./routes/drinkRoutes.js');
const adminRoutes = require('./routes/adminRoutes.js');
const orderRoutes = require('./routes/orderRoutes.js');
const imageRoutes = require('./routes/imageRoutes.js');

require('dotenv').config();



const mongoose = require('mongoose');
//MongoDB connection via Mongoose and .env file   
mongoose.connect(process.env.DATABASE, {
})  
.then(() => console.log("MongoDB database connected"))
.catch((err) => console.error("MongoDB connection error:", err));


const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

//routes 
/*app.use("/", foodRoutes);
app.use("/", drinkRoutes);
app.use("/", orderRoutes);
app.use("/", adminRoutes);
app.use("/", galleryRoutes);
*/

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});