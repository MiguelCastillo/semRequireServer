var express     = require("express");
var cors        = require("utils/cors");
var ts          = require("services/toosimple");
var persistence = require("services/persistence");


// App instance
var app = express();

// Support JSON bodies
app.use(express.json());

// Enable cors
cors(app);

// Let me know whe persistence is done loading
persistence.done(function(pinstance) {
  // Setup too simple server
  new ts(app, {persistence: pinstance});
});

var server = app.listen(Number(process.env.PORT || 3000), function() {
  console.log("Listening on port %d", server.address().port);
});

