// Dependencies
var express = require("express");
var mongojs = require("mongojs");
// Require request and cheerio. This makes the scraping possible
var request = require("request");
var cheerio = require("cheerio");

// Initialize Express
var app = express();

// Database configuration
var databaseUrl = "scraper";
var collections = ["scrapedData"];

// Hook mongojs configuration to the db variable
var db = mongojs(databaseUrl, collections);
db.on("error", function(error) {
  console.log("Database Error:", error);
});

// First, tell the console what server3.js is doing
console.log("\n******************************************\n" +
            "Look at the image of every award winner in \n" +
            "one of the pages of `awwwards.com`. Then,\n" +
            "grab the image's source URL." +
            "\n******************************************\n");

// Make request to grab the HTML from `awwards's` clean website section
app.get("/", function(req, res){
  res.redirect("/scrape");
});
app.get("/scrape", function(req,res){
  request("https://tasty.co/", function(err,res,html){
      var $ = cheerio.load(html);
      var results = [];
      $("a.recipe-item").each(function(i,el){
          var recipe= $(el).attr("href");
          var imgLink= $(el).find("amp-img").attr("src");
          var title = $(el).find("h6").text();
          results.push({
              title, recipe, imgLink
          })
      })
      console.log(results);
  })
})

// Listen on port 3000
app.listen(3000, function() {
  console.log("App running on port 3000!");
});

