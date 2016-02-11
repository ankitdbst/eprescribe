(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsVitalsCtrl', PatientsVitalsCtrl);

    PatientsVitalsCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account'];

    function PatientsVitalsCtrl($scope, Patient, $state, $rootScope, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login');
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

//        $scope.vitalList = Patient.getVitals({
//            user: "",
//            sessionId: $scope.account.sessionId,
//            doctorId: $scope.account.userId,
//            limit: 50,
//            columnsToGet: ""
//        }, function (response) {
//            $scope.vitalList = response;
//        }
//        );
//      $scope.myPromise = $scope.patientList.$promise;

        $scope.vitalList = [{datetime: new Date(), temperature: "94 Armpit", pulse: 82, respiratoryrate: "-", bp: "124/82 Sitting", weight: "79"},
            {datetime: new Date(), temperature: "88 Armpit", pulse: 88, respiratoryrate: "-", bp: "126/78 Sitting", weight: "69"},
            {datetime: new Date(), temperature: "98 Armpit", pulse: 79, respiratoryrate: "-", bp: "130/88 Sitting", weight: "84"}
        ];



        $scope.delete = Delete;

        //Functions
        function createNewVitals() {
            //TODO
        }

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
        }

        function Delete(index) {
            $scope.vitalList.splice(index, 1);
            // No vital delete API as yet. But we need to call here.
        }
    }
})();