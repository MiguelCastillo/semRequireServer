var express = require("express");
var mixin   = require("utils/mixin");
var cors    = require("utils/cors");

var app      = express();
var messages = [];


// Support JSON bodies
app.use(express.json());

// Enable cors
cors(app);


app.post("/message", function(req, res) {
  var message = mixin({
    "timestamp": (new Date()).getTime()
  }, req.body);

  messages.push(message);
  res.send(message);
});


app.get("/messages", function(req, res) {
  res.send(messages);
});


var server = app.listen(3000, function() {
  console.log("Listening on port %d", server.address().port);
});

