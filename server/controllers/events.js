var mongoose = require('mongoose');
var Event = mongoose.model('Event');
var Admin = mongoose.model('Admin');


function eventController(){

    this.showevents = function(req,res){
      Event.find({}, function(err, events) {
        if(err) {
          res.json(err);
        } else {
          console.log(events)
          var data = {events}
          res.json(data);
    }
    })
    }

    this.allEvents = function(req,res){
      Event.find({}, function(err, events) {
        if(err) {
          res.json(err);
        } else {
          // console.log(events)
          res.json(events)
    }
    })
    }

      this.newevent = function(req,res){
        console.log("in events.js")
        console.log(req.body)
        // console.log(req.body.coordinatesx, req.body.coordinatesy);
        Event.create(req.body, function(err, result) {
          if(err) {
            res.json(err);
          } else {
                  console.log("We made an event")
                  res.json(result);
          }
        })
    }

    this.update = function(req, res){
      console.log("made it to the backened with this information",req.params.id, req.body);
    Event.findOne({_id:req.params.id}, function(err, myEvent){
      if(err){
        console.log("could not find friend",myEvent);
        res.json(err)
      }else{
        myEvent.title = req.body.title
        myEvent.detail = req.body.detail
        myEvent.date = req.body.date
        myEvent.coordinatesLong = req.body.coordinatesLong
        myEvent.coordinatesLat = req.body.coordinatesLat

        var newAddress = {
          "street": req.body.address.street,
          "city": req.body.address.city,
          "zip": req.body.address.zip
        }

        // myEvent.address.street = req.body.address.street
        // myEvent.address.city = req.body.address.city
        // myEvent.address.zip= req.body.address.zip
        myEvent.address = newAddress
        myEvent.category = req.body.category
        myEvent.save(function(err, updatedEvent){
          if(err){
            console.log("could not save", updatedEvent);
            res.json(err)
          }else{
            console.log("updatedEvent",updatedEvent);
            res.json(updatedEvent);
          }
        })
      }
    })
    }

    this.delete = function(req, res){
      Event.remove({_id: req.params.id}, function(err, result){
        if(err){
          console.log("error trying to delete");
          res.json(err)
        }else{
          res.json(result)
          console.log("delet was successful", result);
        }
      })
    }


  this.loginAdmin = function(req,res){
    var errors = {errors:{
      general:{
        message:'Invalid login information'
      }
    }}
    Admin.findOne({email:req.body.email}).exec(function(err,user){
      console.log(user)
      if(!req.body.email||!req.body.password || !user){
        console.log(errors)
        console.log("first", req.body.email, req.body.password, user)
        res.json(errors)
      }else{
        if(user.password != req.body.password){
          console.log(errors)
          console.log("second",req.body.password)
          res.json(errors);
        }else{
            req.session.user = {
              name: user.first,
              _id: user._id
            }
            res.json(user);
        }
      }
    })
  }

  this.newAdmin = function(req, res){
    console.log(req.body);
    Admin.create(req.body, function(err, result){
      if (err){
        res.json(err);
      }else{
        console.log("created user", result);
        res.json(result)
      }
    })
  }
// this.loginMentee = function(req,res){
//     var errors = {errors:{
//       general:{
//         message:'Invalid login information'
//       }
//     }}
//   Mentee.findOne({email:req.body.email}).exec(function(err,user){
//     if(!req.body.email||!req.body.password||!user){
//       res.json(errors)
//     } else {
//         if(user.password != req.body.password){
//         res.json(errors);
//         } else{
//         req.session.user = {
//           first: user.first,
//           id: user._id
//         }
//         res.json(user);
//         }
//     }
//   })
// }
// this.logout = function(req,res){
//   Mentee.findOne({_id: req.session.userId}).exec(function(err, user){
//     if (err){
//       res.status(500).send("Failure");
//     } else{
//       req.session.destroy(function(){
//         req.session=null;
//       })
//       res.json(user);
//     }
// })
// },
//
// this.logoutTwo = function(req,res){
//   Mentor.findOne({_id: req.session.userId}).exec(function(err, user){
//     if (err){
//       res.status(500).send("Failure");
//     } else{
//       req.session.destroy(function(){
//         req.session=null;
//       })
//       res.json(user);
//     }
// })
// },
//
// this.filtermentees = function(req, res){
// Mentee.find({focus:req.body.focus}, function(err, user){
//       if(err) {
//         console.log("none found")
//       }
//       else{
//           res.json(user);
//       }
//     })
//   }
//
//   this.showmentee = function(req,res){
//     console.log(req.params.id)
//     Mentee.findOne({_id: req.params.id}, function(err, mentee) {
//       if(err) {
//       console.log('Could not find');
//       } else {
//         res.json(mentee);
//   }
//   })
//   }
//
//   this.showmentor = function(req,res){
//     Mentor.findOne({_id: req.params.id}, function(err, mentor) {
//       if(err) {
//         console.log('Could not find');
//       } else {
//         res.json(mentor);
//   }
//   })
//   }

};

module.exports = new eventController();
