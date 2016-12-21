myApp.controller('eventController', ['eventFactory', '$location', function(eventFactory, $location){

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
        $location.path('/allevents')
        console.log("it worked i think");
      }
    })
  })
}

  // this.mapPage = function initMap(geoAddress) {
  //
  //     var map = new google.maps.Map(document.getElementById('map'), {
  //       zoom: 8,
  //       center: {lat: -34.397, lng: 150.644}
  //     });
  //     var geocoder = new google.maps.Geocoder();
  //
  //     document.getElementById('submit').addEventListener('click', function() {
  //       alert("have the maps with geo code", geocoder)
  //       geocodeAddress(geocoder, map);
  //     });
  //   }
    // var latitude;
    // var longitude;
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
          // latitude =
          // longitude =

          callback(results[0].geometry.location.lat(), results[0].geometry.location.lng());

          // console.log("got the latitude", results[0].geometry.location.lat());
          // console.log("got the longitude", results[0].geometry.location.lng());
        } else {
          alert('Geocode was not successful for the following reason: ' + status);
        }
      });
    }

}])
