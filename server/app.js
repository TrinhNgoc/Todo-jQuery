var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', function (req, res) {

  console.log("user sent post request");
  console.log( req.body );
  saveToDoList(req.body.todo_json_data);
  res.send("ok");
   
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

function saveToDoList (content) {

  fs.writeFile('./public/todo_save.txt', content, function (err) {
    if (err) return console.log(err);
    console.log('Successfully saved todo_save.txt');
  });

}
//If filename is not define, it will create a new file