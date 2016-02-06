(function () {
  'use strict'
  angular.module('ERemediumWebApp.patients.routes')

  .config([
    '$stateProvider',

    function ($stateProvider) {
      $stateProvider
      .state('PatientsList', {
        url: '/patients',
        templateUrl: 'Patients/partials/patients.list.html',
        controller: 'PatientsListCtrl'
      })
      .state('PatientNewOrEdit', {
        url: '/patients/edit/:patientId',
        templateUrl: 'Patients/partials/patients.edit.html',
        controller: 'PatientNewOrEditCtrl',
        params: {
          autoActivateChild: 'PatientNewOrEdit.PrescriptionList'
        }
      })
      .state('PatientNewOrEdit.PrescriptionList', {
        url: '/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PatientNewOrEdit.PrescriptionDetail', {
        url: '/prescriptions/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl'
      })
    }
  ]);
})();