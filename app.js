/**
 * server entry point
 * @module app
 */

var

  /** express module */
  express = require("express"),

  /** server instance */
  app = express(),

  /** the port the server will listen to for requests */
  port = process.env.PORT || process.argv[2] || 8000;

app.use(express.static(__dirname + "/public", {
  // disable cache while developing
  // maxAge: 2592000000 // 30 day cache
}))

// use ejs templating engine
app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.engine("html", require("ejs").renderFile);

/** routes */
app.get("/privacy", function(req, res) {
  res.render("privacy");
});

/** routes */
app.get("/welcome", function(req, res) {
  if (!req.query || !req.query.code || !req.query.place) {
    return res.redirect('/');
  }

  var
    place = req.query.place,
    code = req.query.code;

  res.render("welcome", {
    place: place,
    code: code,
  });
});

/** handler for uncaught routes */
app.get("*", function(req, res) {
  res.render("index");
});

/** take requests on specified port */
app.listen(port);
console.log("Server listening on port " + port + ".");

/** expose app */
module.exports = app;
