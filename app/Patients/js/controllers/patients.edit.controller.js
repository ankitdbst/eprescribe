(function() {
  'use strict';

  angular.module('ERemediumWebApp.patients.controllers')
  .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

  PatientNewOrEditCtrl.$inject = ['$scope', 'Patient'];

  function PatientNewOrEditCtrl($scope, Patient) {
    $scope.patient = new Patient();
    // Fill defaults from session object maybe
    $scope.patient.patientId = '';
//    $scope.patient.doctorId = '';
    $scope.patient.isUpdate = false; // for edit we change this to true

    $scope.save = CreatePatient;

    // Store all relationships e.g. Father, Mother needed in case of childrens
    $scope.patient.relationships = [];

    function CreatePatient() {
      var params = {};
      Patient.upsert(params, $scope.patient);
    }
  }

}) ();