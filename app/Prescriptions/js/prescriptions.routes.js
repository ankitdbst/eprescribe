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
        url: '/prescriptions/edit/:id',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl'
      })
      .state('PrescriptionNewOrEdit.AddMedicine', {
        url: '',
        templateUrl: 'Prescriptions/partials/prescriptions.add-medicine.html',
        controller: 'PrescriptionAddMedicineCtrl'
      });
    }
  ]);
}) ();