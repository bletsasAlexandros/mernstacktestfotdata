const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
require("dotenv").config();
const PORT = process.env.PORT || 5000

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Midleware
app.use(cors());
const postRoutes = require('./routes/articles');
app.use('/articles',postRoutes);
const categoriesRoutes = require('./routes/categories');
app.use('/categories',categoriesRoutes);

//Conect to DB
const uri = process.env.MONGODB_URI || process.env.DB_CONNECTION;
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
},()=>console.log("DB connected"));

if (process.env.NODE_ENV ==='production') {
  app.use(express.static('../front/build'));
}

//Listening to server
app.listen(PORT, console.log(`Starting at ${PORT}`));