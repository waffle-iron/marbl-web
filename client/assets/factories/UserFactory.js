myApp.factory('LoginFactory', ['$http', '$location', function($http, $location){

  var factory={}
  factory.loginUser=function(user, callback){
    $http({
      method: "POST",
      url:"/login",
      data:user
    }).then(function(returned_data){
      console.log("factory recieved response:", returned_data.data);
      callback(returned_data.data);
    })
  }

  return factory;
}])
