myApp.factory('eventFactory', ['$http', function($http){
var factory = {}

factory.showevents = function(callback){
  $http.get('/showevents').then(function(returned_data){
    console.log(returned_data.data)
    callback(returned_data.data);
  })
}

factory.newEvent = function(events, callback){
  console.log("factory got events", events);
    $http.post('/newevent', events).then(function(returned_data){
    console.log("factory recieved this data", returned_data.data);
    callback(returned_data.data);
  })
}


return factory;
}]);
