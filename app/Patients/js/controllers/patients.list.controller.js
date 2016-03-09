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

        function getDoctorProfile() {
            //Get Patient Details from server and populate patient object..
            $scope.myPromise = Patient.get({
                user: $scope.account.userId, //DoctorId
                sessionId: $scope.account.sessionId,
                doctorId: false,
                limit: 50,
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
                $rootScope.profileImageURL = "img/User.jpg";//$scope.doctor.profileImageURL;
            });
        }

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

        //Functions
        function createPatientProfile() {
            $state.go('PatientNewOrEdit');
        }

        function searchByMobileNumber() {

            $scope.searchPatientResults = Patient.searchByMobile({
                user: "",
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
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
                    angular.forEach($scope.searchPatientResults, function (patient) {
                        patient.profileImageURL = "img/User1.jpg";//this should come from backend, TEMPORARY
                        //TODO:DUMMY for TESTING, REMOVE LATER
                        if (patient.firstName == "Rohit") {
                            patient.isNew = true;
                        }
                    });
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