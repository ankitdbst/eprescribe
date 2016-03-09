(function () {
    'use strict';

    angular.module('ERemediumWebApp.messages.controllers')
            .controller('MessagesIndexCtrl', MessagesIndexCtrl);

    MessagesIndexCtrl.$inject = ['$scope', 'Messages', '$state', '$rootScope', 'Account', '$stateParams'];

    function MessagesIndexCtrl($scope, Messages, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Messages";
        }
    }
})();