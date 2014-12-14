$(function(){
  // Autoload the save file
  $.get("/items", function(todos) {
    for (var i = 0; i < todos.length; i++) {
      var new_item = $("<li></li>");
      var new_checkbox = "<input type=checkbox>";

      new_item.append( new_checkbox );
      new_item.append( todos[i].title );

      $( ".list" ).append(new_item);
    }

  });

  var input = $( "#input" );

  input.keydown(function(e){
    if( e.keyCode == 13 ){
      var new_list_item = $("<li></li>");
      var checkbox = "<input type=checkbox>";
      var user_input = input.val();

      new_list_item.append( checkbox );
      new_list_item.append( "<span>" + user_input + "</span>" )
      $( ".list" ).append( new_list_item );
      $( this ).val(""); //Clears input after pressing enter

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