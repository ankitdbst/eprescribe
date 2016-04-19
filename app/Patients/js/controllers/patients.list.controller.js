(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', '$stateParams'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        //GetDoctorProfile..
        getDoctorProfile();

        //Functions..
        $scope.searchByMobileNumber = searchByMobileNumber;
        $scope.createPatientProfile = createPatientProfile;
        $scope.openPatientProfile = openPatientProfile;

        function initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Patients";
            $scope.patient = {};
            $scope.patient.search = {mobilenumber: ''};
        }

        function getDoctorProfile() {
            //Get Patient Details from server and populate patient object..
            $scope.myPromise = Patient.get({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
                $rootScope.doctor = $scope.doctor;
            });
        }

        $scope.patientList = Patient.query({
            user: $scope.account.userId,
            sessionId: $scope.account.sessionId,
            doctorId: $scope.account.userId,
            limit: 50,
            columnsToGet: ""
        }, function (response) {
            $scope.patientList = response;
        }
        );

        $scope.myPromise = $scope.patientList.$promise;

        //Functions
        function createPatientProfile() {
            $state.go('PatientNewOrEdit');
        }

        function searchByMobileNumber() {

            $scope.searchPatientResults = Patient.searchByMobile({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                mobile: $scope.patient.search.mobilenumber,
                limit: 50,
                columnsToGet: ""
            }, function (response) {
                if (angular.isUndefined(response) || response == '')
                {
                    $scope.showAlert = true;
                    $scope.alertMessage = "No Patient Found with Mobile Number: " + $scope.patient.search.mobilenumber + "!";
                } else
                {
                    $scope.showAlert = false;
                    $scope.patientList = response;
                }
            }
            );

            $scope.myPromise = $scope.searchPatientResults.$promise;
        }

        function openPatientProfile(patient) {
            //If Patient is new for logged in doctor show OTP else directly go to patient profile
            if (!patient.isNew) {
                $state.go('PatientNewOrEdit', {patientId: patient.patientId})
            } else {
                $state.go('PatientVerifyOTP', {patientId: patient.patientId})
            }
        }
    }
})();