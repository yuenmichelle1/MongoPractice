var mongoose= require("mongoose");

var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
    recipe: {
        type: String
    }, 
    imgLink: {
        type: String
    },
    title: {
        type: String
    },
    note: [{
       type: Schema.Types.ObjectId,
       ref: "Note" 
    }]
})

var Recipe = mongoose.model("Recipe", RecipeSchema);
module.exports = Recipe;