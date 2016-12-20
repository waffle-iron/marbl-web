myApp.controller('UserController', ['$scope', "LoginFactory", "$location", function($scope, LoginFactory, $location){


  this.loginUser = function(user){
    console.log(user);
    LoginFactory.loginUser(user, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.loginErrors=data.errors
      }else{
        $location.path('/addEvent')
        console.log("go somehwere");
      }
    })
  }


}])
