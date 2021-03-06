// Dependencies
var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");

// Initialize Express
var app = express();

//hbs
var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({defaultLayout: "main"}));
app.set("view engine", "handlebars");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public/'));
app.use(express.static("."));



var PORT = process.env.PORT || 3000;

// Hook mongojs configuration to the db variable
var db = require("./models");

require("./routes/htmlRoutes")(app);
require("./routes/apiRoutes")(app);


// If deployed, use the deployed database. Otherwise use the local mongoHeadlines database
var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

// Set mongoose to leverage built in JavaScript ES6 Promises
// Connect to the Mongo DB
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI);

// Listen on port 3000
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});

