(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertVitalCtrl', PatientUpsertVitalCtrl);

    PatientUpsertVitalCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertVitalCtrl($scope, $stateParams, $state, Patient, Account) {
        var user = Account.getAuthenticatedAccount();

        $scope.vital = $scope.$parent.vital;
        $scope.saveBtnName = _.isEmpty($scope.vital) ? 'Add' : 'Update';
        $scope.dialogTitle = $scope.saveBtnName + " Vital";
    }
})();