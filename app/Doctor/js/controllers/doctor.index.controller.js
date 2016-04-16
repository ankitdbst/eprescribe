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
        $scope.saveDoctorProfile = SaveDoctorProfile;

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Doctor Profile";
            GetDoctorProfile();
        }

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

        function SaveDoctorProfile(section) {
            $scope.doctor.userType = "doctor";
            UpsertUser(section);
        }

        function UpsertUser(section) {
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
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
                    //If all goes good, rebind the data..
                    $scope.doctor = response.doctor;
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
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
            });
        }
    }
})();