$(function(){
  // Autoload the save file
  $.get("/todo_save.txt", function(data) {
    var list_items = jQuery.parseJSON(data);
    for (var i = 0; i < list_items.length; i++) {
      var new_checkbox = "<input type=checkbox>";
      var isChecked = "";
      $( ".list" ).append("<li>" + new_checkbox + list_items[i].title + "</li>");

    }
  });

  var input = $( "#input" );


  input.keydown(function(e){
    if( e.keyCode == 13 ){
      var newListItem = input.val();
      var checkbox = "<input type=checkbox>";
      $( ".list" ).append( "<li>" + checkbox + "<span>" + newListItem + "</span></li>" );
      $( this ).val(""); 
      // $( "li" ).append( "<input type=checkbox>" );
    }
  });

  $('body').on("click", "input:checkbox", function() {
    var checkedCheckbox = ($("input:checked").length);
    var totalCheckbox = $("input:checkbox").length;
    var uncheckedbox = totalCheckbox - checkedCheckbox;
    if(this.checked) {
      // alert("Checked!");
      $(this).parent().css("text-decoration","line-through");
      // var checkedCheckbox = ($("input:checked").length);
      $(".counter").text(checkedCheckbox + " items completed");
    }
    else {
      // alert("Unchecked!");
      $(this).parent().css("text-decoration","none");
      $(".items-left").text( uncheckedbox + (uncheckedbox === 0 ? " item" : " items") + " left");
    }
  })

  // var itemsLeft = function () {
  //   var totalCheckbox = $("input:checkbox").length;
  //   $(".list").html( "<div>" + totalCheckbox + (totalCheckbox === 1 ? " item" : " items") + " left" + "</div>");
  // };
  // itemsLeft();

  // var checkedCheckbox = $("input:checkbox:checked").length;

  // $('.list-box').append(totalCheckbox);

  $('button#save').click(function(e){
    var list = [];
    $(".list-box ul li").each(function(i, obj) {
      list.push({
        index : i,
        title : $(obj).find("span").html(),
        completed: $(obj).find("input:checked").length > 0
      });
    });


    var json = JSON.stringify(list);
    // console.log(json);

    $.post("/save", 
      {
        todo_json_data : json
      }
    );
  }); 


});