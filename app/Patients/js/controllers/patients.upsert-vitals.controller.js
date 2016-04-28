(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertVitalCtrl', PatientUpsertVitalCtrl);

    PatientUpsertVitalCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PatientUpsertVitalCtrl($scope, $stateParams, Patient, $state, $rootScope, Account, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();
        
        function Initialize() {
            $scope.vital = $scope.$parent.vital;
            $scope.saveBtnName = _.isEmpty($scope.vital) ? 'Add' : 'Update';
        }
    }
})();