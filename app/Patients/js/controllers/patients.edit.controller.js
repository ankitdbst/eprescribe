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
            $scope.patient.isUpdate = false;
            $scope.patient.gender = "Male";//set default value..
            $scope.patient.relationship = "None";
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
            alert($scope.patient.patientId);
            alert($rootScope.sessionId);
            alert($rootScope.userId);
            Patient.upsert({
                user: $scope.patient.patientId,
                sessionId: $rootScope.sessionId,
                doctorId: $rootScope.userId,
                patientId: $scope.patient.patientId,
                userMap: {
                    lastName: $scope.patient.lastName,
                    sex: $scope.patient.sex,
                    relation: $scope.patient.relation,
                    userType: "patient",
                    history: {
                        medical: $scope.patient.history.medical,
                        surgical: $scope.patient.history.surgical,
                        family: $scope.patient.history.family,
                        smoking: $scope.patient.history.smoking,
                        alcohol: $scope.patient.history.alcohol,
                        other: $scope.patient.history.other
                    },
                    patientId: $scope.patient.patientId,
                    alergy: {
                        drug: $scope.patient.drug,
                        food: $scope.patient.food,
                        env: $scope.patient.env
                    },
                    address: {
                        addressLine1: $scope.patient.addressLine1,
                        addressLine2: $scope.patient.addressLine2,
                        city: $scope.patient.city,
                        state: $scope.patient.state,
                        pincode: $scope.patient.pincode
                    },
                    email: $scope.patient.email,
                    isDependant: ($scope.patient.relation == '') ? false : true,
                    dob: $scope.patient.dob,
                    midlleName: $scope.patient.midlleName,
                    firstName: $scope.patient.firstName,
                    mobile: $scope.patient.mobile,
                    landlineNumber: $scope.patient.landlineNumber
                }
            }, function (response) {
                $scope.showAlert = true;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response) || response.result == 'Failure'){
                    $scope.alertMessage = "Error in saving, Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.result == "Success"){
                    $scope.alertMessage = "Patient Profile Saved Successfully!";
                    $scope.alertClass = "alert-success";
                } else {
                    alert(response.result);
                    $scope.alertMessage = response.result;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function Close() {
            $state.go('PatientsList');
        }
    }

})();