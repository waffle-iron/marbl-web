myApp.factory('eventFactory', ['$http', function($http){
var factory = {}

factory.getevents = function(callback){
  $http.get('/getevents').then(function(returned_data){
    callback(returned_data.data);
  })
}

factory.addEvent = function(events,callback){
  console.log("factor got events", events);
  $http.post({
    method:"Post",
    url:"addevent",
    data: events
  }).then(function(returned_data){
    console.log("factory recieved this data", returned_data.data);
    callback(returned_data.data)
  })
}


return factory;
}]);
