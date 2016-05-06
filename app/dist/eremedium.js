(function () {
'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
    'ngDialog',
    'ngCookies',
    'ngTouch',
    'cgBusy',
    'flow',
    'ncy-angular-breadcrumb',
    'angularResizable',
    'ui.select',
    'ui.calendar',
    'ngSanitize',
    'frapontillo.bootstrap-switch',
    'ERemediumWebApp.config',
    'ERemediumWebApp.routes',
    'ERemediumWebApp.patients',
    'ERemediumWebApp.reportinganalytics',
    'ERemediumWebApp.doctor',
    'ERemediumWebApp.login',
    'ERemediumWebApp.prescriptions',
    'ERemediumWebApp.tasks',
    'ERemediumWebApp.utils',
    'ERemediumWebApp.pharmacy',
    'ERemediumWebApp.messages',
    'ERemediumWebApp.labs',
    'ERemediumWebApp.appointments'
])

        .run(function ($rootScope, $location, $state) {
            $rootScope.getFullName = function (inputPatientObject) {
                if (angular.isUndefined(inputPatientObject)) {
                    return;
                }
                if (inputPatientObject.midlleName == undefined) {
                    inputPatientObject.midlleName = "";
                }
                return inputPatientObject.firstName + " " + inputPatientObject.midlleName + " " + inputPatientObject.lastName;
            };

            $rootScope.getFullAddress = function (inputPatientObject) {
                if (angular.isUndefined(inputPatientObject)) {
                    return;
                }
                return inputPatientObject.address.addressLine1 + ', ' + inputPatientObject.address.addressLine2 + ', ' + inputPatientObject.address.city + ', ' + inputPatientObject.address.state + ', ' + inputPatientObject.address.pincode;
            };

            $rootScope.getAge = function (dateString) {
                var today = new Date();
                var birthDate = new Date(dateString);
                var age = today.getFullYear() - birthDate.getFullYear();
                var m = today.getMonth() - birthDate.getMonth();
                if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                    age--;
                }
                return age;
            }

            $rootScope.go = function (path) {
                $location.path(path);
            };

            $rootScope.getImageURL = function(baseURL, loggedInUserId, sessionId, userId) {
                var inputParams = { user: loggedInUserId, sessionId: sessionId, imgIdOfUser: userId };
                return baseURL + "userservice/GetImage?" + $.param(inputParams);
            }

              /*
               For Auto Load a Nested View. Read More
               http://stackoverflow.com/questions/26196906/ui-router-how-to-automatically-load-a-nested-view-within-the-parent-view-as-a-de
               */
              $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
                //save the previous state in a rootScope variable so that it's accessible from everywhere
                $rootScope.previousState = fromState;
                var aac;
                if (aac = toState && toState.params && toState.params.autoActivateChild) {
                  $state.go(aac);
                }
              });
        });

//For correctly applying Active Class on Side Menu
$(".sidebar-nav a").on("click", function () {
    $(".sidebar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});

angular.element(document).ready(function ($) {
    $(window).scroll(function () {
        if ($(this).scrollTop() >= 50) {        // If page is scrolled more than 50px
            $('#return-to-top').fadeIn(200);    // Fade in the arrow
        } else {
            $('#return-to-top').fadeOut(200);   // Else fade out the arrow
        }
    });

    $('#return-to-top').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });

    $('#menu-toggle-2').click(function () {      // When arrow is clicked
        $('body,html').animate({
            scrollTop: 0                       // Scroll to top of body
        }, 500);
    });
});

angular.module('ERemediumWebApp.config', []);
angular.module('ERemediumWebApp.routes', []);
}) ();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.config')

            .config([
                '$httpProvider',
                function ($httpProvider) {
                    function transformRequest(data) {
                        if (angular.isUndefined(data)) {
                            return data;
                        }

                        angular.forEach(data, function (value, key) {
                            if (key.startsWith('$') || key === '_id') { // Backend service fails if we have these params in the request
                                delete data[key];
                                console.log(key);
                            }
                            if (!angular.isUndefined(value) && (value["$cgBusyFulfilled"])) {
                                delete value["$cgBusyFulfilled"];
                            }
                            if (!angular.isUndefined(value) && value["_id"]) {
                                delete value["_id"];
                            }
                        });
                        return data;
                    }

                    $httpProvider.defaults.transformRequest.unshift(transformRequest);
                    //Enable cross domain calls
                    $httpProvider.defaults.useXDomain = true;

                    //Remove the header used to identify ajax call  that would prevent CORS from working
                    delete $httpProvider.defaults.headers.common['X-Requested-With'];
                }
            ])
            .config([
                '$compileProvider',
                function ($compileProvider) {
                    $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|ftp|mailto|javascript|chrome-extension):|data:application\//); 
                }
            ]);
})();

(function() {
  'use strict';

  angular.module('ERemediumWebApp.appointments', [
    'ERemediumWebApp.appointments.routes',
    'ERemediumWebApp.appointments.controllers',
    'ERemediumWebApp.appointments.services',
  ]);

  angular.module('ERemediumWebApp.appointments.routes', ['ui.router']);
  angular.module('ERemediumWebApp.appointments.controllers', []);
  angular.module('ERemediumWebApp.appointments.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.doctor', [
        'ERemediumWebApp.doctor.routes',
        'ERemediumWebApp.doctor.controllers',
        'ERemediumWebApp.doctor.services',
    ]);

    angular.module('ERemediumWebApp.doctor.routes', ['ui.router']);
    angular.module('ERemediumWebApp.doctor.controllers', []);
    angular.module('ERemediumWebApp.doctor.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.labs', [
        'ERemediumWebApp.labs.routes',
        'ERemediumWebApp.labs.controllers',
        'ERemediumWebApp.labs.services',
    ]);

    angular.module('ERemediumWebApp.labs.routes', ['ui.router']);
    angular.module('ERemediumWebApp.labs.controllers', []);
    angular.module('ERemediumWebApp.labs.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.messages', [
        'ERemediumWebApp.messages.routes',
        'ERemediumWebApp.messages.controllers',
        'ERemediumWebApp.messages.services',
    ]);

    angular.module('ERemediumWebApp.messages.routes', ['ui.router']);
    angular.module('ERemediumWebApp.messages.controllers', []);
    angular.module('ERemediumWebApp.messages.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.patients', [
        'ERemediumWebApp.patients.routes',
        'ERemediumWebApp.patients.controllers',
        'ERemediumWebApp.patients.services',
    ]);

    angular.module('ERemediumWebApp.patients.routes', ['ui.router']);
    angular.module('ERemediumWebApp.patients.controllers', []);
    angular.module('ERemediumWebApp.patients.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.pharmacy', [
        'ERemediumWebApp.pharmacy.routes',
        'ERemediumWebApp.pharmacy.controllers',
        'ERemediumWebApp.pharmacy.services',
    ]);

    angular.module('ERemediumWebApp.pharmacy.routes', ['ui.router']);
    angular.module('ERemediumWebApp.pharmacy.controllers', []);
    angular.module('ERemediumWebApp.pharmacy.services', []);
})();

(function() {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions', [
    'ERemediumWebApp.prescriptions.routes',
    'ERemediumWebApp.prescriptions.controllers',
    'ERemediumWebApp.prescriptions.services',
    'ERemediumWebApp.prescriptions.directives',
  ]);

  angular.module('ERemediumWebApp.prescriptions.routes', ['ui.router']);
  angular.module('ERemediumWebApp.prescriptions.controllers', []);
  angular.module('ERemediumWebApp.prescriptions.services', []);
  angular.module('ERemediumWebApp.prescriptions.directives', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.reportinganalytics', [
        'ERemediumWebApp.reportinganalytics.routes',
        'ERemediumWebApp.reportinganalytics.controllers',
        'ERemediumWebApp.reportinganalytics.services',
    ]);

    angular.module('ERemediumWebApp.reportinganalytics.routes', ['ui.router']);
    angular.module('ERemediumWebApp.reportinganalytics.controllers', []);
    angular.module('ERemediumWebApp.reportinganalytics.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.tasks', [
        'ERemediumWebApp.tasks.routes',
        'ERemediumWebApp.tasks.controllers',
        'ERemediumWebApp.tasks.services',
    ]);

    angular.module('ERemediumWebApp.tasks.routes', ['ui.router']);
    angular.module('ERemediumWebApp.tasks.controllers', []);
    angular.module('ERemediumWebApp.tasks.services', []);
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.utils', [
        'ERemediumWebApp.utils.directives',
        'ERemediumWebApp.utils.filters'
    ]);

    angular.module('ERemediumWebApp.utils.directives', []);
    angular.module('ERemediumWebApp.utils.filters', []);
})();
(function () {
    'use strict'
    angular.module('ERemediumWebApp.appointments.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Appointments', {
                                url: '/book-appointment',
                                templateUrl: 'Appointments/partials/appointments.index.html',
                                controller: 'AppointmentsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Appointments',
                                  parent: 'PatientsList'
                                }
                            })
                            .state('PatientAppointments', {
                                url: '/book-appointment/:patientId',
                                templateUrl: 'Appointments/partials/appointments.index.html',
                                controller: 'AppointmentsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Appointments',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
(function () {
    'use strict'
    angular.module('ERemediumWebApp.doctor.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Doctor', {
                                url: '/doctor',
                                templateUrl: 'Doctor/partials/doctor.index.html',
                                controller: 'DoctorIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Doctor Profile',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();

(function () {
    'use strict'
    angular.module('ERemediumWebApp.labs.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Labs', {
                                url: '/labs',
                                templateUrl: 'Labs/partials/labs.index.html',
                                controller: 'LabsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Labs & Imaging',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();

(function () {
    'use strict'
    angular.module('ERemediumWebApp.messages.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Messages', {
                                url: '/messages',
                                templateUrl: 'Messages/partials/messages.index.html',
                                controller: 'MessagesIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Messages',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();

(function () {
    'use strict'
    angular.module('ERemediumWebApp.patients.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('PatientsList', {
                                url: '/patients',
                                templateUrl: 'Patients/partials/patients.list.html',
                                controller: 'PatientsListCtrl',
                                ncyBreadcrumb: {
                                  label: 'Home'
                                }
                            })
                            .state('PatientVerifyOTP', {
                                url: '/patients/verifyotp/:patientId',
                                templateUrl: 'Patients/partials/patients.verify-otp.html',
                                controller: 'PatientsVerifyOTPCtrl'
                            })
                            .state('PatientNewOrEdit', {
                                url: '/patients/edit/:patientId',
                                views: {
                                    '': {
                                        templateUrl: 'Patients/partials/patients.edit.html',
                                        controller: 'PatientNewOrEditCtrl'
                                    },
                                    'vitals@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.vitals.html',
                                        controller: 'PatientsVitalsCtrl'
                                    },
                                    'clinicalNotes@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.clinical-notes.html',
                                        controller: 'PatientsClinicalNotesCtrl'
                                    },
                                    'documents@PatientNewOrEdit': {
                                        templateUrl: 'Patients/partials/patients.documents.html',
                                        controller: 'PatientsDocumentsCtrl'
                                    }
                                },
                                ncyBreadcrumb: {
                                  label: 'Patient Profile',
                                  parent: 'PatientsList'
                                }
                            });
                }
            ]);
})();

(function () {
    'use strict'
    angular.module('ERemediumWebApp.pharmacy.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('Pharmacy', {
                                url: '/pharmacy',
                                templateUrl: 'Pharmacy/partials/pharmacy.index.html',
                                controller: 'PharmacyIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Pharmacy',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();

(function() {
  'use strict'

  angular.module('ERemediumWebApp.prescriptions.routes')

  .config([
    '$stateProvider',

    function($stateProvider) {
      $stateProvider

      .state('PrescriptionIndex', {
        url: '/patients/:patientId/prescriptions',
        templateUrl: 'Prescriptions/partials/prescriptions.index.html',
        controller: 'PrescriptionIndexCtrl',
        params: {
            autoActivateChild: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionIndex.List', {
        templateUrl: 'Prescriptions/partials/prescriptions.list.html',
        controller: 'PrescriptionListCtrl',
        ncyBreadcrumb: {
          label: 'Prescriptions',
          parent: 'PatientNewOrEdit'
        }
      })
      .state('PrescriptionIndex.Detail', {
        url: '/{prescriptionId:[0-9]*}',
        templateUrl: 'Prescriptions/partials/prescriptions.detail.html',
        controller: 'PrescriptionDetailCtrl',
        ncyBreadcrumb: {
          label: 'View',
          parent: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionNewOrEdit', {
        url: '/patients/:patientId/prescriptions/new',
        templateUrl: 'Prescriptions/partials/prescriptions.edit.html',
        controller: 'PrescriptionNewOrEditCtrl',
        params: {
          prescriptionId: null
        },
        ncyBreadcrumb: {
          label: 'New',
          parent: 'PrescriptionIndex.List'
        }
      })
      .state('PrescriptionAddMedicines', {
        url: '/patients/:patientId/prescriptions/new/medicines',
        templateUrl: 'Prescriptions/partials/prescriptions.edit-medicines.html',
        params: {
          prescription: null
        },
        controller: 'PrescriptionEditMedicinesCtrl',
        ncyBreadcrumb: {
          label: 'Add Medicines',
          parent: 'PrescriptionNewOrEdit'
        }
      })
      .state('PrescriptionOrder', {
        url: '/patients/:patientId/prescriptions/order/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order.html',
        controller: 'PrescriptionOrderCtrl',
        ncyBreadcrumb: {
          label: 'Place Order',
          parent: 'PatientNewOrEdit'
        }
      })
      .state('PrescriptionOrder.PatientNewOrEditAddress', {
        url: '/new-address',
        templateUrl: 'Patients/partials/patients.edit-address.html',
        controller: 'PatientNewOrEditAddressCtrl'
      })
      .state('PrescriptionOrderStatus', {
        url: '/patients/:patientId/prescriptions/order/status/:prescriptionId',
        templateUrl: 'Prescriptions/partials/prescriptions.order-status.html',
        controller: 'PrescriptionOrderStatusCtrl',
        ncyBreadcrumb: {
          label: 'Order Status',
          parent: 'PatientNewOrEdit'
        }
      });
    }
  ]);
}) ();

(function () {
    'use strict'
    angular.module('ERemediumWebApp.reportinganalytics.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('ReportingAnalytics', {
                                url: '/reportinganalytics',
                                templateUrl: 'ReportingAnalytics/partials/reportinganalytics.index.html',
                                controller: 'ReportingAnalyticsIndexCtrl',
                                ncyBreadcrumb: {
                                  label: 'Reporting & Analytics',
                                  parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();

(function () {
    'use strict'

    angular.module('ERemediumWebApp.tasks.routes')

            .config([
                '$stateProvider',
                function ($stateProvider) {
                    $stateProvider
                            .state('TasksList', {
                                url: '/tasks',
                                templateUrl: 'Tasks/partials/tasks.list.html',
                                controller: 'TasksListCtrl',
                                ncyBreadcrumb: {
                                    label: 'Tasks',
                                    parent: 'PatientsList'
                                }
                            })
                }
            ]);
})();
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
(function () {
    'use strict';
    angular.module('ERemediumWebApp.login.services')

            .factory('Login', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        validateCredentials: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/ValidateCredentials'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }])

            .factory('Account', ['Login', '$cookies', '$rootScope', function (Login, $cookies, $rootScope) {

                    function login(params, loginHandler) {
                        return Login.validateCredentials(params).$promise.then(function (response) {
                            if (response.respCode == 1) {
                                delete response['response'];
                                delete response['respCode'];
                                var account = angular.forEach(response, function (value, key) {
                                    if (key.startsWith('$')) { // Backend service fails if we have these params in the request
                                        delete response[key];
                                    }
                                });
                                //Store once in cookies..and use everywhere..
                                account.baseURL = "http://52.76.165.4/ERService/"
                                setAuthenticatedAccount(account);
                            }
                            if (angular.isDefined(loginHandler)) {
                                loginHandler(response);
                            }
                        });
                    }

                    function getAuthenticatedAccount() {
                        setBaseConfiguration();
                        return $cookies.getObject('eremediumaccount');
                    }

                    function setBaseConfiguration() {
                        //This is needed when user tries to refresh and is already authenticated!
                        $rootScope.showMenu = true;
                        $('#wrapper').removeClass('hero-unit');
                    }

                    function isAuthenticated() {
                        return !!$cookies.get('eremediumaccount');
                    }

                    function setAuthenticatedAccount(account, expireDate) {
                        $cookies.putObject('eremediumaccount', account, {'expires': expireDate});
                    }

                    function logout() {
                        $cookies.remove('eremediumaccount');
                    }

                    return {
                        'login': login,
                        'logout': logout,
                        'getAuthenticatedAccount': getAuthenticatedAccount,
                        'setAuthenticatedAccount': setAuthenticatedAccount,
                        'isAuthenticated': isAuthenticated
                    };
                }]);
})();
$("#menu-toggle").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled");
    });
     $("#menu-toggle-2").click(function(e) {
        e.preventDefault();
        $("#wrapper").toggleClass("toggled-2");
        $('#menu ul').hide();
    });
 
     function initMenu() {
      $('#menu ul').hide();
      $('#menu ul').children('.current').parent().show();
      //$('#menu ul:first').show();
      $('#menu li a').click(
        function() {
          var checkElement = $(this).next();
          if((checkElement.is('ul')) && (checkElement.is(':visible'))) {
            return false;
            }
          if((checkElement.is('ul')) && (!checkElement.is(':visible'))) {
            $('#menu ul:visible').slideUp('normal');
            checkElement.slideDown('normal');
            return false;
            }
          }
        );
      }
    $(document).ready(function() {initMenu();});
(function () {
    'use strict';

    angular.module('ERemediumWebApp.appointments.controllers')
            .controller('AppointmentsIndexCtrl', AppointmentsIndexCtrl);

    AppointmentsIndexCtrl.$inject = ['$scope', 'Appointments', '$state', '$rootScope', 'Account', '$stateParams','ngDialog','uiCalendarConfig'];

    function AppointmentsIndexCtrl($scope, Appointments, $state, $rootScope, Account, $stateParams, ngDialog, uiCalendarConfig) {
        if (!Account.isAuthenticated()) {
            $state.go('Appointments', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();
        $scope.patientId = $stateParams.patientId;
        //Initialize
        initialize();
        $scope.intervals = [
            "15 minutes",
            "30 minutes",
            "45 minutes"
        ];
        $scope.fillAppointment = function(date, jsEvent, view) {
            // alert("alert event on click");
            //Show a dialog to create a new Event
            // uiCalendarConfig.calendars['myCalendar'].fullCalendar('refetchEvents');
            if(view.name == "agendaDay") {
                // var dateFrom = moment(date).format('YYYY-MM-DD');
                $scope.date = date;
                $scope.originalDate = date;
                $scope.dateFrom = date.format();
                $scope.startTime = date.format('hh:mm T')+'M';
                //var dateTo = date.add(5*60*1000).format();
                // $scope.eventSources[0].events.push({
                //         title: 'FCB-786',
                //         start: dateFrom,
                //         end: dateTo,
                //         stick: true
                //       });
            //     uiCalendarConfig.calendars.myCalendar.fullCalendar('renderEvent', {
            //     title: 'FCB-333',
            //     start: '2016-05-01T05:30:00',
            //     end: '2016-05-01T07:30:00',
            //     stick: true
            // });
            // $scope.eventSources[0].events.push({
            //             title: 'FCB-555',
            //             start: '2016-05-01T08:30:00',
            //             end: '2016-05-01T09:30:00',
            //             stick: true
            //           });
                //Show a dialog to create a new Event
                
                var templateNameDialog = ngDialog.open({
                    template: 'Appointments/partials/appointments.appointment-details-dialog.html',
                    className: 'ngdialog-theme-default',
                    scope: $scope,
                    showClose: true,
                    closeByEscape: false,
                    controller: function($scope, $stateParams, Appointments, Account) {
                      // $scope.prescription = $scope.parent.prescription;
                      var user = Account.getAuthenticatedAccount();
                      $scope.selectStopTime = function(item) {
                        console.log(item);
                        if(item == "15 minutes") {
                            $scope.dateTo = $scope.originalDate.add(15*60*1000).format();
                        }
                        else if(item == "30 minutes") {
                            $scope.dateTo = date.add(30*60*1000).format();
                        }
                        else if(item == "45 minutes") {
                            $scope.dateTo = date.add(45*60*1000).format();
                        }
                        else {
                            $scope.dateTo = date.add(15*60*1000).format();
                        }
                      }
                      $scope.saveAppointment = function() {
                        $scope.eventSources[0].events.push({
                        title: $scope.patient.firstName+' '+$scope.patient.lastName,
                        start: $scope.dateFrom,
                        end: $scope.dateTo,
                        stick: true
                      });
                        //closeDialog
                        ngDialog.close();
                      }
                      // $scope.eventSources[0].events.push({
                      //   title: 'FCB-5555',
                      //   start: '2016-05-01T09:30:00',
                      //   end: '2016-05-01T10:30:00',
                      //   stick: true
                      // });
                      // $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;
                      // Prescription.getTemplateById({sessionId: user.sessionId,doctorId: '101',templateId:'7575027259136053',columnsToGet:''},function(response){console.log(response);});
                     
                      // $scope.myPromise = Prescription.upsert(params, function (response) {
                      //   if (_.isEqual(response.respCode, 1)) {
                      //     $scope.closeThisDialog({
                      //       state: 'saved',
                      //       data: response.pid
                      //     });
                      //     $state.go('PrescriptionIndex.Detail', {
                      //       prescriptionId: response.pid,
                      //       patientId: $stateParams.patientId
                      //     });
                      //   } else {
                      //     // Show Error
                      //     console.log(response);
                      //     }
                      //   });
                      }
                });
                
            }
        };
        $scope.alertOnDrop = function() {
            alert("alert on drop");
            console.log("alert on drop");
        };
        $scope.alertOnResize = function() {
            alert("alert on resize");
        };
        $scope.eventOnClick = function(event) {
            //alert("evemt clicked");
        };
        $scope.eventSources = [
                                {
                                    events: [
                                        {
                                            title: 'Event1',
                                            start: '2016-04-04'
                                        },
                                        {
                                            title: 'Event2',
                                            start: '2016-04-23'
                                        },
                                        {
                                            title: 'Event33',
                                            start: '2016-04-30T03:30:00',
                                            end: '2016-04-30T04:30:00'
                                        }
                                        // etc...
                                    ],
                                    color: 'yellow',   // an option!
                                    textColor: 'black' // an option!
                                }
                            ];
        // $scope.eventSources[0].events.push({
        //                 title: 'FCB-1',
        //                 start: '2016-05-01T00:00:00',
        //                 end: '2016-05-01T01:30:00'
        //               });

        /* config object */
        $scope.uiConfig = {
          calendar:{
            defaultView: 'agendaDay',
            height: "100%",
            slotDuration: '00:15:00',
            defaultTimedEventDuration: '00:15:00',
            nowIndicator: true,
            eventDurationEditable: false,
            editable: true,
            header:{
              left: 'month agendaWeek agendaDay',
              center: 'title',
              right: 'today prev,next'
            },
            dayClick: $scope.fillAppointment,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize,
            eventClick: $scope.eventOnClick
          }
        };

        function initialize() {
            $rootScope.pageHeader = "Appointments";
            GetUserProfile();
            GetDoctorProfile();
        }

        function GetUserProfile() {
            if($stateParams.patientId !== undefined) {
                $scope.myPromise = Appointments.get({
                    user: $stateParams.patientId,
                    sessionId: $scope.account.sessionId,
                    isDoctor: false,
                    mobile: "",
                    columnsToGet: ""
                }, function (response) {
                    $scope.patient = response;
                });
            }
        }

        function GetDoctorProfile() {
            //Get Doctor Profile Details and populate..
            $scope.myPromise = Appointments.getProfile({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: ""
            }, function (response) {
                $scope.doctor = response;
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.appointments.services')

            .factory('Appointments', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        },
                        get: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        getProfile: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.doctor.controllers')
            .controller('DoctorIndexCtrl', DoctorIndexCtrl);

    DoctorIndexCtrl.$inject = ['$scope', 'Doctor', '$state', '$rootScope', 'Account', '$stateParams', 'ngDialog'];

    function DoctorIndexCtrl($scope, Doctor, $state, $rootScope, Account, $stateParams, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        //Functions..
        $scope.upsertUser = UpsertUser;
        $scope.changePassword = ChangePassword;
        $scope.showSummarySection = ShowSummarySection;
        $scope.closeSummarySection = CloseSummarySection;
        $scope.showPasswordSection = ShowPasswordSection;
        $scope.closePasswordSection = ClosePasswordSection;

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Doctor Profile";

            EditMode(false);


            GetDoctorProfile();
        }


        /*---------------------------------*/
        /* Photo Handling Section */
        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.doctor.profileImageURL = uri;
                    UpsertUser("Photo");
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };
        /*---------------------------------*/

        function EditMode(flag) {
            $scope.passwordSectionUpdate = flag;
            $scope.summarySectionUpdate = flag;
            $scope.clinicSectionUpdate = flag;
            $scope.servicesSectionUpdate = flag;
            $scope.professionalDetailsSectionUpdate = flag;
        }

        function ShowSummarySection() {
            $scope.summarySectionUpdate = true;
        }

        function CloseSummarySection() {
            $scope.summarySectionUpdate = false;
        }

        function ShowPasswordSection() {
            $scope.passwordSectionUpdate = true;
        }

        function ClosePasswordSection() {
            $scope.passwordSectionUpdate = false;
        }

        function ChangePassword(section) {
            //Setup parameters.
            var params = {
                user: $scope.doctor.doctorId,
                newPassword: $scope.doctor.password
            };

            $scope.myPromise = Doctor.changePassword(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //If all goes good, then ask him to relogin
                    $state.go('login', {signIn: true});
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function UpsertUser(section) {
            $scope.doctor.userType = "doctor";
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: "",
                patientId: "",
                userMap: $scope.doctor
            };

            $scope.myPromise = Doctor.saveProfile(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //If settings are updated, then ask him to relogin
                    if (section == "Settings") {
                        $state.go('login', {signIn: true});
                    }
                    //If all else goes good, rebind the data..
                    $scope.doctor = response.doctor;
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetDoctorProfile() {
            //Get Doctor Profile Details and populate..
            $scope.myPromise = Doctor.getProfile({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                isDoctor: true,
                mobile: "",
                columnsToGet: "sex,clinic,modifiedBy,settings,specializations,education,password,medicalregnumber,userType,patientId,parentId,userId,age,midlleName,experience,firstName,searchCol,aboutme,lastName,services,status,relation,modifiedDate,creationDate,briefsummary,doctorId,memberships,mobile"
            }, function (response) {
                $scope.doctor = response;
                if ($scope.doctor.settings == undefined) {
                    $scope.doctor.settings = {};
                }
                if ($scope.doctor.settings.canvasEnabled == undefined) {
                    $scope.doctor.settings.canvasEnabled = true;
                }
                if ($scope.doctor.settings.twoFactorAuthentication == undefined) {
                    $scope.doctor.settings.twoFactorAuthentication = false;
                }
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.doctor.services')

            .factory('Doctor', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        getProfile: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        saveProfile: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        },
                        changePassword: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/SetPassword'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.labs.controllers')
            .controller('LabsIndexCtrl', LabsIndexCtrl);

    LabsIndexCtrl.$inject = ['$scope', 'Labs', '$state', '$rootScope', 'Account', '$stateParams'];

    function LabsIndexCtrl($scope, Labs, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Lab & Imaging";
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.labs.services')

            .factory('Labs', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
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
(function () {
    'use strict';
    angular.module('ERemediumWebApp.messages.services')

            .factory('Messages', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        sendSMS: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/SendSMS'
                        },
                        getDeliveryReport: {
                            //TODO..
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/GetDeliveryReport',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsClinicalNotesCtrl', PatientsClinicalNotesCtrl);

    PatientsClinicalNotesCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsClinicalNotesCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        $scope.upsertClinicalNotes = UpsertClinicalNotes;
        $scope.openClinicalNote = OpenClinicalNote;

        // API exposed by WILL directive
        $scope.setDirectiveFn = function(saveImageFn) {
            $scope.saveImageFn = saveImageFn;
        };

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetClinicalNotes();
        }

        function UpsertClinicalNotes(index) {
            $scope.clinicalNote = {};
            $scope.clinicalNote.date = new Date();
            $scope.readOnly = false;//Show Save button as its editable view
            var upsertNoteDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-clinical-note.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertClinicalNotesCtrl'
            });
//
            upsertNoteDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "View") {
                    if( $scope.account.loggedInUser.settings.canvasEnabled ) {
                      $scope.clinicalNote.img = $scope.saveImageFn();
                    }
                    //Save the data..
                    SavePatientPeripheralDetails('ClinicalNote', "userClinicalNote");
                }
            });
        }

        function OpenClinicalNote(noteObj) {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetailsById({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userClinicalNote',
                did: noteObj.did,
                columnsToGet: ""
            }, function (response) {
                $scope.clinicalNote = response;
                $scope.readOnly = true;//Do Not Save button as its read only view
                ngDialog.open({
                    template: 'Patients/partials/patients.upsert-clinical-note.html',
                    className: 'ngdialog-theme-default custom-width-1',
                    scope: $scope,
                    showClose: false,
                    closeByEscape: false,
                    closeByDocument: false,
                    controller: 'PatientUpsertClinicalNotesCtrl'
                });
            });
        }

        function SavePatientPeripheralDetails(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDetail: $scope.clinicalNote
            };

            $scope.myPromise = Patient.upsertPeripheralDetails(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //Refresh the Clinical Notes section from backend only when success is there..
                    GetClinicalNotes();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetClinicalNotes() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userClinicalNote',
                columnsToGet: "did,date"
            }, function (response) {
                $scope.clinicalNotesList = response;
            });
        }
    }
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsDocumentsCtrl', PatientsDocumentsCtrl);

    PatientsDocumentsCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsDocumentsCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        $scope.upsertDocuments = UpsertDocuments;
        $scope.openDocument = OpenDocument;
        $scope.uploader = {};

        function Initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetDocuments();
        }

        function UpsertDocuments(index) {
            $scope.document = {};
            $scope.document.date = new Date();
            $scope.readOnly = false;//Show Save button as its editable view
            var upsertDocumentDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-document.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertDocumentsCtrl'
            });
//
            upsertDocumentDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "View") {
                    //Save the data..
                    SaveDocument('Document', "userDcoument");
                }
            });
        }

        function OpenDocument(documentObj) {
            //Get Patient Details from server and populate patient object..
            Patient.getDocumentById({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userDcoument',
                did: documentObj.did,
                columnsToGet: ""
            }, function (response) {
                $scope.document = response;
                $scope.readOnly = true;//Do Not Save button as its read only view
                ngDialog.open({
                    template: 'Patients/partials/patients.upsert-document.html',
                    className: 'ngdialog-theme-default custom-width-1',
                    scope: $scope,
                    showClose: false,
                    closeByEscape: false,
                    closeByDocument: false,
                    controller: 'PatientUpsertDocumentsCtrl'
                });
            });
        }

        function SaveDocument(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDocument: $scope.document
            };

            $scope.myPromise = Patient.upsertDocument(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //Refresh the Documents section from backend only when success is there..
                    GetDocuments();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetDocuments() {
            Patient.getDocuments({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userDcoument',
                columnsToGet: "did,date,documentName,tag"
            }, function (response) {
                $scope.documentsList = response;
            });
        }
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditAddressCtrl', PatientNewOrEditAddressCtrl);

    PatientNewOrEditAddressCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope'];

    function PatientNewOrEditAddressCtrl($scope, $stateParams, Patient, $state, $rootScope) {
        $scope.address = {};
        $scope.save = SaveAddress;

        function SaveAddress() {
            $scope.$parent.order.address = $scope.address;
            $scope.$parent.addresses.push($scope.address);
            // TODO: save to backednd
            $scope.address = {};
            $state.go('PrescriptionOrder', null, {reload: false});
        }
    }

})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientNewOrEditCtrl', PatientNewOrEditCtrl);

    PatientNewOrEditCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PatientNewOrEditCtrl($scope, $stateParams, Patient, $state, $rootScope, Account, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();
        $scope.account = account;

        Initialize();

        //Functions
        $scope.savePatientProfile = SavePatientProfile;
        $scope.savePatientPeripheralDetails = SavePatientPeripheralDetails;
        $scope.openPrescriptions = OpenPrescriptions;
        $scope.getAllPrescriptionsAccess = GetAllPrescriptionsAccess;
        $scope.bookAppointment = BookAppointment;

        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.patient.profileImageURL = uri;
                    SavePhoto("Photo");
                };
                fileReader.readAsDataURL(flowFile.file);
            });
        };

        //Functions
        function Initialize() {
            $scope.showAlert = false;
            $scope.genders = ["Male", "Female"];
            $scope.relationshiptypes = ["None", "Daughter", "Son", "Wife", "Father", "Mother", "Grand Father", "Grand Mother", "Brother", "Sister", "Others"];
            $rootScope.pageHeader = "Patient Profile";
            $scope.bloodgroups = ["None", "A+", "A-", "A Unknown", "B+", "B-", "B Unknown", "AB+", "AB-", "AB Unknown", "O+", "O-", "O Unknown"];
            if ($stateParams.patientId == '') {
                //A new patient profile is being created!
                //Set empty object..
                $scope.patient = {};
                $scope.patient.history = {};
                $scope.patient.alergy = {};
                $scope.patient.address = {};
                $scope.patient.age = {};
                $scope.patient.isUpdate = false;
                $scope.patient.sex = "Male";//set default value..
                $scope.patient.relation = "None";
                $scope.patient.bloodgroup = "None";
                $scope.patient.hasFullAccess = true;//If the Doctor/Hospital is creating patient, then he already has full access..
                $scope.patient.password = "";
                $scope.patient.parentId = "";
                $scope.patient.dependants = [];
                $scope.patient.status = "WaitingOTP";
                EditMode(true);
            } else {
                //Get Patient Details from server and populate patient object..
                GetUserProfile();
                EditMode(false);
            }
        }

        function EditMode(flag) {
            $scope.identifyingDetailsSectionUpdate = flag;
            $scope.historySectionUpdate = flag;
            $scope.allergiesSectionUpdate = flag;
        }

        function SavePatientProfile(section) {
            //Common settings for a patient
            $scope.patient.userType = "patient";
            $scope.patient.isDependant = ($scope.patient.relation == 'None') ? "false" : "true";
            $scope.patient.isUpdate = true;

            //Computed properties
            if ($scope.patient.age == undefined) {
                $scope.patient.age = {};
            }
            $scope.patient.age.year = $rootScope.getAge($scope.patient.dob);

            UpsertUser(section);
        }

        function SavePatientPeripheralDetails(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDetail: detailType == 'userHistory' ? $scope.patient.history : $scope.patient.alergy
            };
            $scope.myPromise = Patient.upsertPeripheralDetails(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function SavePhoto(section) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            UpsertUser(section);
        }

        function UpsertUser(section) {
            //Setup parameters.
            var params = {
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $scope.patient.patientId,
                userMap: $scope.patient
            };

            $scope.myPromise = Patient.upsert(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                    $scope.patient.isUpdate = false; //if there is an error from backend ..reset the isUpdate flag e.g. Mobile Number can be edited

                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //If all goes good, rebind the data..
                    $scope.patient = response.patient;
                    if ($scope.patient.dob) {
                        $scope.patient.dob = new Date($scope.patient.dob);
                    }
                    EditMode(false);
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                    $scope.patient.isUpdate = false; //if there is an error from backend ..reset the isUpdate flag e.g. Mobile Number can be edited
                }
            });
        }

        function GetUserProfile() {
            $scope.myPromise = Patient.get({
                user: $stateParams.patientId,
                sessionId: account.sessionId,
                isDoctor: false,
                mobile: "",
                columnsToGet: "sex,modifiedBy,userType,patientId,parentId,hasFullAccess,dependants,bloodgroup,age,userId,midlleName,firstName,isUpdate,searchCol,lastName,status,relation,modifiedDate,creationDate,createdBy,landlineNumber,address,email,dob,isDependant,mobile,alternateMobileNumber"
            }, function (response) {
                $scope.patient = response;
                $scope.imageURL = $rootScope.getImageURL(account.baseURL, account.userId, account.sessionId, $scope.patient.patientId);
                $scope.patient.dob = new Date($scope.patient.dob);
                //Once Profile is obtained..fetch history and allergies..
                GetHistory();
                GetAllergies();
            });
        }

        function GetHistory() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userHistory',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.history = response[0];
            });
        }

        function GetAllergies() {
            //Get Patient Details from server and populate patient object..
            Patient.getPeripheralDetails({
                user: account.userId,
                sessionId: account.sessionId,
                doctorId: account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userAllergy',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.alergy = response[0];
            });
        }

        function OpenPrescriptions() {
            $state.go('PrescriptionIndex', {
                patientId: $stateParams.patientId
            });
        }

        function BookAppointment() {
            $state.go('PatientAppointments', {
                patientId: $stateParams.patientId
            });
        }

        function GetAllPrescriptionsAccess() {
            //Open Verify OTP pageÏ
            $state.go('PatientVerifyOTP', {patientId: $stateParams.patientId})
        }
    }
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsListCtrl', PatientsListCtrl);

    PatientsListCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', '$stateParams'];

    function PatientsListCtrl($scope, Patient, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        Initialize();

        //Functions..
        $scope.search = search;
        $scope.createPatientProfile = createPatientProfile;
        $scope.openPatientProfile = openPatientProfile;
        $scope.getPatientList = GetPatientList;

        function Initialize() {
            $scope.showAlert = false;
            $rootScope.pageHeader = "Patients";
            $scope.patient = {};
            $scope.patient.search = '';
            $('.modal-backdrop').remove();
            //retrieve full patient list from backend..
            GetPatientList();
        }

        function GetPatientList() {
            $scope.patientList = Patient.query({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                limit: 50,
                columnsToGet: "firstName,midlleName,lastName,sex,age,mobile,email,patientId"
            }, function (response) {
                $scope.patientList = response;
            }
            );
            $scope.myPromise = $scope.patientList.$promise;
        }

        //Functions
        function createPatientProfile() {
            $state.go('PatientNewOrEdit');
        }

        function search() {
            $scope.searchPatientResults = Patient.search({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                searchText: $scope.patient.search,
                limit: 50,
                columnsToGet: "firstName,midlleName,lastName,sex,age,mobile,email,patientId"
            }, function (response) {
                if (angular.isUndefined(response) || response == '')
                {
                    $scope.showAlert = true;
                    $scope.alertMessage = "No Patient found with details: " + $scope.patient.search + "!";
                } else
                {
                    $scope.showAlert = false;
                    $scope.patientList = response;
                }
            }
            );
            $scope.myPromise = $scope.searchPatientResults.$promise;
        }

        function openPatientProfile(patient) {
            $state.go('PatientNewOrEdit', {patientId: patient.patientId});
        }
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertClinicalNotesCtrl', PatientUpsertClinicalNotesCtrl);

    PatientUpsertClinicalNotesCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account', '$rootScope'];

    function PatientUpsertClinicalNotesCtrl($scope, $stateParams, $state, Patient, Account, $rootScope) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.canvasEnabled = account.loggedInUser.settings.canvasEnabled;
            $scope.clinicalNote = $scope.$parent.clinicalNote;
            $scope.directiveFn = $scope.$parent.directiveFn;
            $scope.saveBtnName = $scope.readOnly ? 'View' : 'Add';
        }
    }
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertDocumentsCtrl', PatientUpsertDocumentsCtrl);

    PatientUpsertDocumentsCtrl.$inject = ['$scope', '$stateParams', '$state', 'Patient', 'Account'];

    function PatientUpsertDocumentsCtrl($scope, $stateParams, $state, Patient, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.document = $scope.$parent.document;
            $scope.saveBtnName = $scope.readOnly ? 'View' : 'Add';
        }

        $scope.uploader = {};

        $scope.handleUpload = function ($files, $event, $flow) {
            angular.forEach($flow.files, function (flowFile, i) {
                var fileReader = new FileReader();
                fileReader.onload = function (event) {
                    var uri = event.target.result;
                    $scope.document.img = uri;
                };
                $scope.document.documentName = flowFile.name;
                fileReader.readAsDataURL(flowFile.file);
            });
        };
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientUpsertVitalCtrl', PatientUpsertVitalCtrl);

    PatientUpsertVitalCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog'];

    function PatientUpsertVitalCtrl($scope, $stateParams, Patient, $state, $rootScope, Account, ngDialog) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var account = Account.getAuthenticatedAccount();

        Initialize();
        
        function Initialize() {
            $scope.vital = $scope.$parent.vital;
            $scope.saveBtnName = _.isEmpty($scope.vital) ? 'Add' : 'Update';
        }
    }
})();
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
                    /* When successfully verified, this should be set at back end, should be a doctor - patient map property..
                     patient.hasFullAccess = true; */
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
(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
            .controller('PatientsVitalsCtrl', PatientsVitalsCtrl);

    PatientsVitalsCtrl.$inject = ['$scope', 'Patient', '$state', '$rootScope', 'Account', 'ngDialog', '$stateParams'];

    function PatientsVitalsCtrl($scope, Patient, $state, $rootScope, Account, ngDialog, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();

        $scope.upsertVitals = UpsertVitals;

        function initialize() {
            $scope.sortType = ''; // set the default sort type
            $scope.sortReverse = false;  // set the default sort order
            GetVitals();
        }

        function UpsertVitals(index) {
            $scope.vital = _.isUndefined(index) ? {} : _.clone($scope.vitalList[index]);
            $scope.vital.dateTime = new Date();

            var upsertVitalDialog = ngDialog.open({
                template: 'Patients/partials/patients.upsert-vital.html',
                className: 'ngdialog-theme-default custom-width-1',
                scope: $scope,
                showClose: false,
                closeByEscape: false,
                closeByDocument: false,
                controller: 'PatientUpsertVitalCtrl'
            });

            upsertVitalDialog.closePromise.then(function (data) {
                if (data.value == "Add" || data.value == "Update") {
                    //Save the data..
                    SavePatientPeripheralDetails('Vitals', "userVitals");
                }
            });
        }

        function SavePatientPeripheralDetails(section, detailType) {
            if (angular.isUndefined($scope.patient.patientId)) {
                //if patient has not been created yet, then show an alert..
                $scope.showAlert = true;
                $scope.section = section;
                $scope.alertMessage = "Please create Patient before saving " + section + "!";
                $scope.alertClass = "alert-danger";
                return;
            }
            //Setup parameters.
            var params = {
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $scope.patient.patientId,
                detailType: detailType,
                userDetail: $scope.vital
            };
            //Delete redundant properties
            delete $scope.patient["_id"];
            $scope.myPromise = Patient.upsertPeripheralDetails(params, function (response) {
                $scope.showAlert = true;
                $scope.section = section;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in saving Patient's " + section + ", Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    $scope.alertMessage = "Patient's " + section + " Saved Successfully!";
                    $scope.alertClass = "alert-success";
                    //Refresh the vitals section from backend only when success is there..
                    GetVitals();
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function GetVitals() {
            Patient.getPeripheralDetails({
                user: $scope.account.userId,
                sessionId: $scope.account.sessionId,
                doctorId: $scope.account.userId,
                patientId: $stateParams.patientId,
                detailType: 'userVitals',
                columnsToGet: ""
            }, function (response) {
                $scope.vitalList = response;
            });
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.patients.services')

            .factory('Patient', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        },
                        upsertPeripheralDetails: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/InsertUserHistory'
                        },
                        search: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/SearchUser',
                            isArray: true
                        },
                        get: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        query: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUsersForDoctor',
                            isArray: true
                        },
                        getPeripheralDetails: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserHistory',
                            isArray: true
                        },
                        getPeripheralDetailsById: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserHistoryById',
                            isArray: false
                        },
                        getDocuments: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserDocument',
                            isArray: true
                        },
                        upsertDocument: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/InsertUserDocument'
                        },
                        getDocumentById: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserDocumentById',
                            isArray: false
                        },
                        generateOTP: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/GenerateOTP',
                            isArray: false
                        },
                        verifyOTP: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/communicationservice/VerifyOTP',
                            isArray: false
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.pharmacy.controllers')
            .controller('PharmacyIndexCtrl', PharmacyIndexCtrl);

    PharmacyIndexCtrl.$inject = ['$scope', 'Pharmacy', '$state', '$rootScope', 'Account', '$stateParams'];

    function PharmacyIndexCtrl($scope, Pharmacy, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Pharmacy";
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.pharmacy.services')

            .factory('Pharmacy', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionDetailCtrl', PrescriptionDetailCtrl);

    PrescriptionDetailCtrl.$inject = [
        '$scope',
        '$stateParams',
        'Prescription',
        'Account',
        '$state',
        '$rootScope',
        'Patient'
    ];

    function PrescriptionDetailCtrl($scope, $stateParams, Prescription, Account, $state, $rootScope, Patient) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }

        var user = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
            $scope.$parent.detailView = $stateParams.prescriptionId;
            $scope.patient = {};
            GetPrescription();
            GetVitals();
            GetHistory();
            GetAllergies();
        }

        function GetPrescription() {
            var params = {
                user: user.loggedInUser.mobile,
                sessionId: user.sessionId,
                pid: $stateParams.prescriptionId,
                columnsToGet: ""
            };
            $scope.prescription = Prescription.get(params);
            $scope.myPromise = $scope.prescription.$promise;
        }

        function GetVitals() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userVitals',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.vital = response[0];
            });
        }

        function GetHistory() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userHistory',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.history = response[0];
            });
        }

        function GetAllergies() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userAllergy',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.alergy = response[0];
            });
        }
    }
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionEditMedicinesCtrl', PrescriptionEditMedicinesCtrl);

    PrescriptionEditMedicinesCtrl.$inject = [
        '$scope',
        'Prescription',
        '$stateParams',
        'Account',
        'ngDialog',
        '$state',
        'Patient'
    ];

    function PrescriptionEditMedicinesCtrl($scope, Prescription, $stateParams, Account, ngDialog, $state, Patient) {
        $scope.prescription = $stateParams.prescription;
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        var user = Account.getAuthenticatedAccount();

        Initialize();

        $scope.save = UpsertPrescription;
        $scope.templateNameDialog = TemplateNameDialog;

        var params = {
            user: user.loggedInUser.mobile,
            sessionId: user.sessionId,
            doctorId: user.userId,
            columnsToGet: "",
            limit: 1000
        };

        function Initialize() {
            $scope.templates = {};
            $scope.patient = {};
            GetVitals();
            GetHistory();
            GetAllergies();
        }
        
        $scope.templateList = Prescription.getTemplates(params, function (response) {
            for (var i = 0; i < $scope.templateList.length; i++)
            {
                if (i % 2 == 0) {
                    $scope.templateList[i].favourite = true;
                }
            }
        });
        $scope.getTemplateName = function (template) {
            return template.templateName;
        };
        $scope.templateAdded = function (item) {
            // console.log($scope.templates.selected);
            //Add item.medcines to prescription.medcines
            ['medcines', 'advises'].forEach(function (itemStr) {
                var len = $scope.prescription[itemStr].length;
                //Since last entry is empty object we start adding item's medcines from len-1
                var i = 0;
                for (i = 0; i < item[itemStr].length; i++) {
                    $scope.prescription[itemStr][len - 1 + i] = item[itemStr][i];
                }
                //Insert an empty object at the end now
                //If item has no medcines then no point adding another empty object at the end as it is already there
                if (item[itemStr].length > 0) {
                    $scope.prescription[itemStr].push({});
                }
            });
        };
        $scope.firstLetterGroupFn = function (item) {
            //TODO: Fearure deprecated as of now. Code remains for future iteration
            //Add group-by="firstLetterGroupFn" at ui-select-choices directive
            /*
             if(item.favourite == true)
             return "Favourites";
             else
             return "Templates";
             */
        };
        $scope.templateRemoved = function (item) {
            //Need to remove whatever added in templateAdded function
            //Starting with medcines
            //Using Brute force method as of now using nested loops because n will be very low
            ['medcines', 'advises'].forEach(function (itemStr) {
                var itemCounter, prescriptionCounter;
                for (itemCounter = 0; itemCounter < item[itemStr].length; itemCounter++) {
                    for (prescriptionCounter = 0; prescriptionCounter < $scope.prescription[itemStr].length; prescriptionCounter++) {
                        if (item[itemStr][itemCounter] == $scope.prescription[itemStr][prescriptionCounter]) {
                            $scope.prescription[itemStr].splice(prescriptionCounter, 1);
                        }
                    }
                }
            });
        };

        function UpsertPrescription() {
            var params = {
                user: user.userId,
                sessionId: user.sessionId,
                prescription: $scope.prescription
            };

            ['medcines', 'advises'].forEach(function (itemStr) {
                var len = $scope.prescription[itemStr].length;
                if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
                        Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
                    $scope.prescription[itemStr].pop();
                }
            });

            $scope.myPromise = Prescription.upsert(params, function (response) {
                if (_.isEqual(response.respCode, 1)) {
                    $state.go('PrescriptionIndex.Detail', {
                        prescriptionId: response.pid,
                        patientId: $stateParams.patientId
                    });
                } else {
                    // Show Error
                    console.log(response);
                }
            });
        }

        function TemplateNameDialog() {
            var templateNameDialog = ngDialog.open({
                template: 'Prescriptions/partials/prescriptions.template-name-dialog.html',
                className: 'ngdialog-theme-default',
                scope: $scope,
                showClose: true,
                closeByEscape: false,
                closeByDocument: false,
                controller: function ($scope, $stateParams, Prescription, Account) {
                    // $scope.prescription = $scope.parent.prescription;
                    var user = Account.getAuthenticatedAccount();
                    $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;

                    function UpsertPrescriptionAsTemplate() {
                        var params = {
                            user: user.userId,
                            sessionId: user.sessionId,
                            isTemplate: "true",
                            templateName: $scope.template_name,
                            prescription: $scope.prescription
                        };

                        ['medcines', 'advises'].forEach(function (itemStr) {
                            var len = $scope.prescription[itemStr].length;
                            if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
                                    Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
                                $scope.prescription[itemStr].pop();
                            }
                        });
                        // Prescription.getTemplateById({sessionId: user.sessionId,doctorId: '101',templateId:'7575027259136053',columnsToGet:''},function(response){console.log(response);});
                        $scope.myPromise = Prescription.upsert(params, function (response) {
                            if (_.isEqual(response.respCode, 1)) {
                                $scope.closeThisDialog({
                                    state: 'saved',
                                    data: response.pid
                                });
                                $state.go('PrescriptionIndex.Detail', {
                                    prescriptionId: response.pid,
                                    patientId: $stateParams.patientId
                                });
                            } else {
                                // Show Error
                                console.log(response);
                            }
                        });
                    }
                }
            });
        }

        function GetVitals() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userVitals',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.vital = response[0];
            });
        }
        
        function GetHistory() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userHistory',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.history = response[0];
            });
        }

        function GetAllergies() {
            Patient.getPeripheralDetails({
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                patientId: $stateParams.patientId,
                detailType: 'userAllergy',
                columnsToGet: ""
            }, function (response) {
                $scope.patient.alergy = response[0];
            });
        }
    }
})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionNewOrEditCtrl', PrescriptionNewOrEditCtrl);

  PrescriptionNewOrEditCtrl.$inject = [
    '$rootScope',
    '$scope',
    'Prescription',
    '$stateParams',
    'Account',
    'ngDialog',
    '$state'
  ];

  function PrescriptionNewOrEditCtrl($rootScope, $scope, Prescription, $stateParams, Account, ngDialog, $state) {
    $rootScope.pageHeader = "Create Prescription";

    var patientId = $stateParams.patientId;

    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    var user = Account.getAuthenticatedAccount();
    // API exposed by WILL directive
    $scope.setDirectiveFn = function(saveImageFn, loadImageFn) {
        $scope.saveImageFn = saveImageFn;
        $scope.loadImageFn = loadImageFn;
        $rootScope.$emit("willInitialised");
    };
    
    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
      //save the previous state in a rootScope variable so that it's accessible from everywhere
      $rootScope.previousState = fromState;
      if(fromState.name == "PrescriptionAddMedicines" && toState.name == "PrescriptionNewOrEdit") {
          //Pass on presription.imgDiagnosis so that on back event canvas image is not lost
          toParams.prescription = {};
          toParams.prescription = fromParams.prescription;
      }
    });
    $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
    $scope.canvasIdx = 0;

    var pid = $stateParams.prescriptionId;
    if (_.isEmpty(pid)) {
      if($stateParams.prescription)
      { 
        $scope.prescription = $stateParams.prescription;
        // $scope.loadImageFn($scope.prescription.imgDiagnosis);
      }
      else {
        $scope.prescription = new Prescription;
        Init();
      }
    } else {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        pid: pid,
        columnsToGet: ""
      };

      $scope.prescription = Prescription.get(params);
      $scope.prescription.$promise.then(function (response) {
        delete $scope.prescription.pid; // We do not want to send the pid;
        delete $scope.prescription._id;
        if( $scope.canvasEnabled && $scope.loadImageFn && !_.isUndefined($scope.canvasIdx)
                                 && $scope.prescription.images.length > $scope.canvasIdx ) {
          $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
        }
        InitItems();
      });
    }

    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.dialogTitle = "New Prescription";
    $scope.loadCanvas = LoadCanvas;
    $rootScope.$on('willInitialised', function () {
      //Now load the images on canvas
      if( $scope.prescription.images && $scope.canvasEnabled && $scope.loadImageFn && !_.isUndefined($scope.canvasIdx)
                                 && $scope.prescription.images.length > $scope.canvasIdx) {
          $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
      }
    });

    function LoadCanvas(currIdx, template) {
      if( _.isUndefined(currIdx) ) {
        $scope.prescription.images[$scope.canvasIdx].src = $scope.saveImageFn();
        $scope.canvasIdx++;
        $scope.prescription.images.push({});
        if( !_.isUndefined(template) ) {
          var img = new Image();
          img.src = "img/ophthalmology.png";
          img.onload = function() {
            $scope.loadImageFn(img.src);
          };
        } else {
          $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
        }
      } else {
        if( currIdx < 0 || currIdx > $scope.prescription.images.length-1 ) return; // Defensive check
        $scope.prescription.images[$scope.canvasIdx].src = $scope.saveImageFn();
        $scope.canvasIdx = currIdx;
        $scope.loadImageFn($scope.prescription.images[$scope.canvasIdx].src);
      }
    }

    // Prescription
    $scope.save = UpsertPrescription;
    $scope.close = ClosePrescription;
    $scope.minimize = Minimize;
    $scope.addMedicines = AddMedicines;
    $scope.saveAsTemplate = UpsertPrescriptionAsTemplate;
    $scope.templateNameDialog = TemplateNameDialog;
    $scope.search = SearchMedicine;

    // Medicine/Advises
    $scope.upsertItem = UpsertItem;

    // Canvas | free write
    $scope.closeCanvas = CloseCanvas;

    function Init() {
      $scope.prescription.patientId = patientId;
      $scope.prescription.doctorId = user.userId;
      // Fill defaults from session object maybe
      $scope.prescription.isUpdate = false; // for edit we change this to true
      // Medications
      $scope.prescription.medcines = [];
      $scope.prescription.advises = [];

      $scope.prescription.images = [{}]; // Save prescription images

      InitItems();

      var defaultDate = new Date();
      console.log(defaultDate);
      // Add 7 days
      defaultDate.setDate(defaultDate.getDate() + 7);
      $scope.prescription.nextVisit = {};
      $scope.prescription.nextVisit.date = defaultDate;
      console.log($scope.prescription.nextVisit.date);
    }

    function InitItems() {
      ['medcines', 'advises'].forEach(function (itemsStr) {
        var len = $scope.prescription[itemsStr].length;
        if (len == 0 || (!_.isEmpty($scope.prescription[itemsStr][len - 1]) &&
            Object.keys($scope.prescription[itemsStr][len - 1]).length !== 1)) {
          $scope.prescription[itemsStr].push({});
        }
      });
    }

    function UpsertPrescription() {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        prescription: $scope.prescription
      };

      ['medcines', 'advises'].forEach(function (itemStr) {
        var len = $scope.prescription[itemStr].length;
        if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
            Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
          $scope.prescription[itemStr].pop();
        }
      });

      $scope.myPromise = Prescription.upsert(params, function (response) {
        if (_.isEqual(response.respCode, 1)) {
          $scope.closeThisDialog({
            state: 'saved',
            data: response.pid
          });
        } else {
          // Show Error
          console.log(response);
        }
      });
    }

    function TemplateNameDialog() {
      var templateNameDialog = ngDialog.open({
        template: 'Prescriptions/partials/prescriptions.template-name-dialog.html',
        className: 'ngdialog-theme-default',
        scope: $scope,
        showClose: true,
        closeByEscape: false,
        closeByDocument: false,
        controller: 'PrescriptionNewOrEditCtrl'
      });
    }

    function UpsertPrescriptionAsTemplate() {


      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        isTemplate: "true",
        templateName: $scope.templatename,
        prescription: $scope.prescription
      };

      ['medcines', 'advises'].forEach(function (itemStr) {
        var len = $scope.prescription[itemStr].length;
        if (_.isEmpty($scope.prescription[itemStr][len - 1]) ||
            Object.keys($scope.prescription[itemStr][len - 1]).length == 1) {
          $scope.prescription[itemStr].pop();
        }
      });

      $scope.myPromise = Prescription.upsert(params, function (response) {
        if (_.isEqual(response.respCode, 1)) {
          $scope.closeThisDialog({
            state: 'saved',
            data: response.pid
          });
        } else {
          // Show Error
          console.log(response);
        }
      });
    }

    function UpsertItem(item, index) {
      var itemStr, itemsStr;
      $scope.itemStr = itemStr = item;
      $scope.itemsStr = itemsStr = item + 's';

      $scope[itemStr] = {};
      $scope.editMode = !_.isUndefined(index);
      if ($scope.editMode)
        angular.copy($scope.prescription[itemsStr][index], $scope[itemStr]);

      var upsertDialog = ngDialog.open({
        template: 'Prescriptions/partials/prescriptions.upsert-' + itemStr + '.html',
        className: 'ngdialog-theme-default custom-width-2',
        scope: $scope,
        showClose: false,
        closeByEscape: false,
        closeByDocument: false,
        controller: 'PrescriptionUpsertItemCtrl'
      });

      upsertDialog.closePromise.then(function (data) {
        if (data.value == "Add") {
          $scope.prescription[itemsStr].push($scope[itemStr]);
        } else if (data.value == "Update") {
          $scope.prescription[itemsStr][index] = $scope[itemStr];
        }
      });
    }

    function Minimize() {
      $scope.closeThisDialog({state: 'minimized'});
    }

    function ClosePrescription() {
      $scope.closeThisDialog({state: 'closed'});
    }

    function CloseCanvas() {
      $scope.canvasEditable = false;
    }

    function AddMedicines() {
      // Save prescription image
      if( $scope.canvasEnabled ) {
        $scope.prescription.images[$scope.canvasIdx].src = $scope.saveImageFn();
      }

      $state.go('PrescriptionAddMedicines', {
        patientId: $stateParams.patientId,
        prescription: $scope.prescription
      });
    }

    function SearchMedicine(searchText) {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        doctorId: user.userId,
        searchText: searchText,
        limit: 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }
  }
})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionIndexCtrl', PrescriptionIndexCtrl);

  PrescriptionIndexCtrl.$inject = [
    '$scope',
    '$rootScope',
    '$state',
    'ngDialog',
    'Prescription',
    '$stateParams',
    'Account'
  ];

  function PrescriptionIndexCtrl($scope, $rootScope, $state, ngDialog, Prescription, $stateParams, Account) {
    $rootScope.pageHeader = "Prescriptions";

    var patientId = $stateParams.patientId;
    var user = Account.getAuthenticatedAccount();

    $scope.prescription = new Prescription;
    Init();

    $scope.prescriptions = [];

    $scope.create = CreatePrescription;
    $scope.clone = ClonePrescription;
    $scope.minimized = false;

    function Init() {
      $scope.prescription.patientId = patientId;
      $scope.prescription.doctorId = user.userId;
      // Fill defaults from session object maybe
      $scope.prescription.isUpdate = false; // for edit we change this to true
      // Medications
      $scope.prescription.medcines = [];
      $scope.prescription.advises = [];

      var defaultDate = new Date();
      // Add 7 days
      defaultDate.setDate(defaultDate.getDate() + 7);
      $scope.prescription.nextVisit = {};
      $scope.prescription.nextVisit.date = moment(defaultDate).format("DD/MM/YYYY hh:mm A");
    }

    function CreatePrescription() {
      $state.go('PrescriptionNewOrEdit', {
        patientId: $stateParams.patientId
      });
    }



    function ClonePrescription(pid) {
      $state.go('PrescriptionNewOrEdit', {
        patientId: $stateParams.patientId,
        prescriptionId: pid
      });
//      if (_.isUndefined(pid))
//        pid = $stateParams.prescriptionId;
//
//      var params = {
//        user: user.mobile,
//        sessionId: user.sessionId,
//        pid: pid,
//        columnsToGet: ""
//      };
//
//      $scope.prescription = Prescription.get(params);
//      $scope.prescription.$promise.then(function (response) {
//        delete $scope.prescription.pid; // We do not want to send the pid;
//        delete $scope.prescription._id;
//        CreatePrescription();
//      });
    }
  }

})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionItemsCtrl', PrescriptionItemsCtrl);

  PrescriptionItemsCtrl.$inject = ['$scope', 'Prescription', 'Account', '$state'];

  function PrescriptionItemsCtrl($scope, Prescription, Account, $state) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }

    var user = Account.getAuthenticatedAccount();

    //Initialize
    $scope.dispenseUnits = ['Tablet', 'Bottle', 'Injection'];
    $scope.dosageUnits = ['tablet', 'ml', 'mg'];
    $scope.instructions = [
      'SOS',
      'After Breakfast',
      'After Defecation',
      'After Dinner',
      'After Lunch',
      'After Meals',
      'At Bed Time',
      'Before Breakfast',
      'Before Dinner',
      'Before Lunch',
      'Before Meals',
      'In Between Food',
      'On Empty Stomach',
      'With Hot Water',
      'With Milk',
      'With Warm Water',
      'With Water'
    ];
    $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    $scope.times = ['Morning', 'Afternoon', 'Night'];

    $scope.favorites = [
      'Crocin',
      'Glycomed',
      'Disprin',
      'Combiflam',
      'Asprin',
      'Zandu Bam',
      'Digene'
    ];

    $scope.dosages = [
      "N/A",
      "0 - 0 - 1",
      "0 - 0 - 2",
      "0 - 0 - 3",
      "0 - 1 - 0",
      "0 - 1 - 1",
      "0 - 2 - 2",
      "0 - 3 - 3",
      "1 - 0 - 0",
      "1 - 0 - 1",
      "1 - 1 - 0",
      "1 - 1 - 1",
      "1 - 1 - 1 - 1",
      "2 - 0 - 2",
      "2 - 2 - 0",
      "2 - 2 - 2",
      "2 - 2 - 2 - 2",
      "3 - 0 - 0",
      "3 - 0 - 3",
      "3 - 3 - 0",
      "3 - 3 - 3",
      "3 - 3 - 3 - 3"
    ];

    $scope.advises = [
      'Absolute Eosinophil Count',
      'ACTH Stimulation Test',
      'Alpha Fetoprotien (Adult)',
      'Amlicor MTB Test',
      'Anti-LA Antibody',
      'Anti-Double Stranded DNA AntiBody'
    ];

    $scope.delete = Delete;
    $scope.add = AddItem;
    $scope.search = SearchMedicine;
    $scope.flag = 1;

    // Move to constants service
    $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    $scope.times = ['Morning', 'Afternoon', 'Night'];

    var typeWatch = $scope.$watch('type', function(val) {
      console.log("Item str: " + val);
      if(_.isUndefined(val)) return;
      var watchExpr = 'prescription.' + val + 's';
      var itemsWatch = $scope.$watch(watchExpr, function(newVal, oldVal) {
        if(newVal !== undefined && oldVal !== undefined) {
          var newLen = newVal.length;
          var oldLen = oldVal.length;
          if(newLen == oldLen - 1 && Object.keys(oldVal[oldLen-1]).length == 0) {
            //Time to unbind listener
            itemsWatch();
            return;
          }
          if(Object.keys(newVal[newLen-1]).length > 1) {
            AddItem();
          }
        }
      }, true);
      typeWatch();
    });

    function AddItem() {
      var itemsStr = $scope.type + 's';
      $scope.prescription[itemsStr].push({});
    }

    function SearchMedicine(searchText) {
      if(searchText == undefined || searchText == ""){
        //TODO: Back button causing data deletion
        //Just return Favourite Meds only. This is onClick only
        var params = {
          user: user.loggedInUser.mobile,
          sessionId: user.sessionId,
          doctorId: user.userId,
          limit: 5,
          columnsToGet: ""
        };
        $scope.myPromise = Prescription.getFavouriteMed(params).$promise;
        return Prescription.getFavouriteMed(params).$promise;
      }
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        doctorId: user.userId,
        searchText: searchText,
        limit: 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }

    function Delete(index) {
      var itemsStr = $scope.type + 's';
      $scope.prescription[itemsStr].splice(index, 1);
    }
  }

})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionListCtrl', PrescriptionListCtrl);

  PrescriptionListCtrl.$inject = [
    '$scope',
    '$stateParams',
    'Prescription',
    'Account',
    '$state',
    '$rootScope'
  ];

  function PrescriptionListCtrl($scope, $stateParams, Prescription, Account, $state, $rootScope) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    var user = Account.getAuthenticatedAccount();
    var patientId = $stateParams.patientId;

    $scope.$parent.detailView = null;
    $scope.prescriptions = $scope.$parent.prescriptions;
    $scope.detail = function(pid) {
      $state.go('PrescriptionIndex.Detail', {
        prescriptionId: pid
      });
    }

    $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
    $scope.sortSearchResultsReverse = false;// set the default sort order
    $scope.sortSearchResultsType = ''// set the default sort type

    $scope.doctorName = $rootScope.getFullName(user.loggedInUser);
    var params = {
      user: user.loggedInUser.mobile,
      sessionId: user.sessionId,
      doctorId: user.userId,
      patientId: patientId,
      columnsToGet: "pid,creationDate,patientComplaint,diagnosis,medcines,advises",
      limit: 15
    };

    $scope.delete = Delete;
    $scope.load = Load;

    var pages = 0,
        size = 15,
        loading = false;

    Load();
    function Load() {
      if (loading) return;
      loading = true;
      params.limit += pages*size;
      $scope.myPromise = Prescription.list(params, function(response) {
        $scope.prescriptions = response;
        loading = false;
      }).$promise;
      pages++;
    }

    function Delete(index) {
      $scope.prescriptions.splice(index, 1);
      // No prescription delete API as yet. But we need to call here.
    }
  }
})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionOrderStatusCtrl', PrescriptionOrderStatusCtrl);

  PrescriptionOrderStatusCtrl.$inject = ['$scope', '$stateParams', 'Account', '$state'];

  function PrescriptionOrderStatusCtrl($scope, $stateParams, Account, $state) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    $scope.account = Account.getAuthenticatedAccount();
    $scope.patientId = $stateParams.patientId;

  }
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

    PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$stateParams', 'Prescription', 'Account'];

    function PrescriptionOrderCtrl($scope, $state, $stateParams, Prescription, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        var user = Account.getAuthenticatedAccount();

        Initialize();

        //Functions
        $scope.order = Order;
        $scope.close = Close;

        function Initialize() {
            GetAddresses();
            GetPharmacies();
            GetLabs();
        }

        function GetAddresses() {
            var params = {
                user: user.loggedInUser.mobile,
                sessionId: user.sessionId,
                pid: $stateParams.prescriptionId,
                columnsToGet: ""
            };

            $scope.prescription = Prescription.get(params);
            $scope.myPromise = $scope.prescription.$promise;

            $scope.prescription.$promise.then(function (prescription) {
                if (angular.isUndefined($scope.prescription.patient.alternateAddresses)) {
                    $scope.prescription.patient.alternateAddresses = [];
                }
                $scope.addresses = $scope.prescription.patient.alternateAddresses;
                $scope.addresses.push($scope.prescription.patient.address);
                $scope.order.address = $scope.prescription.patient.address;//This is to checkbox checked..
            });
        }

        function GetPharmacies() {
            Prescription.listPharma({
                user: user.userId,
                sessionId: user.sessionId,
                city: user.loggedInUser.clinic.city,
                limit: 10,
                columnsToGet: ""
            }, function (response) {
                $scope.pharmacies = response;
            });
        }

        function GetLabs() {
            Prescription.listLabs({
                user: user.userId,
                sessionId: user.sessionId,
                city: user.loggedInUser.clinic.city,
                limit: 10,
                columnsToGet: ""
            }, function (response) {
                $scope.labs = response;
            });
        }

        function Order() {
            var params = {
                user: user.userId,
                sessionId: user.sessionId,
                doctorId: user.userId,
                pid: $stateParams.prescriptionId,
                pharmaId: $scope.order.pharmacy.pharmaId,
                deliveryAddress: {
                    addressLine1: $scope.order.address.addressLine1,
                    addressLine2: $scope.order.address.addressLine2,
                    city: $scope.order.address.city,
                    state: $scope.order.address.state,
                    pincode: $scope.order.address.pincode
                }
            };

            $scope.myPromise = Prescription.placeOrder(params, function (response) {
                $scope.showAlert = true;
                //Show Proper Alert with option of going back.
                if (angular.isUndefined(response)) {
                    $scope.alertMessage = "Error in placing Order, Please try again!";
                    $scope.alertClass = "alert-danger";
                } else if (response.respCode == 1) {
                    //If all goes well, navigate to Order Status page..
                    $state.go('PrescriptionOrderStatus', {
                        patientId: $stateParams.patientId,
                        prescriptionId: $stateParams.prescriptionId
                    });
                } else {
                    $scope.alertMessage = response.response;
                    $scope.alertClass = "alert-danger";
                }
            });
        }

        function Close() {
            $state.go('PatientNewOrEdit', {patientId: $stateParams.patientId});
        }
    }
})();

(function () {
  'use strict';

  angular.module('ERemediumWebApp.prescriptions.controllers')
      .controller('PrescriptionUpsertItemCtrl', PrescriptionUpsertItemCtrl);

  PrescriptionUpsertItemCtrl.$inject = ['$scope', '$stateParams', '$state', 'Prescription', 'Account'];

  function PrescriptionUpsertItemCtrl($scope, $stateParams, $state, Prescription, Account) {
    if (!Account.isAuthenticated()) {
      $state.go('login', {signIn: true});
      return;
    }
    var user = Account.getAuthenticatedAccount();
    // Move to constants
    $scope.frequencies = ['Daily', 'Weekly', 'Monthly', 'Custom'];
    $scope.dispenseUnits = ['Tablet', 'Bottle', 'Injection'];
    $scope.dosageUnits = ['tablet', 'ml', 'mg'];
    $scope.instructions = [
      'After Breakfast',
      'After Defecation',
      'After Dinner',
      'After Lunch',
      'After Meals',
      'At Bed Time',
      'Before Breakfast',
      'Before Dinner',
      'Before Lunch',
      'Before Meals',
      'In Between Food',
      'On Empty Stomach',
      'With Hot Water',
      'With Milk',
      'With Warm Water',
      'With Water'
    ];
    $scope.days = ['Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat', 'Sun'];
    $scope.times = ['Morning', 'Afternoon', 'Night'];

    $scope.favorites = [
      'Crocin',
      'Glycomed',
      'Disprin',
      'Combiflam',
      'Asprin',
      'Zandu Bam',
      'Digene'
    ];

    $scope.advises = [
      'Absolute Eosinophil Count',
      'ACTH Stimulation Test',
      'Alpha Fetoprotien (Adult)',
      'Amlicor MTB Test',
      'Anti-LA Antibody',
      'Anti-Double Stranded DNA AntiBody'
    ];

    var itemStr = $scope.$parent.itemStr;
    var itemsStr = $scope.$parent.itemsStr;

    $scope.saveBtnName = _.isEmpty($scope[itemStr]) ? 'Add' : 'Update';
    // Limitation as the API has a mis-spelled medicine (else we can directly capitalize the first letter)
    $scope.dialogTitle = $scope.saveBtnName + ' ' + ((itemStr === 'medcine') ? 'Medicine' : 'Advise');

    Init();

    function Init() {
      $scope[itemStr] = $scope.$parent[itemStr];
      if (itemStr === 'medcine') {
        $scope.medcine.frequency = $scope.medcine.frequency || {};
        $scope.medcine.frequency.freq = $scope.medcine.frequency.freq || $scope.frequencies[0];
        $scope.medcine.frequency.dType = $scope.medcine.frequency.dType || $scope.dosageUnits[0];
      } else if (itemStr === 'advise') {
        // To fill defaults
      }
    }

    $scope.search = SearchMedicine;
    $scope.next = AddNext;

    function SearchMedicine(searchText) {
      var params = {
        user: user.loggedInUser.mobile,
        sessionId: user.sessionId,
        doctorId: user.userId,
        searchText: searchText,
        limit: 5,
        columnsToGet: ""
      };
      $scope.myPromise = Prescription.searchMed(params).$promise;
      return Prescription.searchMed(params).$promise;
    }

    function AddNext() {
      $scope.$parent.prescription[itemsStr].push($scope[itemStr]);
      $scope.$parent[itemStr] = {};
      Init();
    }
  }

})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.directives').
    directive('items', items);

    items.$inject = ['$rootScope'];

    function items($rootScope) {
        function link(scope, element, attrs) {
           scope.editable = false;
           if(attrs.editable) {
            scope.editable = true;
           }
           scope.type = attrs.type;
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: function(element, attrs) {
              return 'Prescriptions/partials/prescriptions.' + attrs.type + 's.html';
            },
            controller: 'PrescriptionItemsCtrl',
            scope: {
              prescription: '=prescription'
            }
        };

        return directive;
    }
})();

(function() {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.directives').
    directive('navbar', navbar);

    navbar.$inject = ['$rootScope'];

    function navbar($rootScope) {
        function link(scope, element, attrs) {

        }

        var directive = {
            link: link,
            restrict: 'E',
            transclude: true,
            templateUrl: function(element, attr) {
              return 'Prescriptions/partials/prescriptions.' + attr.type + '.html';
            }
        };

        return directive;
    }
})();

(function () {
  'use strict';
  angular.module('ERemediumWebApp.prescriptions.services')
      .factory('Prescription', ['$resource', function ($resource) {
          var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
          var paramDefaults = {}; // Currently no param defaults

          var actions = {
            upsert: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/UpsertPrescription'
            },
            list: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/ListPrescription',
              isArray: true
            },
            get: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/GetPrescription'
            },
            query: {
              method: 'GET',
              url: 'http://52.76.165.4/ERService/prescription/SearchPrescription'
            },
            searchMed: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/medcineservice/MedAutocomplete',
              isArray: true
            },
            listPharma: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/pharmaservice/ListPharma',
              isArray: true
            },
            listLabs: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/pharmaservice/ListPharma',//TODO put in correct contract!
              isArray: true
            },
            placeOrder: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/orderservice/Order',
              isArray: false
            },
            getTemplates: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/ListTemplate',
              isArray: true
            },
            getTemplateById: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/prescription/GetTemplateById',
              isArray: false
            },
            getFavouriteMed: {
              method: 'POST',
              url: 'http://52.76.165.4/ERService/medcineservice/GetFavouriteMed',
              isArray: true
            }
          };

          return $resource(resourceUrl, paramDefaults, actions);
        }]);
})();

(function () {
    'use strict';

    angular.module('ERemediumWebApp.reportinganalytics.controllers')
            .controller('ReportingAnalyticsIndexCtrl', ReportingAnalyticsIndexCtrl);

    ReportingAnalyticsIndexCtrl.$inject = ['$scope', 'ReportingAnalytics', '$state', '$rootScope', 'Account', '$stateParams'];

    function ReportingAnalyticsIndexCtrl($scope, ReportingAnalytics, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();


        function initialize() {
            $rootScope.pageHeader = "Reporting & Analytics";
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.reportinganalytics.services')

            .factory('ReportingAnalytics', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.tasks.controllers')
            .controller('TasksListCtrl', TasksListCtrl);

    TasksListCtrl.$inject = ['$scope', 'Task', '$state', '$rootScope', 'Account'];

    function TasksListCtrl($scope, Task, $state, $rootScope, Account) {
        if (!Account.isAuthenticated()) {
            $state.go('login', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        Initialize();

        function Initialize() {
            $rootScope.pageHeader = "Tasks";
            $scope.buttonText = function (taskObjType) {
                if (taskObjType == "Refill Request") {
                    return "Go to Prescription";
                } else if (taskObjType == "Lab Results") {
                    return "View Lab Results";
                } else {
                    return "Take Action";
                }
            }
            CreateDummyTaskList();
        }

        function CreateDummyTaskList() {

            
            var task1 = {};
            task1.type = "Refill Request";
            task1.dateadded = "30/04/2016";
            task1.status = "Pending";
            task1.patient = {};
            task1.patient.patientId = "169080020875355";
            task1.patient.mobile = 9910430979;
            task1.patient.patientName = "Aryan Singh";

            var task2 = {};
            task2.type = "Lab Results";
            task2.dateadded = "27/04/2016";
            task2.status = "Pending";
            task2.patient = {};
            task2.patient.patientId = "764505141092893";
            task2.patient.mobile = 9234567890;
            task2.patient.patientName = "Rohit Singh Saini";

            var task3 = {};
            task3.type = "Lab Results";
            task3.dateadded = "26/04/2016";
            task3.status = "Pending";
            task3.patient = {};
            task3.patient.patientId = "726284709754468";
            task3.patient.mobile = 9234567890;
            task3.patient.patientName = "Vishwajeet Saini Sr.";

            var task4 = {};
            task4.type = "Refill Request";
            task4.dateadded = "24/04/2016";
            task4.status = "Pending";
            task4.patient = {};
            task4.patient.patientId = "8014201593870209";
            task4.patient.mobile = 9910456723;
            task4.patient.patientName = "Ashutosh Bhatia";

            var task5 = {};
            task5.type = "Refill Request";
            task5.dateadded = "10/04/2016";
            task5.status = "Rejected";
            task5.patient = {};
            task5.patient.patientId = "8732237602918102";
            task5.patient.mobile = 9876543334;
            task5.patient.patientName = "Pahul Jain";

            var task6 = {};
            task6.type = "Refill Request";
            task6.dateadded = "02/04/2016";
            task6.status = "Approved";
            task6.patient = {};
            task6.patient.patientId = "168623978562710";
            task6.patient.mobile = 9818647551;
            task6.patient.patientName = "Sujit Chaudhary";

            var task7 = {};
            task7.type = "Lab Results";
            task7.dateadded = "01/04/2016";
            task7.status = "Viewed";
            task7.patient = {};
            task7.patient.patientId = "8729179790399743";
            task7.patient.mobile = 9717271217;
            task7.patient.patientName = "Rohan Gupta";

            $scope.taskList = [task1, task2, task3, task4, task5, task6, task7];
        }
    }
})();
(function () {
    'use strict';
    angular.module('ERemediumWebApp.tasks.services')

            .factory('Task', ['$resource', function ($resource) {
                    var resourceUrl = ''; // We have different resource url for different actions, so we will enter them in actions
                    var paramDefaults = {}; // Currently no param defaults

                    var actions = {
                        upsert: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/UpsertUser'
                        },
                        get: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUserById',
                            isArray: false
                        },
                        query: {
                            method: 'POST',
                            url: 'http://52.76.165.4/ERService/userservice/GetUsersForDoctor',
                            isArray: true
                        }
                    };

                    return $resource(resourceUrl, paramDefaults, actions);
                }]);
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('aDisabled', aDisabled);

    function aDisabled() {
        return {
            compile: function (tElement, tAttrs, transclude) {
                //Disable ngClick
                tAttrs["ngClick"] = "!(" + tAttrs["aDisabled"] + ") && (" + tAttrs["ngClick"] + ")";

                //Toggle "disabled" to class when aDisabled becomes true
                return function (scope, iElement, iAttrs) {
                    scope.$watch(iAttrs["aDisabled"], function (newValue) {
                        if (newValue !== undefined) {
                            iElement.toggleClass("disabled", newValue);
                        }
                    });

                    //Disable href on click
                    iElement.on("click", function (e) {
                        if (scope.$eval(iAttrs["aDisabled"])) {
                            e.preventDefault();
                        }
                    });
                };
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
            directive('datetimepicker', datetimepicker);

    datetimepicker.$inject = ['$rootScope'];

    function datetimepicker($rootScope) {
        function link(scope, element, attrs) {
            var options = {
              useCurrent: false
            };

            var pickerEl = element.find('.date');
            scope.$watch('ngModel', function(newValue) {
              if(_.isEmpty(pickerEl.data("DateTimePicker"))) {
                pickerEl.datetimepicker(options);
              } else {
                if(!_.isEmpty(newValue)) {
                  pickerEl.data("DateTimePicker").date(new Date(newValue));
                }
              }
            });

            element.find('input').attr('placeholder', attrs.placeholder);
            element.find('input').attr('ng-change', attrs.ngChange);

            element.bind('dp.change', function (e) {
                scope.ngModel = e.date;
            });
        }

        var directive = {
            link: link,
            restrict: 'E',
            templateUrl: 'Utils/partials/datetimepicker.html',
            scope: {
                ngModel: '='
            }
        };

        return directive;
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives').
    directive('myCanvas', myCanvas);

    myCanvas.$inject = [];

    function myCanvas() {
        function link(scope, elm, attrs) {
            var isTouch = !!('ontouchstart' in window);

            var PAINT_START = isTouch ? 'touchstart' : 'mousedown';
            var PAINT_MOVE = isTouch ? 'touchmove' : 'mousemove';
            var PAINT_END = isTouch ? 'touchend' : 'mouseup';

            var options = attrs.options || {};

            // create canvas and context
            var canvas = document.createElement('canvas');
            canvas.id = options.canvasId;
            canvas.setAttribute('resize', '');

            var canvasTmp = document.createElement('canvas');
            canvasTmp.id = options.tmpCanvasId;
            canvasTmp.setAttribute('resize', '');

            angular.element(canvasTmp).css({
              position: 'absolute',
              top: 0,
              left: 0
            });
            elm.find('div').append(canvas);
            elm.find('div').append(canvasTmp);
            var ctx = canvas.getContext('2d');
            var ctxTmp = canvasTmp.getContext('2d');

            //inti variables
            var point = {
              x: 0,
              y: 0
            };
            paper.remove();
            paper.setup(canvasTmp);

            // Set Canvas Width; At this point resize has taken effect and the
            // Canvas occupies the maximum width available
            canvas.width = canvasTmp.width;
            canvas.height = canvasTmp.height;

            // Paper JS Path
            var path;

            var getOffset = function(elem) {
              var offsetTop = 0;
              var offsetLeft = 0;
              do {
                if (!isNaN(elem.offsetLeft)) {
                  offsetTop += elem.offsetTop;
                  offsetLeft += elem.offsetLeft;
                }
                elem = elem.offsetParent;
              } while (elem);
              return {
                left: offsetLeft,
                top: offsetTop
              };
            };

            var setPointFromEvent = function(point, e) {
              if (isTouch) {
                point.x = e.changedTouches[0].pageX - getOffset(e.target).left;
                point.y = e.changedTouches[0].pageY - getOffset(e.target).top;
              } else {
                point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
                point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
              }
            };

            var saveImage = function () {
              scope.$apply(function() {
                scope.ngModel = canvas.toDataURL();
              });
            };

            var paint = function(e) {
              var p1 = new paper.Point(point.x, point.y), p2;
              if (e) {
                e.preventDefault();
                setPointFromEvent(point, e);
                p2 = new paper.Point(point.x, point.y);

                if (p1.equals(p2)) return;

                var delta = p2.subtract(p1);
                var step = delta.divide(2);

                var fillWidth = 2; // Hard coded as of now
                var lineWidth = fillWidth/step.length;
                var len = step.length;
                var alpha = 1;
                var velocity = alpha*((2*len)/45);

                step = step.multiply((fillWidth - velocity)/len);
                step.angle += 90;

                var middlePoint = (p1.add(p2)).divide(2);
                var top = middlePoint.add(step);
                var bottom = middlePoint.subtract(step);

                //console.log('Points: Top: ', top, 'Bottom: ', bottom);
                path.add(top);
                path.insert(0, bottom);

                // Smoothen the path
                path.smooth();
              }
            };

            var copyTmpImage = function(e) {
              setPointFromEvent(point, e);
              path.add(point);
              path.closed = true;

              canvasTmp.removeEventListener(PAINT_MOVE, paint, false);
              ctx.drawImage(canvasTmp, 0, 0);

              // Remove all the active layers in Paper JS
              // We do this because the re-draw becomes too time intensivev operation
              // once the number of drawing objects are large on the canvas
              paper.project.clear();
              // This is causing some performance impact.
              // Need to schedule this on demand
              // saveImage();
            };

            var startTmpImage = function(e) {
              e.preventDefault();
              canvasTmp.addEventListener(PAINT_MOVE, paint, false);

              setPointFromEvent(point, e);
              path = new paper.Path();
              path.fillColor = 'black';
              path.fillCap = 'round'
              path.add(point);
              paint();
            };

            var initListeners = function() {
              canvasTmp.addEventListener(PAINT_START, startTmpImage, false);
              canvasTmp.addEventListener(PAINT_END, copyTmpImage, false);

              if (!isTouch) {
                var MOUSE_DOWN;

                document.body.addEventListener('mousedown', mousedown);
                document.body.addEventListener('mouseup', mouseup);

                scope.$on('$destroy', removeEventListeners);

                canvasTmp.addEventListener('mouseenter', mouseenter);
                canvasTmp.addEventListener('mouseleave', mouseleave);
              }

              function mousedown() {
                MOUSE_DOWN = true;
              }

              function mouseup() {
                MOUSE_DOWN = false;
              }

              function removeEventListeners() {
                document.body.removeEventListener('mousedown', mousedown);
                document.body.removeEventListener('mouseup', mouseup);
              }

              function mouseenter(e) {
                // If the mouse is down when it enters the canvas, start a path
                if (MOUSE_DOWN) {
                  startTmpImage(e);
                }
              }

              function mouseleave(e) {
                // If the mouse is down when it leaves the canvas, end the path
                if (MOUSE_DOWN) {
                  copyTmpImage(e);
                }
              }
            };

            var init = function() {
              // Hack to get canvas to work on touch devices
              // This maybe due to some internal issue with e-remedium app
              // or it maybe a global issue
              var body = $('body').get(0);
              var scrollTopInitial = body.scrollTop;
              body.scrollTop = 0;

              scope.$on('$destroy', removeScrollTop);

              loadImage();

              function removeScrollTop() {
                body.scrollTop = scrollTopInitial;
              }

              function loadImage() {
                if (_.isEmpty(scope.ngModel)) {
                  return;
                }
                var image = document.createElement('img');
                image.src = scope.ngModel;
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(image, 0, 0);
              }

              // Initialize listeners
              initListeners();
            };

            init();
        }

        var directive = {
            link: link,
            restrict: 'AE',
            scope: {
              ngModel: '='
            },
            template: '<div class="myCanvasPaint" style="position:relative"></div>'
        };

        return directive;
    }

    angular.module('ERemediumWebApp.utils.directives').
    directive('palmReject', palmReject);

    palmReject.$inject = ['$rootScope'];

    function palmReject($rootScope) {
      function link(scope, elm, attrs) {
        var elem = elm;
        elm.on('touchstart touchmove', function(e) {
          e.preventDefault();
        });

        var buffer = 50; // 50px

        $rootScope.$on('canvas.write', function(e, top) {
          var windowHeight = $(window).height();
          var rTop = windowHeight - elem.height();
          if( rTop - top < 50 ) {
            var newHeight = windowHeight - (top + buffer);
            elem.height(newHeight);
          }
        });
      }

      return {
        link: link,
        restrict: 'AE'
      }
    }
})();

(function (angular) {
    'use strict';
    angular.module('ERemediumWebApp.utils.directives').
    directive('ngPrint', printDirective);

    function printDirective() {
        var printSection = document.getElementById('printSection');

        // if there is no printing section, create one
        if (!printSection) {
            printSection = document.createElement('div');
            printSection.id = 'printSection';
            document.body.appendChild(printSection);
        }

        function link(scope, element, attrs) {
            element.on('click', function () {
                var elemToPrint = document.getElementById(attrs.printElementId);
                if (elemToPrint) {
                    printElement(elemToPrint);
                    window.print();
                }
            });

            window.onafterprint = function () {
                // clean the print section before adding new content
                printSection.innerHTML = '';
            }
        }

        function printElement(elem) {
            printSection.innerHTML = '';
            // clones the element you want to print
            var domClone = elem.cloneNode(true);
            printSection.appendChild(domClone);
        }

        return {
            link: link,
            restrict: 'A'
        };
    }
}(window.angular));
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('scrollSpy', scrollSpy);

    scrollSpy.$inject = ['$window'];

    function scrollSpy($window) {
        return {
            restrict: 'A',
            controller: function ($scope) {
                $scope.spies = [];
                this.addSpy = function (spyObj) {
                    $scope.spies.push(spyObj);
                };
            },
            link: function (scope, elem, attrs) {
                var spyElems;
                spyElems = [];

                scope.$watch('spies', function (spies) {
                    var spy, _i, _len, _results;
                    _results = [];

                    for (_i = 0, _len = spies.length; _i < _len; _i++) {
                        spy = spies[_i];

                        if (spyElems[spy.id] == null) {
                            _results.push(spyElems[spy.id] = elem.find('#' + spy.id));
                        }
                    }
                    return _results;
                });

                $($window).scroll(function () {
                    var highlightSpy, pos, spy, _i, _len, _ref;
                    highlightSpy = null;
                    _ref = scope.spies;

                    // cycle through `spy` elements to find which to highlight
                    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
                        spy = _ref[_i];
                        spy.out();

                        // catch case where a `spy` does not have an associated `id` anchor
                        if (spyElems[spy.id].offset() === undefined) {
                            continue;
                        }

                        if ((pos = spyElems[spy.id].offset().top) - $window.scrollY <= 0) {
                            // the window has been scrolled past the top of a spy element
                            spy.pos = pos;

                            if (highlightSpy == null) {
                                highlightSpy = spy;
                            }
                            if (highlightSpy.pos < spy.pos) {
                                highlightSpy = spy;
                            }
                        }
                    }

                    // select the last `spy` if the scrollbar is at the bottom of the page
                    if ($(window).scrollTop() + $(window).height() >= $(document).height()) {
                        spy.pos = pos;
                        highlightSpy = spy;
                    }

                    return highlightSpy != null ? highlightSpy["in"]() : void 0;
                });
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('spy', spy);

    spy.$inject = ['$location', '$anchorScroll'];

    function spy($location, $anchorScroll) {
        return {
            restrict: "A",
            require: "^scrollSpy",
            link: function (scope, elem, attrs, affix) {
                elem.click(function () {
                    $location.hash(attrs.spy);
                    $anchorScroll();
                });

                affix.addSpy({
                    id: attrs.spy,
                    in: function () {
                        elem.addClass('active');
                    },
                    out: function () {
                        elem.removeClass('active');
                    }
                });
            }
        };
    }
})();
(function () {
    'use strict';

    angular.module('ERemediumWebApp.utils.directives')
            .directive('stringToNumber', stringToNumber);

    stringToNumber.$inject = ['$rootScope'];

    function stringToNumber($rootScope) {
        return {
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                ngModel.$parsers.push(function (value) {
                    return '' + value;
                });
                ngModel.$formatters.push(function (value) {
                    return parseFloat(value, 10);
                });
            }
        };
    }
})();
(function() {
  'use strict';

  angular.module('ERemediumWebApp.utils.directives').
  directive('willCanvas', willCanvas);

  willCanvas.$inject = ['$rootScope'];

  function MyPoint() {
    this.x = undefined;
    this.y = undefined;
  }

  MyPoint.prototype.isValid = function() {
    return !(this.x == undefined && this.y == undefined);
  }

  function willCanvas($rootScope) {
    function link(scope, elem, attrs) {
      var canvas = elem.get(0);
      var canvasImg = scope.ngModel;
      var scope = scope;

      var WILL = {
        backgroundColor: Module.Color.WHITE,
        color: Module.Color.BLACK,

        init: function(width, height, canvas) {
          this.isTouch = !!('ontouchstart' in window);
          this.canvasEl = canvas;
          this.initInkEngine(width, height);
          this.initEvents();

          if (!_.isEmpty(canvasImg)) {
            this.loadImage(canvasImg);
          }
        },

        initInkEngine: function(width, height) {
          this.canvas = new Module.InkCanvas(this.canvasEl, width, height);
          this.canvas.clear(this.backgroundColor);

          this.brush = new Module.DirectBrush();

          this.speedPathBuilder = new Module.SpeedPathBuilder();
          this.speedPathBuilder.setNormalizationConfig(182, 3547);
          // this.speedPathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);
          this.speedPathBuilder.setPropertyConfig(Module.PropertyName.Width, 0.5, 1.2, NaN, NaN, Module.PropertyFunction.Sigmoid, 0.6, true);

          if (window.PointerEvent) {
            this.pressurePathBuilder = new Module.PressurePathBuilder();
            this.pressurePathBuilder.setNormalizationConfig(0.195, 0.88);
            this.pressurePathBuilder.setPropertyConfig(Module.PropertyName.Width, 2.05, 34.53, 0.72, NaN, Module.PropertyFunction.Power, 1.19, false);
            this.smoothener = new Module.MultiChannelSmoothener(this.pressurePathBuilder.stride);
          } else {
            this.smoothener = new Module.MultiChannelSmoothener(this.speedPathBuilder.stride);
          }

          this.strokeRenderer = new Module.StrokeRenderer(this.canvas, this.canvas);
          this.strokeRenderer.configure({brush: this.brush, color: this.color});
        },

        initEvents: function() {
          var self = this;

          if (window.PointerEvent) {
            Module.canvas.addEventListener("pointerdown", function(e) {self.beginStroke(e);});
            Module.canvas.addEventListener("pointermove", function(e) {self.moveStroke(e);});
            document.addEventListener("pointerup", function(e) {self.endStroke(e);});
          }
          else {
            Module.canvas.addEventListener("mousedown", function(e) {self.beginStroke(e);});
            Module.canvas.addEventListener("mousemove", function(e) {self.moveStroke(e);});
            document.addEventListener("mouseup", function(e) {self.endStroke(e);});

            if (window.TouchEvent) {
              Module.canvas.addEventListener("touchstart", function(e) {self.beginStroke(e);});
              Module.canvas.addEventListener("touchmove", function(e) {self.moveStroke(e);});
              document.addEventListener("touchend", function(e) {self.endStroke(e);});
            }
          }
        },

        getOffset: function(elem) {
          var offsetTop = 0;
          var offsetLeft = 0;
          do {
            if (!isNaN(elem.offsetLeft)) {
              offsetTop += elem.offsetTop;
              offsetLeft += elem.offsetLeft;
            }
            elem = elem.offsetParent;
          } while (elem);
          return {
            left: offsetLeft,
            top: offsetTop
          };
        },

        setPointFromEvent: function(point, e) {
          if (window.PointerEvent && e instanceof PointerEvent) {
            console.re.log("Pointer events supported!");
            e = e.originalEvent;
          }

          var top;
          if (this.isTouch) {
            if (e.changedTouches[0].target.id !== this.canvasEl.id) { // there will always be at-least 1 changedTouch
              return false;                                           // causing the TouchEvent
            }
            point.x = e.changedTouches[0].pageX - this.getOffset(e.target).left;
            point.y = e.changedTouches[0].pageY - this.getOffset(e.target).top;
            top = e.changedTouches[0].clientY;
          } else {
            point.x = e.offsetX !== undefined ? e.offsetX : e.layerX;
            point.y = e.offsetY !== undefined ? e.offsetY : e.layerY;
            top = e.clientY;
          }

          // Notify parent scopes about the canvas write
          $rootScope.$emit('canvas.write', top);
          return true;
        },

        getPressure: function(e) {
          return (window.PointerEvent && e instanceof PointerEvent && e.pressure !== 0.5)?e.pressure:NaN;
        },

        beginStroke: function(e) {
          var point = new MyPoint;
          this.setPointFromEvent(point, e);
          if (!point.isValid()) return;

          e.preventDefault();
          this.inputPhase = Module.InputPhase.Begin;
          this.pressure = this.getPressure(e);
          this.pathBuilder = isNaN(this.pressure)?this.speedPathBuilder:this.pressurePathBuilder;

          this.buildPath(point);
          this.drawPath();
        },

        moveStroke: function(e) {
          if (!this.inputPhase) return;

          var point = new MyPoint;
          this.setPointFromEvent(point, e)
          if (!point.isValid()) return;

          e.preventDefault();
          this.inputPhase = Module.InputPhase.Move;

          this.pointerPos = point;
          this.pressure = this.getPressure(e);

          if (WILL.frameID != WILL.canvas.frameID) {
            var self = this;
//            if(!self.lastCalledTime) {
//               self.lastCalledTime = Date.now();
//               var fps = 0;
//               return;
//            }
//            var delta = (Date.now() - self.lastCalledTime)/1000;
//            self.lastCalledTime = Date.now();
//            fps = 1/delta;
//            console.re.log("FPS: ", fps);

            WILL.frameID = WILL.canvas.requestAnimationFrame(function() {
              if (self.inputPhase && self.inputPhase == Module.InputPhase.Move) {
                self.buildPath(self.pointerPos);
                self.drawPath();
              }
            }, true);
          }
        },

        endStroke: function(e) {
          if (!this.inputPhase) return;

          var point = new MyPoint;
          this.setPointFromEvent(point, e);
          if (!point.isValid()) return;

          e.preventDefault();
          this.inputPhase = Module.InputPhase.End;
          this.pressure = this.getPressure(e);
          this.buildPath(point);
          this.drawPath();

          delete this.inputPhase;
        },

        buildPath: function(pos) {
          if (this.inputPhase == Module.InputPhase.Begin)
            this.smoothener.reset();

          var pathBuilderValue = isNaN(this.pressure)?Date.now() / 1000:this.pressure;

          var pathPart = this.pathBuilder.addPoint(this.inputPhase, pos, pathBuilderValue);
          // var pathContext = this.pathBuilder.addPathPart(pathPart);
          var smoothedPathPart = this.smoothener.smooth(pathPart, this.inputPhase == Module.InputPhase.End);
          var pathContext = this.pathBuilder.addPathPart(smoothedPathPart);

          this.pathPart = pathContext.getPathPart();
        },

        drawPath: function() {
          this.strokeRenderer.draw(this.pathPart, this.inputPhase == Module.InputPhase.End);
        },

        clear: function() {
          this.canvas.clear(this.backgroundColor);
        },

        saveImage: function () {
          var width = this.canvas.width,
              height = this.canvas.height;
          var data = this.canvas.readPixels(this.canvas.bounds);
          // Create a 2D canvas to store the result
          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext('2d');

          // Copy the pixels to a 2D canvas
          var imageData = context.createImageData(width, height);
          imageData.data.set(data);
          context.putImageData(imageData, 0, 0);
          return canvas.toDataURL();
        },

        loadImage: function(img) {
          var width = this.canvas.width,
              height = this.canvas.height;
          var image = document.createElement('img');
          image.src = img;

          var canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          var context = canvas.getContext('2d');
          context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          context.drawImage(image, 0, 0);

          var imageData = context.getImageData(0, 0, width, height);
          this.canvas.writePixels(imageData.data, this.canvas.bounds);
        }
      };

      Module.InkDecoder.getStrokeBrush = function(paint) {
        return WILL.brush;
      }

      var canvasHeight = canvas.parentElement.offsetHeight;
      if( scope.fullScreen ) {
        canvasHeight = window.innerHeight - canvas.offsetTop;
      }

      WILL.init(canvas.parentElement.offsetWidth, canvasHeight, canvas);
      _.bindAll(WILL, 'saveImage', 'loadImage');
      // Set the callback
      scope.setFn({saveImage: WILL.saveImage, loadImage: WILL.loadImage});
    }

    var directive = {
        link: link,
        restrict: 'AE',
        scope: {
          setFn: '&',
          ngModel: '=',
          fullScreen: '='
        }
    };

    return directive;
  }
}) ();

(function() {
    angular.module('ERemediumWebApp.utils.filters')
    .filter('datetime', datetime);

    datetime.$inject = ['$filter'];

    function datetime($filter) {
        return function(date, format, timezone) {
          if(angular.isDefined(date)) {
            var myDate = new Date(date);
            return $filter('date')(myDate, format, timezone)
          }
        };
    };
}) ();