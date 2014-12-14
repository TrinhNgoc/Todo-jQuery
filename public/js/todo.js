$(function(){
  // Autoload the save file
  $.get("/items", function(todos) {
    for (var i = 0; i < todos.length; i++) {

      var new_list_item = $("<li>", {
        class: "list_items",
        "data-object-id" : todos[i]._id
      });

      var new_checkbox = $("<input>", {
        type: "checkbox"
      });

      var new_delete = $("<button>", {
        text: "[x]",
        click: function (e) {
          var button = $(e.currentTarget);
          var object_id = button.closest("li").data("object-id")

          $.ajax ( "/items/" + object_id, 
            {
              type : "DELETE",
              success: function(data) {
                console.log('data', data);
              }
            }
          );
        }
      });

      var new_list_label = $("<span>", {
        text: todos[i].title
      });

      if(todos[i].completed === "true") {
        new_checkbox.attr("checked","checked");
      }

      new_list_item
        .append( new_checkbox )
        .append( new_list_label )
        .append( new_delete );

      $( ".list" ).append(new_list_item);
    }

  });

  var input = $( "#input" );

  input.keydown(function(e){

    if( e.keyCode == 13 ){

      var list_item = $("<li>", {
        class: "list_items",
        "data-object-id" : user_input._id
      });

      var checkbox = $("<input>", {
        type: "checkbox"
      });

      var user_input = input.val();

      var list_label = $("<span>", {
        text: user_input
      });

      // var new_delete = $("<button>", {
      //   text: "[x]",
      //   click: function (e) {
      //     var button = $(e.currentTarget);
      //     var object_id = button.closest("li").data("object-id")

      //     $.ajax ( "/items/" + object_id, 
      //       {
      //         type : "DELETE",
      //         success: function(data) {
      //           console.log('data', data);
      //         }
      //       }
      //     );
      //   }
      // });

      list_item
        .append( checkbox )
        .append( list_label );

      $( ".list" ).append( list_item );

      //Clears input after pressing enter
      $( this ).val(""); 
      

      var post_data = {
          new_item : {
              title : "my task",
              completed : false
          }
      }

      $.post('/item', post_data, function(data){ });  
      
    }
  });

  $('body').on("click", "input:checkbox", function() {

    var checkedCheckbox = ($("input:checked").length);
    var totalCheckbox = $("input:checkbox").length;
    var uncheckedbox = totalCheckbox - checkedCheckbox;

    if(this.checked) {
      // alert("Checked!");
      $(this).parent().css("text-decoration","line-through");
      $(".counter").text(checkedCheckbox + " items completed");
    }
    else {
      // alert("Unchecked!");
      $(this).parent().css("text-decoration","none");
      $(".items-left").text( uncheckedbox + (uncheckedbox === 1 ? " item" : " items") + " left");
    }
  })

});