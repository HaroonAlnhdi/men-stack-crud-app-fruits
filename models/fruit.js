// models/fruit.js

const mongoose = require("mongoose");

// models/fruit.js


const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

const Fruit = mongoose.model("Fruit", fruitSchema); // create model

// models/fruit.js

module.exports = Fruit;