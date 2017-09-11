/* Scrape and Display
 * (If you can do this, you should be set for your hw)
 * ================================================== */

// STUDENTS:
// Please complete the routes with TODOs inside.
// Your specific instructions lie there

// Good luck!




var express = require("express");
const body = require("body-parser");
const path = require("path");
const app = express();
const exphbs = require("express-handlebars");
const router = require(path.join(__dirname, "controllers", "controller.js"));
const methodOverride = require('method-override');
const mongoose = require("mongoose");


// Set mongoose to leverage built in JavaScript ES6 Promises
mongoose.Promise = Promise;


// Set Handlebars as the default templating engine.
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

app.use(body.json()); // support json encoded bodies
app.use(body.urlencoded({ extended: false })); // support encoded bodies

app.use(methodOverride('_method'))

// Make public a static dir
app.use(express.static("public"));
app.use("/", router);

// Database configuration with mongoose
mongoose.connect("mongodb://localhost/newsdb");
var db = mongoose.connection;

// Show any mongoose errors
db.on("error", function(error) {
  console.log("Mongoose Error: ", error);
});

// Once logged in to the db through mongoose, log a success message
db.once("open", function() {
  console.log("Mongoose connection successful.");
});

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});
