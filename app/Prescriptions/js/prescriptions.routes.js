(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$routeProvider',

    function($routeProvider) {
      $routeProvider
      .when('/prescriptions', {
        templateUrl: 'Prescriptions/partials/index.html',
        controller: 'PrescriptionsIndexCtrl'
      })
      .when('/medicines', {
        templateUrl: 'Prescriptions/partials/medicine-new.html',
        controller: 'MedicinesIndexCtrl'
      });
    }
  ]);
}) ();