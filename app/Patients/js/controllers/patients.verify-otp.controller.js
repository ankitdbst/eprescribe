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
            GetUserProfile();
        }

        function GetUserProfile() {
            $scope.myPromise = Patient.get({
                user: $stateParams.patientId,
                sessionId: $scope.account.sessionId,
                isDoctor: false,
                mobile: "",
                columnsToGet: ""
            }, function (response) {
                $scope.patient = response;
                GenerateOTP();
            });
        }
        function GenerateOTP() {
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                otpType: $scope.patient.isNew ? 'all' : 'prescription',
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
                otpType: $scope.patient.isNew ? 'all' : 'prescription',
                patientId: $stateParams.patientId,
                doctorId: $scope.account.userId
            };
            $scope.myPromise = Patient.verifyOTP(params, function (response) {
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in verifying OTP, Please try again!";
                    $scope.showAlert = true;
                } else if (response.respCode == 1) {
                    postProcessing();
                    /* When successfully verified, this should be set at back end
                     patient.isNew = false;
                     patient.hasAllPrescriptionsAccess = true; */
                    /*
                     * If User is coming from Patient List page i.e. was trying to get patient access, then Navigate to Patient Profile Page
                     * Else If User is coming from Prescriptions List page i.e. was trying to see ALL prescriptions, then Navigate to Prescriptions List page with ALL prescriptions..
                     */
                    if ($rootScope.previousState.name == 'PatientsList') {
                        $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId}, {reload: true});
                    } else if ($rootScope.previousState.name == 'PrescriptionIndex.List') {
                        $state.go('PrescriptionIndex', {patientId: $stateParams.patientId}, {reload: true});
                    }
                } else {
                    $scope.alertMessage = response.response + ". Please enter correct OTP.";
                    $scope.showAlert = true;
                }
            });
        }

        function close() {
            postProcessing();
            //Doctor doesn't have patient access, go to Home Page!
            if ($scope.patient.isNew) {
                $state.go('PatientsList', null, {reload: true});
            } else {
                //Doctor already has access and was trying to get Prescriptions access..
                $state.go('PrescriptionIndex', {patientId: $stateParams.patientId}, {reload: true});
            }
        }

        function postProcessing() {
            //start showing menu items
            $('#verifyOTPModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
        }
    }
})();