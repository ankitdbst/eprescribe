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

        function SignIn() {
            //validate using username and password
            alert('You are awesome! Signing In...');

            var data = Login.validateCredentials({
                mobile: $scope.mobileNumber,
                password: $scope.password,
                deviceKey: ""
            });

            if (angular.isUndefined(data) || data.respCode == 0)
            {
                alert('Invalid Username/Passwrod, Please try again.');
            } else
            {
                
                alert(data);
                alert(data.respCode);
                //start showing menu items 
                $rootScope.showMenu = true;


                //Navigate to First Page in menu
                $state.go('PatientsList');
            }
        }
    }

})();