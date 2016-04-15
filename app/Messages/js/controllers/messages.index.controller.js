(function () {
    'use strict';

    angular.module('ERemediumWebApp.messages.controllers')
            .controller('MessagesIndexCtrl', MessagesIndexCtrl);

    MessagesIndexCtrl.$inject = ['$scope', 'Messages', '$state', '$rootScope', 'Account', '$stateParams', 'Patient'];

    function MessagesIndexCtrl($scope, Messages, $state, $rootScope, Account, $stateParams, Patient) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        //Functions..
        $scope.sendSMS = SendSMS;
        $scope.focusSelectPatients = FocusSelectPatients;

        function Initialize() {
            $rootScope.pageHeader = "Messages";
            $scope.selectedChoice = "allPatients";
            $scope.patient = {};
            $scope.patient.selected = undefined;
        }

        $scope.patientList = Patient.query({
            user: $scope.account.userId,
            sessionId: $scope.account.sessionId,
            doctorId: $scope.account.userId,
            limit: "",
            columnsToGet: "firstName,midlleName,lastName,mobile"
        }, function (response) {
            $scope.patientList = response;
        }
        );

        $scope.myPromise = $scope.patientList.$promise;

        function FocusSelectPatients() {
            $scope.selectedChoice = "partialAll";
        }
        
        function createString(arr, key) {
            return arr.map(function (obj) {
                return obj[key];
            }).join(',');
        }
        
        function SendSMS() {
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                to: $scope.selectedChoice == 'partialAll' ? createString($scope.patient.selected, 'mobile') : '', 
                toType: $scope.selectedChoice,
                msg: $scope.smsText,
                channel: 'sms'
            };
            $scope.myPromise = Messages.sendSMS(params, function (response) {
                $scope.showAlert = true;
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in sending Message, Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-success";
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }
    }
})();