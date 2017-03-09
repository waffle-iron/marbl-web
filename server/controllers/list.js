var mongoose = require('mongoose');
var signups = mongoose.model('signup');


function listController(){

  this.newSignup = function(req, res){
    console.log(req.body);
    signup.create(req.body, function(err, result){
      if (err){
        res.json(err);
      }else{
        console.log("created new user signup", result);
        res.json(result)
      }
    })
  }


};

module.exports = new listController();
