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

        $scope.patientList = Patient.query({
            user: "",
            sessionId: $scope.account.sessionId,
            doctorId: $scope.account.userId,
            limit: 50,
            columnsToGet: ""
        }, function (response) {
            $scope.patientList = response;
            angular.forEach($scope.patientList, function (patient) {
                patient.profileImageURL = "img/User1.jpg";//this should come from backend, TEMPORARY
            });
        }
        );

        $scope.myPromise = $scope.patientList.$promise;

        $scope.delete = Delete;
        
        //Functions
        function createNewVitals() {
            //TODO
        }

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            $scope.sortSearchResultsReverse = false;// set the default sort order for search results
            $scope.sortSearchResultsType = ''// set the default sort type for search results
            $scope.showAlert = false;
            $scope.showSearchResults = false;
            $rootScope.pageHeader = "Patients";
            $scope.patient = {};
            $scope.patient.search = {mobilenumber: ''};
        }

        function Delete(index) {
            $scope.vitalList.splice(index, 1);
            // No vital delete API as yet. But we need to call here.
        }
    }
})();