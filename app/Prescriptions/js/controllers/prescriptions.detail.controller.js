(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

  PrescriptionDetailCtrl.$inject = [
    '$scope',
    '$stateParams',
    'Prescription',
    'Account',
    '$state',
    '$rootScope'
  ];

  function PrescriptionDetailCtrl($scope, $stateParams, Prescription, Account, $state, $rootScope) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }

    var user = Account.getAuthenticatedAccount();
    $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;

    var pid = $stateParams.prescriptionId;
    var params = {
      user: user.mobile,
      sessionId: user.sessionId,
      pid: pid,
      columnsToGet: ""
    };

    $scope.$parent.detailView = pid;
    $scope.prescription = Prescription.get(params);
    $scope.myPromise = $scope.prescription.$promise;
  }
})();
