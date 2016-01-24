(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('PrescriptionList', {
        url: '/prescriptions/:patiendId',
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PrescriptionNewOrEdit', {
        url: '/prescriptions/edit/:id',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl'
      })
      .state('PrescriptionNewOrEdit.AddMedicine', {
        url: '',
        templateUrl: 'Prescriptions/partials/prescriptions.add-medicine.html',
        controller: 'PrescriptionAddMedicineCtrl'
      })
      .state('PrescriptionOrder', {
        url: '/prescriptions/order/:id',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl'
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      });
    }
  ]);
}) ();