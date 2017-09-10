// Dependencies
var express = require("express");
var bodyParser = require("body-parser");
var logger = require("morgan");
var mongoose = require("mongoose");
// Set mongoose to leverage built in JavaScript ES6 Promises
// mongoose.Promise = Promise;


// Initialize Express
var app = express();

// Use morgan and body parser with our app
app.use(logger("dev"));
app.use(bodyParser.urlencoded({
  extended: false
}));

// Make public a static dir
app.use(express.static("public"));

// require("./migrations/html-routes.js")(app);
require("./controllers/api-routes.js")(app);

// Database configuration with mongoose
mongoose.connect("mongodb://heroku_9ldwr6l5:heroku_9ldwr6l5.heroku_9ldwr6l5@ds129344.mlab.com:29344/heroku_9ldwr6l5");
var db = mongoose.connection;

// // Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// // Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});


// Handlebars
var exphbs = require('express-handlebars');
app.engine('handlebars', exphbs({ defaultLayout: 'main' }));
app.set('view engine', 'handlebars');

var PORT = process.env.PORT || 3000;

// Listen on port 3000
app.listen(PORT, function() {
  console.log("App running on port 3000!");
});
