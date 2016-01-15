'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
  'ngRoute',
  'ui.bootstrap',
  'ngMessages',
  'ERemediumWebApp.patients',
  'ERemediumWebApp.reportinganalytics',
  'ERemediumWebApp.doctor_settings',
  'ERemediumWebApp.login',

  'ERemediumWebApp.prescriptions',
  'ERemediumWebApp.utils'
]).

config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/login'});
}]);
