var path = require("path");
var request= require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db= require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
        res.redirect("/scrape");
    });
}