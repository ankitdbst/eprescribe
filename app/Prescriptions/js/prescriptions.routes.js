(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider
      .state('PrescriptionList', {
        url: '/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PrescriptionNewOrEdit', {
        url: '/prescriptions/edit/:pId',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl'
      })
      .state('PrescriptionNewOrEdit.UpsertMedicine', {
        url: '/medicines/:mId',
        templateUrl: 'Prescriptions/partials/prescriptions.upsert-medicine.html',
        controller: 'PrescriptionUpsertMedicineCtrl'
      })
      .state('PrescriptionOrder', {
        url: '/prescriptions/order/:pId',
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