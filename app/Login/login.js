'use strict';

angular.module('ERemediumWebApp.login', ['ngRoute', 'ngMessages'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/login', {
    templateUrl: 'Login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function() {

}]);