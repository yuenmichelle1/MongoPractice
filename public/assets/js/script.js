$(".favorite").on("click", function(event){
    var recipeId= $(this).data("id");
    $.ajax(`/api/saveRecipe/${recipeId}`,{
        type: "PUT",
        data: {
            saved: true
        }
    }).then(function(){
        console.log("saved Recipe");
        // location.reload();
    })
})
$(".scrape-new ").on("click", function(event){
    $.get(`/scrape`, function(data){
       location.reload();
    })
})