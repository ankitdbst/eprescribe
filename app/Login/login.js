'use strict';

angular.module('ERemediumWebApp.login', ['ui.router', 'ngMessages'])

.
config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('login', {
    url: '/login',
    templateUrl: 'Login/login.html',
    controller: 'LoginCtrl'
  });
}])

.controller('LoginCtrl', [function() {

}]);