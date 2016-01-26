(function () {
    'use strict';

    angular.module('ERemediumWebApp.tasks.controllers')
            .controller('TasksListCtrl', TasksListCtrl);

    TasksListCtrl.$inject = ['$scope', 'Task', '$state', '$rootScope'];

    function TasksListCtrl($scope, Task, $state, $rootScope) {

        alert('tasks');
        //Initialize
        $rootScope.pageHeader = "Tasks";

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