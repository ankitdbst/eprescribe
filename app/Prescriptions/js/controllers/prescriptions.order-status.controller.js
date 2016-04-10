(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionOrderStatusCtrl', PrescriptionOrderStatusCtrl);

  PrescriptionOrderStatusCtrl.$inject = ['$scope', '$stateParams', 'Account', '$state'];

  function PrescriptionOrderStatusCtrl($scope, $stateParams, Account, $state) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    $scope.account = Account.getAuthenticatedAccount();
    $scope.patientId = $stateParams.patientId;

  }
})();
