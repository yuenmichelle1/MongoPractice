$(document).ready(function() {
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

  $(".scrape-new").on("click", function(event) {
    $.get(`/scrape`, function(data) {
      alert(`${data} recipes have been added!`);
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
        note: data || []
      };
      $(".btn.save").data("recipe", noteData);
      renderNote(data);
      $(".btn.save").on("click", function(event) {
        var noteInfo = $(".bootbox-body textarea").val().trim();
        console.log(`${noteInfo} I've been clicked`);
        var recipeId = $(this).data("recipe")._id;
        console.log(recipeId);
        if (noteInfo) {
          $.post(`/api/recipes/${recipeId}`, {body: noteInfo}).then(function() {
            bootbox.hideAll();
          });
        }
      });
    });
  });
});

function renderNote(data) {
  var notesToRender = [];
  var currentNote;
  if (data.note.length < 1) {
    // If we have no notes, just display a message explaing this
    currentNote = 
      `<li class='list-group-item'>
      No notes for this article yet.
      </li>`
    notesToRender.push(currentNote);
  } else {
    // If we do have notes, go through each one
    for (var i = 0; i < data.note.length; i++) {
      // Constructs an li element to contain our noteText and a delete button
      currentNote = $(
        [
          "<li class='list-group-item note'>",
          data.note[i].body,
          "<button class='btn btn-danger note-delete'>X</button>",
          "</li>"
        ].join("")
      );
      // Store the note id on the delete button for easy access when trying to delete
      currentNote.children("button").data("_id", data.note[i]._id);
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

// function getNotes(id) {
//   $.get(`/savedRecipe/${id}`, function(data) {
//     var modalText = 
//       `<div class='container-fluid text-center'>
//       <h4>Notes For Recipe: 
//       ${id}
//       </h4>
//       <hr />
//       <ul class='list-group note-container'>
//       </ul>
//       <textarea placeholder='New Note' rows='4' cols='60'></textarea>
//       <button class='btn btn-success save' id='saveNotes'>Save Note</button>
//       </div>`;
//     bootbox.dialog({
//       message: modalText,
//       closeButton: true
//     });
//     var noteData = {
//       Recipe_id: id,
//       note: data.note || []
//     };
//     $(".btn.save").data("recipe", noteData);
//     renderNote(data);
//   });
// }
