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
  app.post('/login', events.loginAdmin)


};
  // function userAuth(req,res,next){
  //   if(req.session.user){
  //     next();
  //   }else{
  //     res.sendStatus(401);
  //   }
  // }
