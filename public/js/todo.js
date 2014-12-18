$(function(){

  function click_delete_item_handler (e) {
    var button = $(e.currentTarget);
    var parent_li = button.closest("li");
    var object_id = parent_li.data("object-id");

    $.ajax ( "/items/" + object_id, 
      {
        type : "DELETE",
        success: function(data) {
          parent_li.remove();
          console.log('data', data);
        }
      }
    );
  };

   function change_completed_status (e) {
    var checkbox = $( e.currentTarget );
    var parent_li = checkbox.closest("li");
    var object_id = parent_li.data("object-id");
    
    $.ajax('/items/' + object_id + '/' + checkbox.prop("checked"),
      {
        type : "PUT",
        success : function (data) {
          console.log('data', data);
        }
      }
    );
  };

  // Autoload the save file
  $.get("/items", function(todos) {
    for (var i = 0; i < todos.length; i++) {

      var new_list_checkbox = $("<input>", {
        type: "checkbox",
        change: change_completed_status
      });

      var new_list_item = $("<li>", {
        class: "list_items",
        "data-object-id" : todos[i]._id
      });

      var new_list_label = $("<span>", {
        text: todos[i].title
      });

      var new_list_delete = $("<button>", {
        text: "X",
        click: click_delete_item_handler
      });

      if(todos[i].completed === "true") {
        new_list_checkbox.attr("checked","checked");
        new_list_item.css("text-decoration","line-through");
      };

      new_list_item
        .append( new_list_checkbox )
        .append( new_list_label )
        .append( new_list_delete );

      $( ".list" ).append(new_list_item);
    }

  });

  var input = $( "#input" );

  input.keydown(function(e){

    if( e.keyCode == 13 ){

      var list_checkbox = $("<input>", {
        type: "checkbox",
        change: change_completed_status
      });

      var list_item = $("<li>", {
        class: "list_items"
      });

      var user_input = input.val();

      var list_label = $("<span>", {
        text: user_input
      });

      var list_delete = $("<button>", {
        text: "X",
        click: click_delete_item_handler
      });

      list_item
        .append( list_checkbox )
        .append( list_label )
        .append( list_delete );

      $( ".list" ).append( list_item );

      //Clears input after pressing enter
      $( this ).val(""); 
      

      var post_data = {
          new_item : {
              title : user_input,
              completed : false
          }
      }

      $.post('/item', post_data, function(new_todo_id){
          // console.log(new_todo_id);
          $(".list_items").attr("data-object-id", new_todo_id);
      });  
    }
  });

  $('body').on("click", "input:checkbox", function() {

    var checkedCheckbox = ($("input:checked").length);
    var totalCheckbox = $("input:checkbox").length;
    var uncheckedbox = totalCheckbox - checkedCheckbox;

    // Checks how many items are completed
    $(".counter").text(checkedCheckbox + (checkedCheckbox === 1 ? " item" : " items") + " completed");

    // Checks how many items are not completed
    $(".items-left").text( uncheckedbox + (uncheckedbox === 1 ? " item" : " items") + " left");
    
    if(this.checked) {
      // alert("Checked!");
      $(this).parent().css("text-decoration","line-through");
    }
    else {
      // alert("Unchecked!");
      $(this).parent().css("text-decoration","none");
    }
  })

});