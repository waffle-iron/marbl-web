var path = require('path');
var events = require('../controllers/events.js');

// function loginAuthentication(req,res,next){
//   if (req.session.userId){
//     next();
//   }else{
//     res.status(401).send("User not found");
//   }
// }

module.exports = function(app){
  app.get('/showevents', events.showevents);
  // app.post('/getevents', events.loginAdmin);
  app.post('/newevent', events.newevent);
  app.post('/login', events.loginAdmin);

  app.use(userAuth);
  // app.post('/logout', mentors.logout);

};
  function userAuth(req,res,next){
    if(req.session.user){
      next();
    }else{
      res.sendStatus(401);
    }
  }
