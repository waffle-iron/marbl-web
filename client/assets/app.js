
var myApp = angular.module('myApp', ['ngRoute']);

myApp.config(function ($httpProvider, $routeProvider) {
$httpProvider.interceptors.push(
  function($q, $location) {
  return {
      'responseError':function(rejection){
      if (rejection.status == 401){
          $location.url('/');
      }
      return $q.reject(rejection);
  }
};
});
  $routeProvider
  .when('/',{
      templateUrl: 'assets/partials/loginpage.html',
       controller: 'UserController',
       controllerAs: "meep"
  })

  .when('/addEvent', {
    templateUrl:'assets/partials/input_page.html',
    controller: 'eventController',
    controllerAs:"meep"
  })
  .when('/allevents',{
      templateUrl: 'assets/partials/allevents.html',
      // controller: 'newMentorController',
      // controllerAs: "meep"
  })
  // .when('/mentor/signup',{
  //     templateUrl: 'assets/partials/mentor/signup.html',
  //     controller: 'newMentorController',
  //     controllerAs: "meep"
  // })
  // .when('/mentee/signup',{
  //     templateUrl: 'assets/partials/mentee/signup.html',
  //     controller: 'newMenteeController',
  //     controllerAs: "meep"
  // })
  // .when('/mentor/platform/:id',{
  //     templateUrl: 'assets/partials/mentor/platform2.html',
  //     // controller: 'filteredMenteeController',
  //     // controllerAs: "meep"
  // })
  // .when('/mentee/platform/:id',{
  //     templateUrl: 'assets/partials/mentee/platform.html',
  //     // controller: 'filteredMentorController',
  //     // controllerAs: "meep"
  // })
  // .when('/login',{
  //     templateUrl: 'assets/partials/login.html',
  //     // controller: 'newMentorController',
  //     // controllerAs: "meep"
  // })
  // .when('/message',{
  //     templateUrl: 'assets/partials/message.html',
  //     controller: 'chat'
  // })
  // .when('/form',{
  //     templateUrl: 'assets/partials/form.html',
  //     controller: 'mentorController',
  //     controllerAs: "meep"
  // })
    .otherwise({
      redirectTo: '/'
    });
});
