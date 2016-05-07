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

        //If Flag for logout is true...then logout..
        if ($stateParams.signIn == "logOut") {
            Account.logout();
        } else {
            //Now check if cookies are present, if yes then directly move forward instead of asking for login again!
            checkIfAlreadyLoggedIn();
        }

        //If no cookie is present then ask for login..
        Initialize();

        //Assign Functions..
        $scope.signIn = signIn;
        $scope.toggleModal = toggleModal;

        function checkIfAlreadyLoggedIn() {
            if (Account.isAuthenticated()) {
                var account = Account.getAuthenticatedAccount();
                postSuccessfulLoginProcessing(account.loggedInUser.ImageURL);
                return;
            }
        }

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
                    //Fetch Doctor Profile here 
                    GetDoctorProfile(response);
                    postSuccessfulLoginProcessing();
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
                userId: account.userId,
                doctorId: "",
                mobile: "",
                columnsToGet: "settings,userType,userId,firstName,midlleName,lastName,mobile,clinic"
            }, function (response) {
                account.loggedInUser = response;
                //Set Image URL of Logged in user..
                account.loggedInUser.ImageURL = $rootScope.getImageURL(account.baseURL, account.userId, account.sessionId, account.userId);
                //Now store Doctor Profile in cookie..
                Account.setAuthenticatedAccount(account, GetCookieExpiryTime());
                setImageURLInRootScope(account.loggedInUser.ImageURL);
            });
        }

        function setImageURLInRootScope(url) {
            //Store Image in RootScope so that it can be accessed at index.html and we can show profile pic at top right!
            $rootScope.loggedInUserImageURL = url;
        }

        function postSuccessfulLoginProcessing(url) {
            setImageURLInRootScope(url);
            //start showing menu items
            $rootScope.showMenu = true;
            $('#loginModal').modal('hide');
            $('#registerModal').modal('hide');
            $('body').removeClass('modal-open');
            $('.modal-backdrop').remove();
            $('#wrapper').removeClass('hero-unit');
            getPendingTasks();
            getPendingMessages();
            //Navigate to First Page in menu
            $state.go('PatientsList');
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
            //decide which popup to show either Login OR Register..
            toggleModal($stateParams.signIn);
        }

        function toggleModal(signIn) {
            //when asking for Login Modal to show OR logout flag is true..
            if (signIn == "true" || signIn == "logOut") {
                $('#loginModal').modal('show');
                $('#registerModal').modal('hide');
            } else {
                $('#registerModal').modal('show');
                $('#loginModal').modal('hide');
            }
        }
    }
})();