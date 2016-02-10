(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
  .controller('PrescriptionUpsertMedicineCtrl', PrescriptionUpsertMedicineCtrl);

  PrescriptionUpsertMedicineCtrl.$inject = ['$scope', '$stateParams', '$state', 'Prescription', 'Account'];

  function PrescriptionUpsertMedicineCtrl($scope, $stateParams, $state, Prescription, Account) {
    var user = Account.getAuthenticatedAccount();

    $scope.frequencies = ['Daily', 'Weekly', 'Monthly'];
    $scope.dispenseUnits = ['Tablet/Capsule', 'Strip', 'Bottle'];
    $scope.dosageUnits = ['tablet or capsule', 'ml', 'spoon'];

    $scope.medcine = $scope.$parent.medcine;
    $scope.saveBtnName = _.isEmpty($scope.medcine) ? 'Add' : 'Update';
    $scope.dialogTitle = $scope.saveBtnName + " Medicine";

    $scope.medcine.frequency = $scope.medcine.frequency || {};
    $scope.medcine.frequency.freq = $scope.medcine.frequency.freq || $scope.frequencies[0];
    $scope.medcine.dispenseUnit = $scope.medcine.dispenseUnit || $scope.dispenseUnits[0];
    $scope.medcine.frequency.dType = $scope.medcine.frequency.dType || $scope.dosageUnits[0];

    $scope.search = SearchMedicine;

    function SearchMedicine(searchText) {
      var params = {
        user        : user.mobile,
        sessionId   : user.sessionId,
        doctorId    : user.userId,
        searchText  : searchText,
        limit       : 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }
  }

}) ();