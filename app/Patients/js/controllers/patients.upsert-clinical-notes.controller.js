(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertClinicalNotesCtrl', PatientUpsertClinicalNotesCtrl);

    PatientUpsertClinicalNotesCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertClinicalNotesCtrl($scope, $stateParams, $state, Patient, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.canvasEnabled = true; //TODO: user.settings.canvasEnabled;
            $scope.clinicalNote = $scope.$parent.clinicalNote;
            $scope.directiveFn = $scope.$parent.directiveFn;
            $scope.saveBtnName = $scope.readOnly ? 'View' : 'Add';
            $scope.dialogTitle = $scope.saveBtnName + " Clinical Note";
        }
    }
})();
