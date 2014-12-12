var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var app = express();


app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/save', function (req, res) {

  console.log("user sent post request");
  console.log("Hamster!");
  console.log( req.body );
  res.send("ok");
   
});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

fs.writeFile('./meow', 'Hello World!', function (err) {
  if (err) return console.log(err);
  console.log('Hello World > index.html');
});
//If filename is not define, it will create a new file