var express = require("express");
var bodyParser = require("body-parser");
var path = require("path")
var db = require("./models");

var app = express();
// Serve static content for the app from the "public" directory in the application directory.
app.use(express.static(path.join(__dirname, "public")));

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
  extended: true
}));
var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({
  defaultLayout: "main"
}));
app.set("view engine", "handlebars");

// var routes = require("./controllers/burgers_controller");

// app.use(routes);
// app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);
// listen on port 3000
var PORT = process.env.PORT || 3000;