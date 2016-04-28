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
        Initialize();

        //Functions..
        $scope.searchByMobileNumber = searchByMobileNumber;
        $scope.createPatientProfile = createPatientProfile;
        $scope.openPatientProfile = openPatientProfile;
        $scope.getPatientList = GetPatientList;

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Patients";
            $scope.patient = {};
            $scope.patient.search = {mobilenumber: ''};
            //retrieve full patient list from backend..
            GetPatientList();
        }

        function GetPatientList() {
            $scope.patientList = Patient.query({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                limit: 50,
                columnsToGet: "profileImageURL,firstName,midlleName,lastName,sex,age,mobile,email,patientId"
            }, function (response) {
                $scope.patientList = response;
            }
            );
            $scope.myPromise = $scope.patientList.$promise;
        }

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
                columnsToGet: "profileImageURL,firstName,midlleName,lastName,sex,age,mobile,email,patientId"
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
            $state.go('PatientNewOrEdit', {patientId: patient.patientId});
        }
    }
})();