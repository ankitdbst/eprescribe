(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('PrescriptionOrder', {
        url: '/patients/:patientId/prescriptions/order/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl'
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '/new-address',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/patients/:patientId/prescriptions/order/status/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html',
        controller: 'PrescriptionOrderStatusCtrl'
      });
    }
  ]);
}) ();