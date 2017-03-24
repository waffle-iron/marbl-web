
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
      templateUrl: 'assets/partials/home.html',
  })
  .when('/privacy',{
      templateUrl: 'assets/partials/privacy.html',
  })

  .when('/welcome', {
    templateUrl:'assets/partials/welcome.html',
    controller: 'userController',
    controllerAs:"meep"
  })
    .otherwise({
      redirectTo: '/'
    });
});
