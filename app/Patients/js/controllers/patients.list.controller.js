(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope, Account) {
        if(!Account.isAuthenticated()) {
          $state.go('login'); return;
        }
        var account = Account.getAuthenticatedAccount();

        //Initialize
        $scope.sortType = ''; // set the default sort type
        $scope.sortReverse = false;  // set the default sort order
        $scope.sortSearchResultsReverse = false;// set the default sort order for search results
        $scope.sortSearchResultsType = ''// set the default sort type for search results
        $scope.showAlert = false;
        $scope.showSearchResults = false;
        $rootScope.pageHeader = "Patients";
        $scope.patient = {};
        searchParameterReset();
        $scope.searchByMobileNumber = SearchByMobileNumber;
        $scope.createPatientProfile = CreatePatientProfile;


        $scope.patientList = Patient.query({
            user: "",
            sessionId: account.sessionId, //$rootScope.sessionId,
            doctorId: account.userId, //$rootScope.userId,
            limit: 50,
            columnsToGet: ""
        }, function (response) {
            $scope.patientList = response;
        }
        );

        $scope.myPromise = $scope.patientList.$promise;

        //Functions
        function CreatePatientProfile() {
            $state.go('PatientNewOrEdit');
        }

        function searchParameterReset() {
            $scope.patient.search = {mobilenumber: ''};
        }


        function SearchByMobileNumber() {

            $scope.searchPatientResults = Patient.searchByMobile({
                user: "",
                sessionId: $rootScope.sessionId,
                doctorId: false,
                mobile: $scope.patient.search.mobilenumber,
                columnsToGet: ""
            }, function (response) {
                if (angular.isUndefined(response) || response == '')
                {
                    $scope.showAlert = true;
                    $scope.alertMessage = "No Patient Found with Mobile Number: " + $scope.patient.search.mobilenumber + "!";
                    $scope.showSearchResults = false;
                } else
                {
                    $scope.showAlert = false;
                    $scope.showSearchResults = true;
                    $scope.searchPatientResults = response;
                }
            }
            );

            $scope.myPromise = $scope.searchPatientResults.$promise;
        }
    }
})();