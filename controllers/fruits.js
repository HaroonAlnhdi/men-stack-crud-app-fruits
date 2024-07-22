


    const Fruit = require('../models/fruit');

    // هنا نسوي قائمة للاختصارات الروت

    // Display home page :
    
    const home = async (req, res) => {
        res.render("index.ejs");
    };
    
    // Display all fruits
    const index = async (req, res) => {
    const foundFruits = await Fruit.find();
    res.render('fruits/index.ejs', { fruits: foundFruits });
    };

    //display new page :

 const newFruit = (req, res) => {
        res.render('fruits/new.ejs');
      };

    // page to display fruit by id 
 const show = async (req, res) => {
        const foundFruit = await Fruit.findById(req.params.fruitId);
        res.render("fruits/show.ejs", { fruit: foundFruit });
    };

    // page to delte the fruit 
  const deletePage = async (req, res) => {
        await Fruit.findByIdAndDelete(req.params.fruitId);
        res.redirect("/fruits"); // دائما يبدا ب )(/) لازم
      };


   const edit = async(req,res) => {

        const foundFruit = await Fruit.findById(req.params.fruitId);
            res.render("fruits/edit.ejs", {
              fruit: foundFruit,
            });
      };


    const create = async (req, res) => {
        if (req.body.isReadyToEat === "on") {
          req.body.isReadyToEat = true;      //  change value from on to true in DataBase ;
        } else {
          req.body.isReadyToEat = false;    //  change value from off to false in DataBase ;
        }
        await Fruit.create(req.body);      // add these input from (form) to DB..
        // res.redirect("/fruits/new");      // نستخدمة بعد ارسال البيانات عشان مايكرر العملية عدة مرات في قاعدة البيانات  -يضمن ان العملية تتنفذ مرة  بعد ضغط ارسال 
        res.redirect("/fruits"); // redirect to index fruits
      };


     const update = async (req, res) => {
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
    };

      
    
    module.exports = {
    index,
    home,
    newFruit,
    show,
    deletePage,
    edit,
    update,
    create,

    };