(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$routeProvider',

    function($routeProvider) {
      $routeProvider.when('/prescriptions', {
        templateUrl: 'Prescriptions/partials/index.html',
        controller: 'PrescriptionsIndexCtrl'
      });
    }
  ]);
}) ();