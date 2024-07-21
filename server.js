
        
    // Const :

        const dotenv = require("dotenv");                    // require package
        dotenv.config(); // Loads the environment variables from .env file
        const express = require("express");
        const mongoose = require("mongoose");               // require package
        const methodOverride = require("method-override");  // require package
        const morgan = require("morgan");                   // require package
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

    // Mount it along with our other middleware, ABOVE the routes
        app.use(express.urlencoded({ extended: false }));
        app.use(methodOverride("_method")); // new
        app.use(morgan("dev")); //new


    // ROUTES :


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

        // page to display fruit by id 
        app.get("/fruits/:fruitId", async (req, res) => {
            const foundFruit = await Fruit.findById(req.params.fruitId);
            res.render("fruits/show.ejs", { fruit: foundFruit });
        });

        // page to delte the fruit 
        app.delete("/fruits/:fruitId", async (req, res) => {
            await Fruit.findByIdAndDelete(req.params.fruitId);
            res.redirect("/fruits");
          });


     // Landing page : الصفحات 

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