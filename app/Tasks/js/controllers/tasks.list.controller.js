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

        Initialize();

        function Initialize() {
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
            CreateDummyTaskList();
        }

        function CreateDummyTaskList() {

            
            var task1 = {};
            task1.type = "Refill Request";
            task1.dateadded = "30/04/2016";
            task1.status = "Pending";
            task1.patient = {};
            task1.patient.patientId = "169080020875355";
            task1.patient.mobile = 9910430979;
            task1.patient.patientName = "Aryan Singh";

            var task2 = {};
            task2.type = "Lab Results";
            task2.dateadded = "27/04/2016";
            task2.status = "Pending";
            task2.patient = {};
            task2.patient.patientId = "764505141092893";
            task2.patient.mobile = 9234567890;
            task2.patient.patientName = "Rohit Singh Saini";

            var task3 = {};
            task3.type = "Lab Results";
            task3.dateadded = "26/04/2016";
            task3.status = "Pending";
            task3.patient = {};
            task3.patient.patientId = "726284709754468";
            task3.patient.mobile = 9234567890;
            task3.patient.patientName = "Vishwajeet Saini Sr.";

            var task4 = {};
            task4.type = "Refill Request";
            task4.dateadded = "24/04/2016";
            task4.status = "Pending";
            task4.patient = {};
            task4.patient.patientId = "8014201593870209";
            task4.patient.mobile = 9910456723;
            task4.patient.patientName = "Ashutosh Bhatia";

            var task5 = {};
            task5.type = "Refill Request";
            task5.dateadded = "10/04/2016";
            task5.status = "Rejected";
            task5.patient = {};
            task5.patient.patientId = "8732237602918102";
            task5.patient.mobile = 9876543334;
            task5.patient.patientName = "Pahul Jain";

            var task6 = {};
            task6.type = "Refill Request";
            task6.dateadded = "02/04/2016";
            task6.status = "Approved";
            task6.patient = {};
            task6.patient.patientId = "168623978562710";
            task6.patient.mobile = 9818647551;
            task6.patient.patientName = "Sujit Chaudhary";

            var task7 = {};
            task7.type = "Lab Results";
            task7.dateadded = "01/04/2016";
            task7.status = "Viewed";
            task7.patient = {};
            task7.patient.patientId = "8729179790399743";
            task7.patient.mobile = 9717271217;
            task7.patient.patientName = "Rohan Gupta";

            $scope.taskList = [task1, task2, task3, task4, task5, task6, task7];
        }
    }
})();