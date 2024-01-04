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
app.use(express.static('public'));


// Get the models
const { Furnitures } = require("./models/furnitures");
const { Storelocation } = require("./models/storelocation");

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

//  Starting admin part
// Create a route for root - /
app.get("/admin", function(req, res) {
    res.render("admin", {'title':'Admin', 'heading':'Welcome to Furlenco Admin'});
});
// Create a route for root - /
app.get("/", function(req, res) {
    res.render("home", {'title':'Home', 'heading':'Welcome to Furlenco'});
});

app.get("/admin/location", function (req, res) {

    sql = 'select * from store_location';
    db.query(sql).then(results => {
        res.render('store_locations', {locations: results});
    });

});

app.post('/add-location', async function (req, res) {
    params = req.body;
        // insert statment
        let sql = 'INSERT INTO store_location(store_address) VALUES(?)';
        let todo = [params.store_address];
        // execute the insert statment
        db.query(sql, todo, (err, results, fields) => {
          if (err) return console.error(err.message);
        });
        res.redirect('/admin/location');
});

app.get("/single-location/:id", async function (req, res) { 
    var locationId = req.params.id;
    // Create a student class with the ID passed
    var storelocation = new Storelocation(locationId);
    await storelocation.getStoreDetails();
    res.render('single_location', {storelocation:storelocation});
});

app.post('/update-location', async function (req, res) {
    console.log( req.body)
    var sql = "UPDATE store_location SET store_address = ? WHERE store_id = ?"
    db.query(sql, [ req.body.store_address,  req.body.store_id],(err, results,fields) => {
        if (err) return console.error(err.message);
    });   

     res.redirect('admin/location');
});
app.get('/delete-location/:id', async function (req, res) {
    var locationId = req.params.id;  
    const deleteQuery = 'DELETE FROM store_location WHERE store_id = ?';

    // Execute the query
    db.query(deleteQuery,[locationId], (error, results, fields) => {
      if (error) throw error;
    });
    res.redirect('admin/location');
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});