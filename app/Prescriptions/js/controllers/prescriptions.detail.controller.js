(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

    PrescriptionDetailCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'Prescription', 'Account'];

    function PrescriptionDetailCtrl($scope, $state, $stateParams, $rootScope, Prescription, Account) {
      if(!Account.isAuthenticated()) {
        $state.go('login'); return;
      }
      var account = Account.getAuthenticatedAccount();

      var pid = $stateParams.prescriptionId;
      var params = {
          user: "sujeet",
          sessionId: account.sessionId,
          pid: pid,
          columnsToGet: ""
      };

      $scope.prescription = Prescription.get(params);
      $scope.myPromise = $scope.prescription.$promise;
    }

})();