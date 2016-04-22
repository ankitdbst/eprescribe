(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionIndexCtrl', PrescriptionIndexCtrl);

  PrescriptionIndexCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    'ngDialog',
    'Prescription',
    '$stateParams',
    'Account'
  ];

  function PrescriptionIndexCtrl($scope, $rootScope, $state, ngDialog, Prescription, $stateParams, Account) {
    $rootScope.pageHeader = "Prescriptions";

    var patientId = $stateParams.patientId;
    var user = Account.getAuthenticatedAccount();

    $scope.prescription = new Prescription;
    Init();

    $scope.prescriptions = [];

    $scope.create = CreatePrescription;
    $scope.clone = ClonePrescription;
    $scope.minimized = false;

    function Init() {
      $scope.prescription.patientId = patientId;
      $scope.prescription.doctorId = user.userId;
      // Fill defaults from session object maybe
      $scope.prescription.isUpdate = false; // for edit we change this to true
      // Medications
      $scope.prescription.medcines = [];
      $scope.prescription.advises = [];

      var defaultDate = new Date();
      // Add 7 days
      defaultDate.setDate(defaultDate.getDate() + 7);
      $scope.prescription.nextVisit = {};
      $scope.prescription.nextVisit.date = moment(defaultDate).format("DD/MM/YYYY hh:mm A");
    }

    function CreatePrescription() {
      $state.go('PrescriptionNewOrEdit', {
        patientId: $stateParams.patientId
      });
    }
    
    

    function ClonePrescription(pid) {
      if (_.isUndefined(pid))
        pid = $stateParams.prescriptionId;

      var params = {
        user: user.mobile,
        sessionId: user.sessionId,
        pid: pid,
        columnsToGet: ""
      };

      $scope.prescription = Prescription.get(params);
      $scope.prescription.$promise.then(function (response) {
        delete $scope.prescription.pid; // We do not want to send the pid;
        delete $scope.prescription._id;
        CreatePrescription();
      });
    }
  }

})();
