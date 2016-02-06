(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('PrescriptionOrder', {
        url: '/prescriptions/order/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/prescriptions/order/status/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html'
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      });
    }
  ]);
}) ();