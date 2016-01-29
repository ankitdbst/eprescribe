(function () {
    'use strict';

    angular.module('ERemediumWebApp.login', ['ui.router', 'ngMessages', 'ERemediumWebApp.login.services'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('login', {
                                url: '/login',
                                templateUrl: 'Login/partials/login.html',
                                controller: 'LoginCtrl'
                            });
                }])
            .controller('LoginCtrl', LoginCtrl);

    angular.module('ERemediumWebApp.login.services', []);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'Login', '$stateParams'];

    function LoginCtrl($scope, $rootScope, $state, Login, $stateParams) {
        $rootScope.showMenu = false;
        $rootScope.pageHeader = "";

        $scope.signIn = SignIn;
        $scope.showAlert = false;

        function SignIn() {
            $scope.data = {};
            //validate using username and password
            $scope.myPromise = Login.validateCredentials({
                mobile: $scope.mobileNumber,// 7838352425
                password: $scope.password, //123@ivp
                deviceKey: "" //empty
            }, function (response) {
                $scope.data = response;
                if (angular.isUndefined($scope.data) || $scope.data.respCode == 0)
                {
                    $scope.showAlert = true;
                    $scope.alertMessage = "Invalid Credentials, Please try again!";
                } else
                {
                    //Store sessionid etc in rootscope as its needed across pages!
                    $rootScope.sessionId = $scope.data.sessionId;
                    $rootScope.userId = $scope.data.userId;
                    $rootScope.userType = $scope.data.userType;
                    
                    //start showing menu items 
                    $rootScope.showMenu = true;

                    //Navigate to First Page in menu
                    $state.go('PatientsList');
                }
            });
        }
    }
})();