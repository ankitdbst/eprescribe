(function () {
    'use strict';

    angular.module('ERemediumWebApp.labs.controllers')
            .controller('LabsIndexCtrl', LabsIndexCtrl);

    LabsIndexCtrl.$inject = ['$scope', 'Labs', '$state', '$rootScope', 'Account', '$stateParams'];

    function LabsIndexCtrl($scope, Labs, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Lab & Imaging";
        }
    }
})();