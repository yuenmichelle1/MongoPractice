$(".favorite").on("click", function(event) {
  var recipeId = $(this).data("id");
  var el = $(this).data("saved");
  if (el == false) {
    $(this).html(`<h4>♥ Saved to Your Recipes</h4>`);
    $.ajax(`/api/saveRecipe/${recipeId}`, {
      type: "PUT",
      data: {
        saved: true
      }
    }).then(function() {
      console.log("saved Recipe");
      location.reload();
    });
  } else {
    $(this).html(`<h4>Add to Saved Recipes?</h4>`);
    unfaveRecipe(recipeId);
  }
});

$(".scrape-new ").on("click", function(event) {
  $.get(`/scrape`, function(data) {
    location.reload();
  });
});

$(".unfavorite").on("click", function(event) {
  var savedRecipeId = $(this).data("id");
  unfaveRecipe(savedRecipeId);
});

$(".addNote").on("click", function(event) {
  var savedRecipeId = $(this).data("id");
  $.get(`/savedRecipe/${savedRecipeId}`, function(data) {
    var modalText = [
      "<div class='container-fluid text-center'>",
      "<h4>Notes For Recipe: ",
      savedRecipeId,
      "</h4>",
      "<hr />",
      "<ul class='list-group note-container'>",
      "</ul>",
      "<textarea placeholder='New Note' rows='4' cols='60'></textarea>",
      "<button class='btn btn-success save'>Save Note</button>",
      "</div>"
    ].join("");
    bootbox.dialog({
      message: modalText,
      closeButton: true
    });
    var noteData = {
      _id: savedRecipeId,
      notes: data || []
    };
    $(".btn.save").data("recipe", noteData);
    renderNote(data);
  });
});

function renderNote(data) {
    var notesToRender = [];
    var currentNote;
    if (!data.notes.length) {
      // If we have no notes, just display a message explaing this
      currentNote = ["<li class='list-group-item'>", "No notes for this article yet.", "</li>"].join("");
      notesToRender.push(currentNote);
    }
    else {
      // If we do have notes, go through each one
      for (var i = 0; i < data.notes.length; i++) {
        // Constructs an li element to contain our noteText and a delete button
        currentNote = $(
          [
            "<li class='list-group-item note'>",
            data.notes[i].noteText,
            "<button class='btn btn-danger note-delete'>x</button>",
            "</li>"
          ].join("")
        );
        // Store the note id on the delete button for easy access when trying to delete
        currentNote.children("button").data("_id", data.notes[i]._id);
        // Adding our currentNote to the notesToRender array
        notesToRender.push(currentNote);
      }
    }
    // Now append the notesToRender to the note-container inside the note modal
    $(".note-container").append(notesToRender);
}

function unfaveRecipe(id) {
  $.ajax(`/api/saveRecipe/${id}`, {
    type: "PUT",
    data: {
      saved: false
    }
  }).then(function() {
    console.log("unsaved Recipe");
    location.reload();
  });
}
