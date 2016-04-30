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
        $scope.account = account;

        Initialize();

        //Functions
        $scope.savePatientProfile = SavePatientProfile;
        $scope.savePatientPeripheralDetails = SavePatientPeripheralDetails;
        $scope.openPrescriptions = OpenPrescriptions;
        $scope.getAllPrescriptionsAccess = GetAllPrescriptionsAccess;

        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.patient.profileImageURL = uri;
                    SavePhoto("Photo");
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };

        //Functions
        function Initialize() {
            $scope.showAlert = false;
            $scope.genders = ["Male", "Female"];
            $scope.relationshiptypes = ["None", "Daughter", "Son", "Wife", "Father", "Mother", "Grand Father", "Grand Mother", "Brother", "Sister", "Others"];
            $rootScope.pageHeader = "Patient Profile";
            $scope.bloodgroups = ["None", "A+", "A-", "A Unknown", "B+", "B-", "B Unknown", "AB+", "AB-", "AB Unknown", "O+", "O-", "O Unknown"];
            if ($stateParams.patientId == '') {
                //A new patient profile is being created!
                //Set empty object..
                $scope.patient = {};
                $scope.patient.history = {};
                $scope.patient.alergy = {};
                $scope.patient.address = {};
                $scope.patient.age = {};
                $scope.patient.isUpdate = false;
                $scope.patient.sex = "Male";//set default value..
                $scope.patient.relation = "None";
                $scope.patient.bloodgroup = "None";
                $scope.patient.hasFullAccess = true;//If the Doctor/Hospital is creating patient, then he already has full access..
                $scope.patient.password = "";
                $scope.patient.parentId = "";
                $scope.patient.dependants = [];
                $scope.patient.status = "WaitingOTP";
                EditMode(true);
            } else {
                //Get Patient Details from server and populate patient object..
                GetUserProfile();
                EditMode(false);
            }
        }

        function EditMode(flag) {
            $scope.identifyingDetailsSectionUpdate = flag;
            $scope.historySectionUpdate = flag;
            $scope.allergiesSectionUpdate = flag;
        }

        function SavePatientProfile(section) {
            //Common settings for a patient
            $scope.patient.userType = "patient";
            $scope.patient.isDependant = ($scope.patient.relation == 'None') ? "false" : "true";
            $scope.patient.isUpdate = true;

            //Computed properties
            if ($scope.patient.age == undefined) {
                $scope.patient.age = {};
            }
            $scope.patient.age.year = $rootScope.getAge($scope.patient.dob);

            UpsertUser(section);
        }

        function SavePatientPeripheralDetails(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDetail: detailType == 'userHistory' ? $scope.patient.history : $scope.patient.alergy
            };
            $scope.myPromise = Patient.upsertPeripheralDetails(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function SavePhoto(section) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            UpsertUser(section);
        }

        function UpsertUser(section) {
            //Setup parameters.
            var params = {
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $scope.patient.patientId,
                userMap: $scope.patient
            };

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
                    //If all goes good, rebind the data..
                    $scope.patient = response.patient;
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetUserProfile() {
            $scope.myPromise = Patient.get({
                user: $stateParams.patientId,
                sessionId: account.sessionId,
                isDoctor: false,
                mobile: "",
                columnsToGet: "sex,modifiedBy,userType,patientId,parentId,hasFullAccess,dependants,bloodgroup,age,userId,midlleName,firstName,isUpdate,searchCol,lastName,status,relation,modifiedDate,creationDate,createdBy,landlineNumber,address,email,dob,isDependant,mobile,alternateMobileNumber"
            }, function (response) {
                $scope.patient = response;
                $scope.imageURL = $rootScope.getImageURL(account.baseURL, account.userId, account.sessionId, $scope.patient.patientId);
                //Once Profile is obtained..fetch history and allergies..
                GetHistory();
                GetAllergies();
            });
        }

        function GetHistory() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userHistory',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.history = response[response.length - 1];
            });
        }

        function GetAllergies() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userAllergy',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.alergy = response[response.length - 1];
            });
        }

        function OpenPrescriptions() {
            $state.go('PrescriptionIndex', {
                patientId: $stateParams.patientId
            });
        }

        function GetAllPrescriptionsAccess() {
            //Open Verify OTP pageÏ
            $state.go('PatientVerifyOTP', {patientId: $stateParams.patientId})
        }
    }
})();
