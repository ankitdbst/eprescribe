(function () {
    'use strict';

    angular.module('ERemediumWebApp.pharmacy.controllers')
            .controller('PharmacyIndexCtrl', PharmacyIndexCtrl);

    PharmacyIndexCtrl.$inject = ['$scope', 'Pharmacy', '$state', '$rootScope', 'Account', '$stateParams'];

    function PharmacyIndexCtrl($scope, Pharmacy, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Pharmacy";
        }
    }
})();