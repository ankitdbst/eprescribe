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
          autoActivateChild: 'PatientNewOrEdit.PrescriptionIndex'
        }
      })
      .state('PatientNewOrEdit.Vitals', {
        templateUrl: 'Patients/partials/patients.vitals.html',
        controller: 'PatientsVitalsCtrl'
      })
      .state('PatientNewOrEdit.PrescriptionIndex', {
        url: '/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.index.html',
        controller: 'PrescriptionIndexCtrl',
        params: {
          autoActivateChild: 'PatientNewOrEdit.PrescriptionIndex.List'
        }
      })
      .state('PatientNewOrEdit.PrescriptionIndex.List', {
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl'
      })
      .state('PatientNewOrEdit.PrescriptionIndex.Detail', {
        url: '/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl'
      })
    }
  ]);
})();