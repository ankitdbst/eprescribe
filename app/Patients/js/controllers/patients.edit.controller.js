(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

    PatientNewOrEditCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PatientNewOrEditCtrl($scope, $stateParams, Patient, $state, $rootScope, Account, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();


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
            $scope.patient.hasAllPrescriptionsAccess = false; //When creating a new patient, it should NOT have default access to ALL prescriptions
            $scope.patient.isNew = false; //It would be existing patient for doctor who is creating profile.
            $scope.patient.userType = "patient";
        } else {
            //Get Patient Details from server and populate patient object..
            $scope.myPromise = Patient.get({
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                limit: 50,
                columnsToGet: ""
            }, function (response) {
                $scope.patient = response;
                $scope.patient.isUpdate = true;
                //TODO: dummy for now, profileimage should come from backend..
                $scope.patient.profileImageURL = "img/User1.jpg"; //
            });
        }



        $scope.savePatientProfile = SavePatientProfile;
        $scope.getAllPrescriptionsAccess = GetAllPrescriptionsAccess;

        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            alert('Uploaded..');
            $scope.uploader.flow.upload();//TODO Post Image..
        };

        //Functions
        function Initialize() {
            $scope.showAlert = false;
            $scope.genders = ["Male", "Female"];
            $scope.relationshiptypes = ["None", "Daughter", "Son", "Wife", "Father", "Mother", "Grand Father", "Grand Mother", "Brother", "Sister", "Others"];
            $rootScope.pageHeader = "Patient Profile";
            $scope.bloodgroups = ["None", "A+", "A-", "A Unknown", "B+", "B-", "B Unknown", "AB+", "AB-", "AB Unknown", "O+", "O-", "O Unknown"];
        }

        function SavePatientProfile(section) {
            //A computed property!
            $scope.patient.isDependant = ($scope.patient.relation == '') ? "false" : "true";
            //Delete redundant properties
            var params = {
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $scope.patient.patientId,
                userMap: $scope.patient
            };
            delete $scope.patient["_id"];
            $scope.myPromise = Patient.upsert(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetAllPrescriptionsAccess() {
            //Open Verify OTP pageÏ
            $state.go('PatientVerifyOTP', {patientId: $scope.patient.patientId})
        }
    }
})();