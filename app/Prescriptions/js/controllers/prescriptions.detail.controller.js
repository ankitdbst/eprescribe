(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

    PrescriptionDetailCtrl.$inject = [
      '$scope',
      '$stateParams',
      'Prescription',
      'Account'
    ];

    function PrescriptionDetailCtrl($scope, $stateParams, Prescription, Account) {
      var user = Account.getAuthenticatedAccount();

      var pid = $stateParams.prescriptionId;
      var params = {
        user        : user.mobile,
        sessionId   : user.sessionId,
        pid         : pid,
        columnsToGet: ""
      };

      $scope.$parent.detailView = pid;
      $scope.prescription = Prescription.get(params);
      $scope.myPromise = $scope.prescription.$promise;
    }
})();