var express = require("express");
var mixin   = require("utils/mixin");
var cors    = require("utils/cors");

var app      = express();

var _id = 0;
var messages = {};


// Support JSON bodies
app.use(express.json());

// Enable cors
cors(app);



app.get("/messages", function(req, res) {
  var _messages = [];
  for(var i in messages) {
    _messages.push(messages[i]);
  }
  res.send(_messages);
});


app.get("/messages/:id", function(req, res) {
  var id = req.params.id;
  if ( messages[id] ) {
    res.send(messages[id]);
  }
  else {
    res.send(404, "Not found");
  }
});


app.post("/message", function(req, res) {
  _id++;
  var message = mixin({
    "id": _id,
    "created": (new Date()).getTime()
  }, req.body);

  messages[_id] = message;
  res.send(message);
});


app.put("/messages/:id", function(req, res) {
  var id = req.params.id;
  if ( messages[id] ) {
    mixin(messages[id], {
      "updated": (new Date()).getTime()
    }, req.body);

    res.send(messages[id]);
  }
  else {
    res.send(404, "Not found");
  }
});


app.delete("/messages", function(req, res) {
  messages = {};
  res.send(messages);
});


app.delete("/messages:id", function(req, res) {
  var id = req.params.id;
  if ( messages[id] ) {
    res.send(messages[id]);
    delete messages[id];
  }
  else {
    res.send(404, "Not found");
  }
});


var server = app.listen(Number(process.env.PORT || 3000), function() {
  console.log("Listening on port %d", server.address().port);
});

