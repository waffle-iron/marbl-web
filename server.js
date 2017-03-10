"use strict";

var mongoose = require( 'mongoose' ),
    express  = require( 'express' ),
    // session = require('express-session'),
    cookieSession = require('cookie-session'),
    bp       = require('body-parser'),
    path     = require( 'path' ),
    root     = __dirname,
    port     = process.env.PORT || 8000,
    app      = express();

app.set('trust proxy', 1) // trust first proxy

app.use(cookieSession({
name: 'session',
keys: ['key1', 'key2']
}));

// app.get('/', function (req, res, next) {
// // Update views
// req.session.views = (req.session.views || 0) + 1
//
// // Write response
// res.end(req.session.views + ' views')
// });

// var sessionConfig = {
//      secret:'CookieMonster', // Secret name for decoding secret and such
//      resave:false, // Don't resave session if no changes were made
//      saveUninitialized: true, // Don't save session if there was nothing initialized
//      name:'myCookie', // Sets a custom cookie name
//      cookie: {
//       secure: false, // This need to be true, but only on HTTPS
//       httpOnly:false, // Forces cookies to only be used over http
//       maxAge: 3600000
//  }
// }

// app.use( express.static( path.join( root, 'bower_components' )));
app.use(bp.urlencoded({extended:true}))
app.use(bp.json({extended: true}));
app.use( express.static( path.join( root, 'client')));
// app.use(session(sessionConfig));


app.listen( 3000, function() {
  console.log( `server running on port 8000` );
});

require("./server/config/mongoose.js");
require("./server/config/routes.js")(app);
