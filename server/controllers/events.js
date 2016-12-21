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
    //   this.registerMentor = function(req,res){
    //     console.log(req.body)
    //     Mentor.create(req.body, function(err, result) {
    //       if(err) {
    //         res.json(err);
    //       } else {
    //      res.json(result);
    //    }
    //   })
    //   }
//   this.registerMentee = function(req,res){
//     console.log(req.body)
//     Mentee.create(req.body, function(err, result) {
//       if(err) {
//         res.json(err);
//       } else {
//      res.json(result);
//    }
//   })
//   }
//   this.getAllMentors = function(req,res){
//     Mentor.find({}, function(err, mentors) {
//       if(err) {
//         res.json(err);
//       } else {
//         res.json(mentors);
//   }
//   })
//   }
//   this.getAllMentees = function(req,res){
//     Mentee.find({}, function(err, mentees) {
//       if(err) {
//         res.json(err);
//       } else {
//         res.json(mentees);
//   }
//   })
//   }
//
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
