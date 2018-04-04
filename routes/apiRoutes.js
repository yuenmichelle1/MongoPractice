var path = require("path");
var mongoose = require("mongoose");
var db = require("../models");
var request = require("request");
var cheerio = require("cheerio");
var express = require("express");

module.exports = function(app) {
  app.get("/scrape", function(req, res) {
    request("https://tasty.co/", function(err, result, html) {
      var $ = cheerio.load(html);
      var results = [];
      var scrapeCount = 0;
      $("a.recipe-item").each(function(i, el) {
        var recipe = $(el).attr("href");
        var imgLink = $(el)
          .find("amp-img")
          .attr("src");
        var title = $(el)
          .find("amp-img")
          .attr("alt");
        results.push({
          recipe,
          imgLink,
          title
        });
        scrapeCount++;
      });
      db.Recipe.create(results)
        .then(function(dbRecipe) {
          console.log(dbRecipe);
          res.json(scrapeCount);
        })
        .catch(function(err) {
          if (err.code === 11000) {
            console.log("duplicated");
            res.json(err.index);
          } else {
            res.json(err);
          }
        });
    });
  });

  app.put("/api/saveRecipe/:id", function(req, res) {
    var recipeId = req.params.id;
    db.Recipe.findByIdAndUpdate({ _id: recipeId }, req.body).then(function(
      dbRecipe
    ) {
      res.json(dbRecipe);
    });
  });
  //display Note
  app.post("/api/recipes/:id", function(req, res) {
    db.Note.create(req.body)
      .then(function(dbNote) {
        return db.Recipe.findByIdAndUpdate(
          { _id: req.params.id },
          { $push: { note: dbNote._id } },
          { new: true }
        );
      })
      .then(function(dbRecipe) {
        res.json(dbRecipe);
      });
  });
  app.delete("/api/recipes/:recipeId/note/:id", function(req, res){
    var recipeId= req.params.recipeId;
    var noteId= req.params.id;
    db.Note.findByIdAndRemove({_id: noteId}).then(function(dbNote){
      db.Recipe.findByIdAndUpdate({_id: recipeId}, {$pullAll : {note: [{_id: noteId}]}}, {new: true}).then(function(dbRecipe){
       console.log(dbRecipe);
       res.json(dbRecipe);
      })
    })
  })
};
