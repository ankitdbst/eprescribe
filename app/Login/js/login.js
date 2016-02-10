(function () {
    'use strict';

    angular.module('ERemediumWebApp.login', ['ui.router', 'ngMessages', 'ERemediumWebApp.login.services'])
            .config(['$stateProvider', function ($stateProvider) {
                    $stateProvider
                            .state('login', {
                                url: '/login/:signIn',
                                templateUrl: 'Login/partials/login.html',
                                controller: 'LoginCtrl'
                            });
                }])
            .controller('LoginCtrl', LoginCtrl);

    angular.module('ERemediumWebApp.login.services', []);

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'Account', '$stateParams'];

    function LoginCtrl($scope, $rootScope, $state, Account, $stateParams) {

        initialize();

        //Assign Functions..
        $scope.signIn = signIn;
        $scope.toggleModal = toggleModal;

        toggleModal($stateParams.signIn);

        function signIn() {
            $scope.data = {};

            var params = {
                mobile: $scope.mobileNumber,
                password: $scope.password,
                deviceKey: ""
            };
            //validate using username and password
            $scope.myPromise = Account.login(params, loginHandler);

            function loginHandler(response) {
                $scope.data = response;
                if (angular.isUndefined($scope.data) || $scope.data.respCode == 0)
                {
                    $scope.showAlert = true;
                    $scope.alertMessage = "Invalid Credentials, Please try again!";
                } else
                {
                    postLoginProcessing();
                    //Navigate to First Page in menu
                    $state.go('PatientsList');
                }
            }
        }

        function postLoginProcessing() {
            //start showing menu items
            $rootScope.showMenu = true;
            $('#loginModal').modal('hide');
            $('#registerModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('body').removeClass('modal-open');
            $('#wrapper').removeClass('hero-unit');
            getPendingTasks();
            getPendingMessages();
        }

        function getPendingMessages() {
            $scope.messagesList = new Array();
            $rootScope.pendingMessagesCount = $scope.messagesList.length;
            //Get it from Backend!
            //      $scope.myPromise = Message.query({
            //            user: "",
            //            sessionId: "433781068949947", //$rootScope.sessionId,
            //            doctorId: "101", //$rootScope.userId,
            //            limit: 50,
            //            columnsToGet: ""
            //        }, function (response) {
            //        }
            //        );
        }

        function getPendingTasks() {
            $scope.taskList = new Array();
            $rootScope.pendingTasksCount = $scope.taskList.length;
            //Get it from Backend!
            //      $scope.myPromise = Task.query({
            //            user: "",
            //            sessionId: "433781068949947", //$rootScope.sessionId,
            //            doctorId: "101", //$rootScope.userId,
            //            limit: 50,
            //            columnsToGet: ""
            //        }, function (response) {
            //        }
            //        );
        }

        function initialize() {
            $scope.showAlert = false;
            $rootScope.showMenu = false;
            $rootScope.pageHeader = "";
            $scope.mobileNumber = 7838352425;
            $scope.password = "123@ivp";
        }

        function toggleModal(signIn) {
            //Open respective model!
            if (signIn == "true") {
                $('#loginModal').modal('show');
                $('#registerModal').modal('hide');
            } else {
                $('#registerModal').modal('show');
                $('#loginModal').modal('hide');
            }
        }
    }
})();