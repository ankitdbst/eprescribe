(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope) {

        //Initialize
        $scope.showAlert = false;
        $scope.showSearchResults = false;
        $rootScope.pageHeader = "Patients";
        $scope.patient = {};
        searchParameterReset();
        $scope.getFullName = GetFullName;
        $scope.getFullAddress = GetFullAddress;
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

        function GetFullAddress(inputPatientObject) {
            return inputPatientObject.address.houseNo + ', ' + inputPatientObject.address.building + ', ' + inputPatientObject.address.locality + ', ' + inputPatientObject.address.landmark + ', ' + inputPatientObject.address.city + ', ' + inputPatientObject.address.pincode;
        }

        function GetFullName(inputPatientObject) {
            return inputPatientObject.firstName + " " + inputPatientObject.midlleName + " " + inputPatientObject.lastName;
        }

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