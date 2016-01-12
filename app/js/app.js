'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
  'ngRoute',
  'ERemediumWebApp.patients',
  'ERemediumWebApp.reportinganalytics',
  'ERemediumWebApp.doctor_settings',
  'ERemediumWebApp.login'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
