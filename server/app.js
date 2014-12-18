var bodyParser = require('body-parser');
var express = require('express');
var mongodb = require('mongodb');
var MongoClient = mongodb.MongoClient;
var ObjectID = mongodb.ObjectID;
var app = express();
var connection_string = 'mongodb://localhost:27017/todosdb';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

function connect_to_db ( cb ) {

    // Note the db name todosdb in the connection string
    MongoClient.connect(connection_string, function(err, db) {
    if (err) {
      throw err;
    }

    // Find the collection todos (or create it if it doesn't already exist)
    var collection = db.collection('todos');

    cb( collection );

  });
};

app.post('/item', function (req, res) {

  connect_to_db( function ( collection ) {

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
        collection.db.close();
      });

    }); // End of function(err, docs) callback

  });

});

app.get('/items', function (req, res) {

  connect_to_db( function ( collection ) {

    collection.find().toArray(function(err, results) {

      console.log("Found the following records");
      console.dir(results);
      res.send(results);
      collection.db.close();

    });

  });

});

app.put('/items/:id/:status', function(req, res) {
  connect_to_db(function ( collection ) {
    var todo_id = req.params.id;
    var todo_completed_status = req.params.status;

    //collection.update(criteria, objNew, options, [callback])
    collection.update(
      { '_id' : new ObjectID(todo_id)},             //Criteria
      {
        $set: {
          completed: todo_completed_status
        }
      },                                            // objNew
      {w:1},                                        // options
      function(err) {                               // callback
        if (err) console.warn(err.message);
        else console.log('successfully updated');

        // res.send( status );
      }
    );
  });
});

app.delete('/items/:item_id', function (req, res) {

  connect_to_db( function ( collection ) {

    var _id = req.params.item_id;

    collection.remove({"_id": new ObjectID( _id )}, function (err, result) {
      if(err) throw err;

      collection.db.close();
      res.json({ success: "success"});

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
