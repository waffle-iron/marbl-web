myApp.controller('eventController', ['eventFactory', 'UserFactory', '$location','$routeParams', function(eventFactory, UserFactory, $location, $routeParams){
  var _this = this
  this.newEvent = function newEvent(events){
    geocodeAddress(events, function(lat, long){
      console.log("in the callback");

      events.coordinatesLong = long
      events.coordinatesLat = lat
      console.log(events);
      // events.coordinates= {"long":long}
      // events.coordinates.lat = lat;
      // events.coordinates.long = long

    eventFactory.newEvent(events, function(data){
      // console.log("adding event", data);


      if(data.hasOwnProperty('errors')){
      }else {
        $location.path('/addEvent')
        // console.log("it worked i think");
        getAll()
      }
    })
  })
}


    function getAll(){
      eventFactory.showevents(function(events){
        _this.events = events;

      })
    }

    getAll()



    var geocoder = new google.maps.Geocoder();

    function geocodeAddress(geoAddress, callback) {
      // console.log("have this information", geoAddress.address );
      var address = geoAddress.address.street;
      geocoder.geocode({'address': address}, function(results, status) {
        if (status === 'OK') {
          // resultsMap.setCenter(results[0].geometry.location);
          var marker = new google.maps.Marker({
            // map: resultsMap,
            position: results[0].geometry.location
          });


          callback(results[0].geometry.location.lat(), results[0].geometry.location.lng());

          // console.log("got the latitude", results[0].geometry.location.lat());
          // console.log("got the longitude", results[0].geometry.location.lng());
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

    this.edit = function edit(eventId, myEvent){
      eventFactory.edit(eventId, myEvent, function(data){
        if(data.hasOwnProperty('errors')){
          console.log("errors");
        }else{
          $location.path('/addEvent')
        }
      })
    }

    this.deleteEvent = function deleteEvent(eventId){
      console.log("this function worked and i have the id", eventId)
      eventFactory.deleteEvent(eventId, function(data){
        if(data.hasOwnProperty('errors')){
          console.log("errors");
        }else{
          getAll();
        }
      })
    }

    this.sendtoEdit=function sendtoEdit(eventi){

    }

    this.newAdmin = function newAdmin(admin){
      console.log(admin);
      UserFactory.newAdmin(admin, function(data){
        if(data.hasOwnProperty('errors')){
        }else {
          $location.path('/addEvent')
          console.log("went to controller");
        }
      })
    }

    var oneEvent = [];
    this.displayFlag = false;
    this.hoverIn = function hoverIn(eventi){

      _this.displayFlag = true;



      console.log(eventi.address.street);
      _this.showhidden = eventi

      console.log("this is working");
    }

    this.hoverOut = function hoverOut(){
      _this.displayFlag = false;

    }

}])
