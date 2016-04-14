(function () {
    'use strict';

    angular.module('ERemediumWebApp.messages.controllers')
            .controller('MessagesIndexCtrl', MessagesIndexCtrl);

    MessagesIndexCtrl.$inject = ['$scope', 'Messages', '$state', '$rootScope', 'Account', '$stateParams'];

    function MessagesIndexCtrl($scope, Messages, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        //Functions..
        $scope.sendSMS = SendSMS;

        function Initialize() {
            $rootScope.pageHeader = "Messages";
        }

        function SendSMS() {
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                to: '9910430979', //todo
                toType: 'partialAll',
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