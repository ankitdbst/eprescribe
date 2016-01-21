(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

  PrescriptionNewOrEditCtrl.$inject = ['$scope', 'Prescription', '$stateParams', '$state'];

  function PrescriptionNewOrEditCtrl($scope, Prescription, $stateParams, $state) {
    var pid = $stateParams.id;

    if (pid !== undefined && pid.length !== 0) {
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

    $scope.saved = false;

    // Methods
    $scope.save = UpsertPrescription;
    $scope.close = Close;
    $scope.order = Order;

    function UpsertPrescription() {
      $scope.prescription.patientId = 2;
      $scope.prescription.doctorId = 101;

      var params = {
        user: 'sujeet',
        sessionId: '78131321',
        prescription: $scope.prescription
      };
      Prescription.upsert(params, $scope.prescription);
      $scope.saved = true;
    }

    function Close() {
      $state.go('PrescriptionList');
    }

    function Order() {
      if( !$scope.saved ) { // Defensive
        UpsertPrescription();
      }

      $state.go('PrescriptionOrder', {
        id: $scope.prescription.pid
      });
    }
  }

}) ();