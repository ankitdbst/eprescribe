(function () {
    'use strict';

    angular.module('ERemediumWebApp.doctor.controllers')
            .controller('DoctorIndexCtrl', DoctorIndexCtrl);

    DoctorIndexCtrl.$inject = ['$scope', 'Doctor', '$state', '$rootScope', 'Account', '$stateParams', 'ngDialog'];

    function DoctorIndexCtrl($scope, Doctor, $state, $rootScope, Account, $stateParams, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        //Functions..
        $scope.upsertUser = UpsertUser;
        $scope.changePassword = ChangePassword;
        $scope.showSummarySection = ShowSummarySection;
        $scope.closeSummarySection = CloseSummarySection;
        $scope.showPasswordSection = ShowPasswordSection;
        $scope.closePasswordSection = ClosePasswordSection;

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Doctor Profile";

            EditMode(false);


            GetDoctorProfile();
        }


        /*---------------------------------*/
        /* Photo Handling Section */
        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.doctor.profileImageURL = uri;
                    UpsertUser("Photo");
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };
        /*---------------------------------*/

        function EditMode(flag) {
            $scope.passwordSectionUpdate = flag;
            $scope.summarySectionUpdate = flag;
            $scope.clinicSectionUpdate = flag;
            $scope.servicesSectionUpdate = flag;
            $scope.professionalDetailsSectionUpdate = flag;
        }

        function ShowSummarySection() {
            $scope.summarySectionUpdate = true;
        }

        function CloseSummarySection() {
            $scope.summarySectionUpdate = false;
        }

        function ShowPasswordSection() {
            $scope.passwordSectionUpdate = true;
        }

        function ClosePasswordSection() {
            $scope.passwordSectionUpdate = false;
        }

        function ChangePassword(section) {
            //Setup parameters.
            var params = {
                user: $scope.doctor.doctorId,
                newPassword: $scope.doctor.password
            };

            $scope.myPromise = Doctor.changePassword(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //If all goes good, then ask him to relogin
                    $state.go('login', {signIn: 'logOut'});
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function UpsertUser(section) {
            $scope.doctor.userType = "doctor";
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: "",
                patientId: "",
                userMap: $scope.doctor
            };

            $scope.myPromise = Doctor.saveProfile(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //If settings are updated, then ask him to relogin
                    if (section == "Settings") {
                        $state.go('login', {signIn: 'logOut'});
                    }
                    //If all else goes good, rebind the data..
                    $scope.doctor = response.doctor;
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetDoctorProfile() {
            //Get Doctor Profile Details and populate..
            $scope.myPromise = Doctor.getProfile({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: "sex,clinic,modifiedBy,settings,specializations,education,password,medicalregnumber,userType,patientId,parentId,userId,age,midlleName,experience,firstName,searchCol,aboutme,lastName,services,status,relation,modifiedDate,creationDate,briefsummary,doctorId,memberships,mobile"
            }, function (response) {
                $scope.doctor = response;
                if ($scope.doctor.settings == undefined) {
                    $scope.doctor.settings = {};
                }
                if ($scope.doctor.settings.canvasEnabled == undefined) {
                    $scope.doctor.settings.canvasEnabled = true;
                }
                if ($scope.doctor.settings.twoFactorAuthentication == undefined) {
                    $scope.doctor.settings.twoFactorAuthentication = false;
                }
            });
        }
    }
})();