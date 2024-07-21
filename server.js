
        
    // Const :

        const dotenv = require("dotenv"); // require package
        dotenv.config(); // Loads the environment variables from .env file
        const express = require("express");
        const mongoose = require("mongoose"); // require package
        const Fruit = require("./models/fruit.js");
        const app = express();

    // Database :
        mongoose.connect(process.env.MONGODB_URI);
        // log connection status to terminal on start
        mongoose.connection.on("connected", () => {
        console.log(`Connected to MongoDB ${mongoose.connection.name}.`);
        });


    // ROUTES :


    // Landing page :

        app.get("/", async (req, res) => {
            res.render("index.ejs");
        });


        app.get("/fruits/new",(req,res) => {
            res.render("fruits/new.ejs");
        })
    

        app.listen(3000, () => {
        console.log("Listening on port 3000");
        });