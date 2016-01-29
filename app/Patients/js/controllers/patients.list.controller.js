(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope) {

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


        Patient.query({
            user: "",
            sessionId: "433781068949947", //$rootScope.sessionId,
            doctorId: "101", //$rootScope.userId,
            limit: 50,
            columnsToGet: ""
        }, function (response) {
            $scope.patientList = response;
        }
        );

        //Functions
        function CreatePatientProfile() {
            $state.go('PatientNewOrEdit');
        }

        function searchParameterReset() {
            $scope.patient.search = {mobilenumber: ''};
        }


        function SearchByMobileNumber() {

            Patient.searchByMobile({
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
        }
    }
})();