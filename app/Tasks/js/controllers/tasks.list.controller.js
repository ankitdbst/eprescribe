(function () {
    'use strict';
    angular.module('ERemediumWebApp.tasks.controllers')
            .controller('TasksListCtrl', TasksListCtrl);
    TasksListCtrl.$inject = ['$scope', 'Task', '$state', '$rootScope', 'Account'];
    function TasksListCtrl($scope, Task, $state, $rootScope, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        $rootScope.pageHeader = "Tasks";
        $scope.buttonText = function (taskObjType) {
            if (taskObjType == "Refill Request") {
                return "Go to Prescription";
            } else if (taskObjType == "Lab Results") {
                return "View Lab Results";
            } else {
                return "Take Action";
            }
        }


        //Functions

    }
})();