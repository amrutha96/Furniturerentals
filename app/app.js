// Import express.js
const express = require("express");

// Create express app
var app = express();

// Add static files location
app.use(express.static("static"));


// Get the functions in the db.js file to use
const db = require('./services/db');

// Use the Pug templating engine
app.set('view engine', 'pug');
app.set('views', './app/views');
app.use(express.urlencoded({ extended: true }))
app.use('/bootstrap', express.static('node_modules/bootstrap/dist'));

// Get the models
const { Furnitures } = require("./models/furnitures");

// Create a route for root - /
app.get("/", function(req, res) {
    res.render("home", {'title':'Home', 'heading':'Welcome to Furlenco'});
});

app.get("/list_furnitures", function (req, res) {
    	    // Send the results rows to the all-furnitures template
    	    // The rows will be in a variable called data
            // var furniture = new Furnitures;
            // console.log(furniture);
            // await furniture.getFurnitureList();
            // res.render('all-furnitures', {furniture: furniture});

            sql = 'select furniture_id, furniture_name from furnitures';
            db.query(sql).then(results => {
                res.render('all-furnitures', {furniture: results});
            });

});

app.get("/single-furniture/:id", async function (req, res) { 
    var furniture_Id = req.params.id;
    // Create a student class with the ID passed
    var single_furniture = new Furnitures(furniture_Id);
    // console.log(furniture);
    await single_furniture.getFurnitureDetails();
    res.render('furniture_detail', {single_furniture});
        
});

app.get("/admin/location", function (req, res) {

    sql = 'select * from store_location';
    db.query(sql).then(results => {
        res.render('store_locations', {locations: results});
    });

});

app.post('/add-location', async function (req, res) {
    params = req.body;
    console.log(params);
     var sql = "UPDATE store_location SET store_address ="+params.store_address +'" WHERE store_id = "' + params.store_id+'"';
     con.query(sql, function (err, result) {
       if (err) throw err;
       console.log(result.affectedRows + " record(s) updated");
       // Just a little output for now
     res.redirect('/admin/location');
     });



     

});



// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});