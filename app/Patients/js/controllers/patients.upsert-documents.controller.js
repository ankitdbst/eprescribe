(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertDocumentsCtrl', PatientUpsertDocumentsCtrl);

    PatientUpsertDocumentsCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertDocumentsCtrl($scope, $stateParams, $state, Patient, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.document = $scope.$parent.document;
            $scope.saveBtnName = _.isEmpty($scope.document) ? 'Add' : 'Update';
            $scope.dialogTitle = $scope.saveBtnName + " Document";
        }
    }
})();