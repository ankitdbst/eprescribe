'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
  'ngRoute',
  'ERemediumWebApp.patients',
  'ERemediumWebApp.reportinganalytics',
  'ERemediumWebApp.doctor_settings'
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/patients'});
}]);
