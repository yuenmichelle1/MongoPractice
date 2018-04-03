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
      });
      db.Recipe.create(results)
        .then(function(dbRecipe) {
          res.json(dbRecipe);
        })
        .catch(function(err) {
          res.json(err);
        });
    });
  });
};
