var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var db = require("./models");
var request = require("request");

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

var MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/mongoHeadlines";

//Set Mongoose to leverage built in JS ES6 pROMISES
//Connect to MongoDb
mongoose.Promise = Promise;
mongoose.connect(MONGODB_URI, {
    useMongoClient: true
});

// app.use(routes);
// app.use("/", routes);
// app.use("/update", routes);
// app.use("/create", routes);
// listen on port 3000
var PORT = process.env.PORT || 3000;