myApp.controller('eventController', ['eventFactory', '$location', function(eventFactory, $location){

  this.newEvent = function addEvent(events){
    console.log("adding event", events);
    eventFactory.addEvent(events, function(data){
      if(data.hasOwnProperty('errors')){
      }else {
        console.log("it worked i think");
      }
    })
  }

}])
