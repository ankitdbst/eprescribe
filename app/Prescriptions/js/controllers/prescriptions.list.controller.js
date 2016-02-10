(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionListCtrl', PrescriptionListCtrl);

    PrescriptionListCtrl.$inject = [
      '$scope',
      '$stateParams',
      'Prescription',
      'Account'
    ];

    function PrescriptionListCtrl($scope, $stateParams, Prescription, Account) {
      var user = Account.getAuthenticatedAccount();
      var patientId = $stateParams.patientId;

      $scope.$parent.detailView = null;
      $scope.prescriptions = $scope.$parent.prescriptions;

      $scope.canvasEnabled = user.settings.canvasEnabled;
      $scope.sortSearchResultsReverse = false;// set the default sort order
      $scope.sortSearchResultsType = ''// set the default sort type

      var params = {
        user        : user.mobile,
        sessionId   : user.sessionId,
        doctorId    : user.userId,
        patientId   : patientId,
        limit       : 10,
        columnsToGet: ""
      };

      $scope.prescriptions = Prescription.list(params);
      $scope.myPromise = $scope.prescriptions.$promise;
      $scope.delete = Delete;

      function Delete(index) {
        $scope.prescriptions.splice(index, 1);
        // No prescription delete API as yet. But we need to call here.
      }
    }
})();