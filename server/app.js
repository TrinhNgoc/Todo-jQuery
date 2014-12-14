var express = require('express');
var bodyParser = require('body-parser');
var fs = require('fs');
var MongoClient = require('mongodb').MongoClient;
var app = express();

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/item', function (req, res) {

  // console.log("user sent post request");
  // console.log( req.body );
  // saveToDoList(req.body.todo_json_data);
  // res.send("ok");

  // Note the db name todosdb in the connection string
  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
    throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    // Insert a document into the collection
    collection.insert(req.body.new_item, function(err, arrayItem) {
      // Show the item that was just inserted; contains the _id field
      // Note that it is an array containing a single object
      console.log(arrayItem[0]._id);
      res.send(arrayItem[0]._id);

      // Log the number of items in the collection
      collection.count(function(err, count) {
        console.log("count = " + count);
      });

      // Locate all the entries using find
      collection.find().toArray(function(err, results) {
        console.log(results);

        // Close the db connection
        db.close();
      });
    }); // End of function(err, docs) callback
  });

});

app.get('/items', function (req, res) {

  MongoClient.connect('mongodb://localhost:27017/todosdb', function(err, db) {
    if (err) {
      throw err;
    }

    var collection = db.collection('todos');

    collection.find().toArray(function(err, results) {
      res.send(results);
    });
  });

});

var server = app.listen(3000, function () {

  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)

});

// function saveToDoList (content) {

//   fs.writeFile('./public/todo_save.txt', content, function (err) {
//     if (err) return console.log(err);
//     console.log('Successfully saved todo_save.txt');
//   });

// }
//If filename is not define, it will create a new file