(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

  PrescriptionNewOrEditCtrl.$inject = ['$scope', 'Prescription', '$stateParams'];

  function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams) {
    var pid = $stateParams.id;

    if (angular.isDefined(pid)) {
      $scope.prescription = Prescription.get({
        user: 'sujeet',
        sessionId: '78131321',
        pid: pid
      });
      $scope.prescription.isUpdate = true; // for edit we change this to true
    } else {
      $scope.prescription = new Prescription();
      // Fill defaults from session object maybe
      $scope.prescription.isUpdate = false; // for edit we change this to true
      // Medications
      $scope.prescription.medcines = [];
    }

    $scope.save = UpsertPrescription;

    function UpsertPrescription() {
      $scope.prescription.patientId = 2;
      $scope.prescription.doctorId = 101;

      var params = {
        user: 'sujeet',
        sessionId: '78131321',
        prescription: $scope.prescription
      };
      Prescription.upsert(params, $scope.prescription);
    }
  }

}) ();