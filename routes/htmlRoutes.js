var path = require("path");
var request= require("request");
var cheerio = require("cheerio");

module.exports = function(app){
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
        })
        console.log(results);
    })

}