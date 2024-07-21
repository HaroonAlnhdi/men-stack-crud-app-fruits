

const mongoose = require("mongoose");


//   Create the schema :

const fruitSchema = new mongoose.Schema({
  name: String,
  isReadyToEat: Boolean,
});

// create model :

const Fruit = mongoose.model("Fruit", fruitSchema); 
// models/fruit.js

module.exports = Fruit;