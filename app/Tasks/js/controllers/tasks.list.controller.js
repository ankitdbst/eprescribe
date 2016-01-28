(function () {
    'use strict';
    angular.module('ERemediumWebApp.tasks.controllers')
            .controller('TasksListCtrl', TasksListCtrl);
    TasksListCtrl.$inject = ['$scope', 'Task', '$state', '$rootScope'];
    function TasksListCtrl($scope, Task, $state, $rootScope) {
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
        
        $scope.taskList = new Array();
        $rootScope.pendingTasksCount = $scope.taskList.length;
//        Task.query({
//            user: "",
//            sessionId: "433781068949947", //$rootScope.sessionId,
//            doctorId: "101", //$rootScope.userId,
//            limit: 50,
//            columnsToGet: ""
//        }, function (response) {
//            $scope.patientList = response;
//        }
//        );

        //Functions

    }
})();