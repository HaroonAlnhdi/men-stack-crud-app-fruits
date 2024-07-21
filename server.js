
        
    // Const :

        const dotenv = require("dotenv"); // require package
        dotenv.config(); // Loads the environment variables from .env file
        const express = require("express");
        const mongoose = require("mongoose"); // require package
        const Fruit = require("./models/fruit.js");


    // 
        const app = express();
        app.use(express.urlencoded({ extended: false }));
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

        // GET /fruits -  مهم طباعة البيانات من قاعدة البيانات  على الصفحة 
        app.get("/fruits", async (req, res) => {
            const allFruits = await Fruit.find();
            res.render("fruits/index.ejs", { fruits: allFruits });
          });

        app.get("/fruits/new",(req,res) => {
            res.render("fruits/new.ejs");
        })

      

        // POST /fruits - مهم جدا ارسال مدخلات من الصفحة الى قاعدة البيانات 
        app.post("/fruits", async (req, res) => {
            if (req.body.isReadyToEat === "on") {
              req.body.isReadyToEat = true;      //  change value from on to true in DataBase ;
            } else {
              req.body.isReadyToEat = false;    //  change value from off to false in DataBase ;
            }
            await Fruit.create(req.body);      // add these input from (form) to DB..
            // res.redirect("/fruits/new");      // نستخدمة بعد ارسال البيانات عشان مايكرر العملية عدة مرات في قاعدة البيانات  -يضمن ان العملية تتنفذ مرة  بعد ضغط ارسال 
            res.redirect("/fruits"); // redirect to index fruits
          });

        app.listen(3000, () => {
        console.log("Listening on port 3000");
        });