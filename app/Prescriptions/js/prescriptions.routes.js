(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('prescriptions', {
        url: '/prescriptions',
        templateUrl: 'Prescriptions/partials/index.html',
        controller: 'PrescriptionsIndexCtrl'
      })
      .state('prescriptions.addMedicine', {
        url: '/add-medicine',
        templateUrl: 'Prescriptions/partials/medicine-new.html',
        controller: 'MedicinesIndexCtrl'
      });
    }
  ]);
}) ();