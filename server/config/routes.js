var path = require('path');
var list = require('../controllers/list.js');

// function loginAuthentication(req,res,next){
//   if (req.session.userId){
//     next();
//   }else{
//     res.status(401).send("User not found");
//   }
// }

module.exports = function(app){
  app.post('/newSignup', list.newSignup);
};
  function userAuth(req,res,next){
    if(req.session.user){
      next();
    }else{
      res.sendStatus(401);
    }
  }
