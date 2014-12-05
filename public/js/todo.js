$(function(){
  $( "#input" ).keydown(function(e){
    if( e.keyCode == 13 ){
      var newListItem = $("#input").val();
      $( ".list" ).append( "<li>" + newListItem + "</li>" );
    }
  });
});