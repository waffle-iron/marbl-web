myApp.controller('eventController', ['eventFactory', '$location', function(eventFactory, $location){

  this.newEvent = function newEvent(events){
    console.log("adding event", events);
    eventFactory.newEvent(events, function(data){
      if(data.hasOwnProperty('errors')){
      }else {
        $location.path('/allevents')
        console.log("it worked i think");
      }
    })
  }

}])
