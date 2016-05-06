(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsVerifyOTPCtrl', PatientsVerifyOTPCtrl);

    PatientsVerifyOTPCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', '$stateParams'];

    function PatientsVerifyOTPCtrl($scope, Patient, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        Initialize();

        //Functions..
        $scope.verifyOTP = verifyOTP;
        $scope.close = close;
        $scope.generateOTP = GenerateOTP;

        function Initialize() {
            $rootScope.pageHeader = "";
            $('#verifyOTPModal').modal('show');
            GenerateOTP();
        }

        function GenerateOTP() {
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                otpType: 'all',
                toType: 'patient',
                toId: $stateParams.patientId,
                channel: 'sms'
            };
            $scope.myPromise = Patient.generateOTP(params, function (response) {
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in generating OTP, Please refresh the page!";
                    $scope.showAlert = true;
                } else if (response.respCode == 1) {
                    //Well
                    $scope.showAlert = false;
                    $scope.alertMessage = response.response + " with Reference Number: " + response.refNumber + ". Please enter received OTP to proceed."
                } else {
                    $scope.alertMessage = response.response;
                    $scope.showAlert = true;
                }
            });
        }

        function verifyOTP() {
            //Make a service call, if successfull navigate to patient profile else remain on same page..
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                otp: $scope.otp,
                otpType: 'all',
                patientId: $stateParams.patientId,
                doctorId: $scope.account.userId
            };
            $scope.myPromise = Patient.verifyOTP(params, function (response) {
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in verifying OTP, Please try again!";
                    $scope.showAlert = true;
                } else if (response.respCode == 1) {
                    postProcessing();
                    $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId}, {reload: true});
                } else {
                    $scope.alertMessage = response.response + ". Please enter correct OTP.";
                    $scope.showAlert = true;
                }
            });
        }

        function close() {
            postProcessing();
            $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId}, {reload: true});
        }

        function postProcessing() {
            //start showing menu items
            $('#verifyOTPModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    }
})();