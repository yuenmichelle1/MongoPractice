$(".favorite").on("click", function(event){
    var recipeId= $(this).data("id");
    var el = $(this).data("saved");
    if (el == false){
        $(this).html(`<h4>♥ Saved to Your Recipes</h4>`);
        $.ajax(`/api/saveRecipe/${recipeId}`,{
            type: "PUT",
            data: {
                saved: true
            }
        }).then(function(){
            console.log("saved Recipe");
            location.reload();
        })
    } else {
        $(this).html(`<h4>Add to Saved Recipes?</h4>`);
        unfaveRecipe(recipeId);
    }
})

$(".scrape-new ").on("click", function(event){
    $.get(`/scrape`, function(data){
       location.reload();
    })
})

$(".unfavorite").on("click", function(event){
    var savedRecipeId= $(this).data("id");
    unfaveRecipe(savedRecipeId);
})

function unfaveRecipe(id){
    $.ajax(`/api/saveRecipe/${id}`,{
        type: "PUT",
        data: {
            saved: false
        }
    }).then(function(){
        console.log("unsaved Recipe");
        location.reload();
    })
}