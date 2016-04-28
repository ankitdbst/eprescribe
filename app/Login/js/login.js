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

    LoginCtrl.$inject = ['$scope', '$rootScope', '$state', 'Account', '$stateParams', 'Patient'];

    function LoginCtrl($scope, $rootScope, $state, Account, $stateParams, Patient) {

        Initialize();

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
                    //Fetch Doctor Profile here and store in Cookie..
                    GetDoctorProfile(response);

                    postLoginProcessing();
                    //Navigate to First Page in menu
                    $state.go('PatientsList');
                }
            }
        }

        function GetCookieExpiryTime() {
            // Find tomorrow's date.
            var expireDate = new Date();
            if ($scope.rememberMe) {
                expireDate.setDate(expireDate.getDate() + 7);//Expires in 7 days..
            } else {
                expireDate.setDate(expireDate.getDate() + 2);//Expires in 7 days..
            }
            return expireDate;
        }

        function GetDoctorProfile(account) {
            $scope.myPromise = Patient.get({
                user: account.userId,
                sessionId: account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: "settings,userType,userId,firstName,midlleName,lastName,mobile,"
            }, function (response) {
                account.loggedInUser = response;
                Account.setAuthenticatedAccount(account, GetCookieExpiryTime());
            });
        }

        function postLoginProcessing() {
            //start showing menu items
            $rootScope.showMenu = true;
            $('#loginModal').modal('hide');
            $('#registerModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
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

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.showMenu = false;
            $rootScope.pageHeader = "";
            $scope.rememberMe = true;
            //TODO REMOVE!!
            $scope.mobileNumber = 7838352425;
            $scope.password = "123@ivp";
            //necessary to remove any existing cookies..
            Account.logout();
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