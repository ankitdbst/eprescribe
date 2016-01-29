(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

    PatientNewOrEditCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope'];

    function PatientNewOrEditCtrl($scope, $stateParams, Patient, $state, $rootScope) {
        //Intialize
        $scope.showAlert = false;
        $scope.genders = ["Male", "Female"];
        $scope.relationshiptypes = ["", "Daughter", "Son", "Wife", "Father", "Mother", "Grand Father", "Grand Mother", "Brother", "Sister", "Others"];
        $rootScope.pageHeader = "Patient Profile";

        if ($stateParams.patientId == '') {
            //A new patient profile is being created!
            //Set empty object..
            $scope.patient = {};
            $scope.patient.history = {};
            $scope.patient.alergy = {};
            $scope.patient.address = {};
            $scope.patient.isUpdate = false;
            $scope.patient.sex = "Male";//set default value..
            $scope.patient.relation = "";
        } else {
            //Get Patient Details from server and populate patient object..
            Patient.get({
                user: $stateParams.patientId,
                sessionId: $rootScope.sessionId,
                doctorId: false,
                limit: 50,
                columnsToGet: ""
            }, function (response) {
                $scope.patient = response;
                $scope.patient.isUpdate = true;
            });
        }


        //Functions..
        $scope.savePatientProfile = SavePatientProfile;
        $scope.close = Close;

        //Functions
        function SavePatientProfile() {
            //A computed property!
            $scope.patient.isDependant = ($scope.patient.relation == '') ? "false" : "true";
            //Delete redundant properties
            delete $scope.patient["_id"];
            Patient.upsert({
                user: $scope.patient.patientId,
                sessionId: $rootScope.sessionId,
                doctorId: $rootScope.userId,
                patientId: $scope.patient.patientId,
                userMap: $scope.patient
            }, function (response) {
                $scope.showAlert = true;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving, Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient Profile Saved Successfully!";
                    $scope.alertClass = "alert-success";
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function Close() {
            $state.go('PatientsList');
        }
    }

})();