"use strict";

var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    session = require('express-session'),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

var sessionConfig = {
     secret:'CookieMonster', // Secret name for decoding secret and such
     resave:false, // Don't resave session if no changes were made
     saveUninitialized: true, // Don't save session if there was nothing initialized
     name:'myCookie', // Sets a custom cookie name
     cookie: {
      secure: false, // This need to be true, but only on HTTPS
      httpOnly:false, // Forces cookies to only be used over http
      maxAge: 3600000
 }
}

var pg = require('pg');

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

// app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.urlencoded({extended:true}))
app.use(bp.json({extended: true}));
app.use( express.static( path.join( root, 'client')));
app.use(session(sessionConfig));


app.listen( 8000, function() {
  console.log( `server running on port 8000` );
});

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);
