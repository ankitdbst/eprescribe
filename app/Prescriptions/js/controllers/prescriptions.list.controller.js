(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionListCtrl', PrescriptionListCtrl);

  PrescriptionListCtrl.$inject = [
    '$scope',
    '$stateParams',
    'Prescription',
    'Account',
    '$state'
  ];

  function PrescriptionListCtrl($scope, $stateParams, Prescription, Account, $state) {
    var user = Account.getAuthenticatedAccount();
    var patientId = $stateParams.patientId;

    $scope.$parent.detailView = null;
    $scope.prescriptions = $scope.$parent.prescriptions;

    $scope.canvasEnabled = user.settings.canvasEnabled;
    $scope.sortSearchResultsReverse = false;// set the default sort order
    $scope.sortSearchResultsType = ''// set the default sort type

    $scope.doctorName = user.name || "Manoj Saini"; // Should come from session
    var params = {
      user: user.mobile,
      sessionId: user.sessionId,
      doctorId: user.userId,
      patientId: patientId,
      columnsToGet: "creationDate,patientComplaint,diagnosis,medcines,advises",
      limit: 15
    };

    $scope.delete = Delete;
    $scope.load = Load;

    var pages = 0,
        size = 15,
        loading = false;

    Load();
    function Load() {
      if (loading) return;
      loading = true;
      params.limit += pages*size;
      $scope.myPromise = Prescription.list(params, function(response) {
        $scope.prescriptions = response;
        loading = false;
      }).$promise;
      pages++;
    }

    function Delete(index) {
      $scope.prescriptions.splice(index, 1);
      // No prescription delete API as yet. But we need to call here.
    }
  }
})();
