
        
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
            res.redirect("/fruits"); // دائما يبدا ب )(/) لازم
          });

          // GET localhost:3000/fruits/:fruitId/edit
          app.get("/fruits/:fruitId/edit", async (req, res) => {
            const foundFruit = await Fruit.findById(req.params.fruitId);
            res.render("fruits/edit.ejs", {
              fruit: foundFruit,
            });
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


         
        // ياخذ المعلومات من صفحة التعديل ويضعها في قاعدة البيانات   
        app.put("/fruits/:fruitId", async (req, res) => {
            // Handle the 'isReadyToEat' checkbox data
            if (req.body.isReadyToEat === "on") {
            req.body.isReadyToEat = true;
            } else {
            req.body.isReadyToEat = false;
            }
            
            // Update the fruit in the database
            await Fruit.findByIdAndUpdate(req.params.fruitId, req.body);
        
            // Redirect to the fruit's show page to see the updates
            res.redirect(`/fruits/${req.params.fruitId}`);
        });

        app.listen(3000, () => {
        console.log("Listening on port 3000");
        });



        /*
         مهم جدا جدا جدا جدا : 
         Learning objective: By the end of this lesson, students will be able to summarize the application architecture and technologies used.

            We've finished building our first large app! Let's zoom out and observe the moving pieces here.

            Reviewing the Technology and MVC Architecture of Our Web Application
            In this section, we'll combine an overview of the technologies used in our web application and how they fit into the Model-View-Controller (MVC) architecture.

            Technologies Employed
            JavaScript: The backbone programming language used in this tech stack.

            Node.js: Executes JavaScript code outside of a browser, in a terminal environment.

            Express: A web framework managing the request-response cycle within the application.

            EJS (Embedded JavaScript): The template engine for rendering dynamic HTML pages based on data.

            MongoDB: A document-based database for storing data persistently.

            Mongoose: An Object Data Modeling (ODM) library for MongoDB and Node.js, simplifying interactions with the database and enforcing data structure through schemas.

            MVC Architecture in Context
            Client: The browser or application initiating HTTP requests.

            Server: Listens for and processes incoming HTTP requests.

            server.js: The core of the application, orchestrating routes, middleware, database connections, and Express server setup.

            Controllers (in server.js): Handle specific request routes, interact with Mongoose models, and coordinate data flow between the model and view.

            Model (Mongoose): Interfaces with MongoDB, ensuring data adheres to predefined schemas.

            Database (MongoDB): Stores and manages data persistently, accessed via cloud-based MongoDB Atlas in this application.

            View (EJS): Utilizes templating to generate dynamic HTML pages. By integrating JavaScript into templates, EJS produces HTML that changes based on the data provided.

            If our routes are defined in server.js, is this structure really considered MVC?
            Yes, even if the routes and controller functions are defined within the server file, your application can still be considered to follow the Model-View-Controller (MVC) structure. The key aspect of MVC is the separation of concerns—structuring your application so that the data management (Model), user interface (View), and the application logic (Controller) are handled independently. How these components are physically organized in your codebase can vary.

            In many applications, especially larger and more complex ones, it's common to see routes and controller logic separated into their own directories and files for better organization and maintainability. However, in smaller applications or in projects where simplicity is preferred, keeping the controller logic within the main server file is perfectly acceptable and still adheres to the MVC principles.

            The key point is that your server is handling the Controller part of the MVC—managing the request-response cycle, interacting with the Model for data, and rendering the View. As long as these responsibilities are clearly defined and separated from each other within your application, it aligns with the MVC architecture.

            Common properties on the req object
            req.body: Object holding the form data a user has submitted. The keys on this object will match the name attributes of the inputs in the form and should conform with a model's schema if it is to be saved to a database. The values will match what the user provided in the form.

            req.params: Object holding the URL parameters of a URL. The keys on this object will match the string provided after the : in the route. The value of each key will match the data from that segment in the URL.

            Common methods on the res object
            res.render(): Always provided a string as the first argument. That string should be a file path and will never start with a /.

            res.redirect(): - Always provided a string as the first argument. That string should be a valid route and will always start with a /.
                    
                    */