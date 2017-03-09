myApp.factory('userFactory', ['$http', '$location', function($http, $location){

  var factory={}

  factory.newSignup = function(user, callback){
    console.log(user);
    $http({
      method: "POST",
      url: "/newSignup",
      data: user
    }).then(function(returned_data){
      console.log("factory responded with this information", returned_data.data);
      callback(returned_data.data);
    })
  }

  return factory;
}])
