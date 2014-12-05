$(function(){

  var input = $( "#input" );

  input.keydown(function(e){
    if( e.keyCode == 13 ){
      var newListItem = input.val();
      var checkbox = "<input type=checkbox>";
      $( ".list" ).append( "<li>" + checkbox + newListItem + "</li>" );
      $( this ).val(""); 
      // $( "li" ).append( "<input type=checkbox>" );
    }
  });

  $('body').on("click", "input:checkbox", function() {
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