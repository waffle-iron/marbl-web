myApp.controller('userController', ['$scope', "userFactory", "$location",

function($scope, userFactory, $location){

  this.newSignup = function(user){
    console.log(user);
    userFactory.newSignup(user, function(data){
      if(data.hasOwnProperty('errors')){
        $scope.loginErrors=data.errors
      } else{
        console.log("added to list");
        $location.path('/NEEDTOADDFORMPATHHERE')
      }
    })
  }
}]);
