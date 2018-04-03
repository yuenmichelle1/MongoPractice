var mongoose= require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    //recipe is link to recipe
    recipe: {
        type: String,
        validate: [
            function(input){
                Recipe.find({recipe: input}, function (err, docs){
                    if (err) {
                        next();
                    }
                })
            }
        ]
    }, 
    imgLink: {
        type: String
    },
    title: {
        type: String
    },
    saved: {
        type: Boolean,
        default: false
    },
    note: [{
       type: Schema.Types.ObjectId,
       ref: "Note" 
    }]
})

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;