myApp.controller('UserController', ['$scope', "UserFactory", "$location", function($scope, UserFactory, $location){


  this.loginUser = function(user){
    console.log(user);
    UserFactory.loginUser(user, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.loginErrors=data.errors
      }else{
        $location.path('/addEvent')
        console.log("go somehwere");
      }
    })
  }


}])
