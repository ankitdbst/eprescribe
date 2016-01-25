(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope) {

        //Initialize
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
            doctorId: "101",//$rootScope.userId,
            limit: 10,
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
            $scope.patient = Patient.query($scope.patient.search.mobilenumber);
            //If found go to Profile Page else throw alert!
            if (angular.isUndefined($scope.patient))
            {
                alert('Patient not found!');
            } else
            {
                //Navigate to Profile Page using patient Id!
            }
            searchParameterReset();
        }
    }
})();