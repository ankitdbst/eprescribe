(function () {
    'use strict';

    angular.module('ERemediumWebApp.login', ['ui.router', 'ngMessages'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('login', {
                                url: '/login',
                                templateUrl: 'Login/partials/login.html',
                                controller: 'LoginCtrl'
                            });
                }])
            .controller('LoginCtrl', LoginCtrl);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state'];

    function LoginCtrl($scope, $rootScope, $state) {
        $rootScope.showMenu = false;
        
        $scope.signIn = SignIn;

        function SignIn() {
            //validate using username and password
            alert('You are awesome! Signing In...');
            
            //start showing menu items 
            $rootScope.showMenu = true;
            
            //Navigate to First Page in menu
            $state.go('PatientsList');
        }
    }

})();