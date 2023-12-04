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
    // Send the array through to the template as a variable called data
    // res.render("user_dashboard", {'title':'User dashboard', 'heading':'Welcome to Furlenco'}); 
});

// Create a route for testing the db
app.get("/db_test", function(req, res) {
    // Assumes a table called test_table exists in your database
    sql = 'select * from test_table';
    db.query(sql).then(results => {
        console.log(results);
        res.send(results)
    });
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
    console.log(data);


    // var furniture_Id = req.params.id;
    // output = '';
    // //Get the programme title
    // var pSql = "SELECT * FROM furnitures WHERE furniture_id = ?";
    // var output = '<table>';
    // db.query(pSql, [furniture_Id]). then(results => {
    //             output += '<tr>';
    //             output += '<td>' + results[0].furniture_name+ '</td>';
    //             output += '</tr><tr>';
    //             output += '<td>' +  results[0].furniture_desc + '</td>';
    //             output += '</tr>'
    //         output+= '</table>';
    //         res.send(output); 
    // });
        
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/single-furniture", function(req, res) {
    res.send("coming soon");
});

// Create a route for /goodbye
// Responds to a 'GET' request
app.get("/goodbye", function(req, res) {
    res.send("Goodbye world!");
});

// Create a dynamic route for /hello/<name>, where name is any value provided by user
// At the end of the URL
// Responds to a 'GET' request
app.get("/hello/:name", function(req, res) {
    // req.params contains any parameters in the request
    // We can examine it in the console for debugging purposes
    console.log(req.params);
    //  Retrieve the 'name' parameter and use it in a dynamically generated page
    res.send("Hello " + req.params.name);
});

// Start server on port 3000
app.listen(3000,function(){
    console.log(`Server running at http://127.0.0.1:3000/`);
});