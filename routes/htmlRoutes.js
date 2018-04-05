var path = require("path");
var request= require("request");
var cheerio = require("cheerio");
var mongoose = require("mongoose");
var db= require("../models");

module.exports = function(app){
    app.get("/", function(req, res){
        db.Recipe.find({}).then(function(data){
            var newData = data.reverse();
            var hbsObj= {recipe : newData};
            res.render("index", hbsObj);
        }).catch(function(err){
            res.json(err);
        })
    });
    app.get("/saved", function(req, res){
        db.Recipe.find({saved: true}).then(function(data){
            var hbsObj = {SavedRecipe: data};
            res.render("savedRecipes", hbsObj);
        }).catch(function(err){
            res.json(err);
        })
    })
    //show all notes associated to the 
  app.get("/savedRecipe/:id", function(req, res) {
    db.Recipe.findById({ _id: req.params.id })
      .populate("note")
      .then(function(dbRecipe) {
        res.json(dbRecipe);
      })
      .catch(function(err) {
        res.json(err);
      });
  });
}