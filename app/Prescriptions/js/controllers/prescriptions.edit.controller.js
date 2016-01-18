(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

  PrescriptionNewOrEditCtrl.$inject = ['$scope', 'Prescription'];

  function PrescriptionNewOrEditCtrl($scope, Prescription) {
    $scope.prescription = new Prescription();
    // Fill defaults from session object maybe
    $scope.prescription.patientId = '';
    $scope.prescription.doctorId = '';
    $scope.prescription.isUpdate = false; // for edit we change this to true

    $scope.save = CreatePrescription;

    // Medications
    $scope.prescription.medcines = [];

    function CreatePrescription() {
      var params = {};
      Prescription.upsert(params, $scope.prescription);
    }
  }

}) ();