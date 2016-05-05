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

(function() {
  'use strict'

  angular.module('ERemediumWebApp.tasks.routes')

  .config([
    '$stateProvider',
    function($stateProvider) {
      $stateProvider
      .state('TasksList', {
        url: '/tasks',
        templateUrl: 'Tasks/partials/tasks.list.html',
        controller: 'TasksListCtrl'
      })
    }
  ]);
}) ();
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

    AppointmentsIndexCtrl.$inject = ['$scope', 'Appointments', '$state', '$rootScope', 'Account', '$stateParams'];

    function AppointmentsIndexCtrl($scope, Appointments, $state, $rootScope, Account, $stateParams) {
        if (!Account.isAuthenticated()) {
            $state.go('Appointments', {signIn: true});
            return;
        }
        $scope.account = Account.getAuthenticatedAccount();

        //Initialize
        initialize();
        $scope.alertEventOnClick = function(item) {
            alert("alert event on click");
            console.log("event click");
        };
        $scope.alertOnDrop = function() {
            alert("alert on drop");
            console.log("alert on drop");
        };
        $scope.alertOnResize = function() {
            alert("alert on resize");
        };
        $scope.eventSources = {
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
                                            title: 'Event3',
                                            start: '2016-04-23:0100',
                                            end: '2016-04-23:1200'
                                        }
                                        // etc...
                                    ],
                                    color: 'yellow',   // an option!
                                    textColor: 'black' // an option!
                                };

        /* config object */
        $scope.uiConfig = {
          calendar:{
             height: "100%",
            editable: true,
            header:{
              left: 'month agendaWeek agendaDay bookAppointment',
              center: 'title',
              right: 'today prev,next'
            },
            dayClick: $scope.alertEventOnClick,
            eventDrop: $scope.alertOnDrop,
            eventResize: $scope.alertOnResize
          }
        };


        function initialize() {
            $rootScope.pageHeader = "Appointments";
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
                columnsToGet: ""
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
                $scope.patient.history = response[response.length - 1];
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
                $scope.patient.alergy = response[response.length - 1];
            });
        }

        function OpenPrescriptions() {
            $state.go('PrescriptionIndex', {
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
                            url: 'http://52.76.165.4:8400/ERService/userservice/GetUserDocumentById',
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
                $scope.patient.vital = response[response.length - 1];
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
                $scope.patient.history = response[response.length - 1];
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
                $scope.patient.alergy = response[response.length - 1];
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
                $scope.patient.vital = response[response.length - 1];
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
                $scope.patient.history = response[response.length - 1];
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
                $scope.patient.alergy = response[response.length - 1];
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


    var pid = $stateParams.prescriptionId;
    if (_.isEmpty(pid)) {
      $scope.prescription = new Prescription;
      Init();
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

    $scope.canvasIdx = 0;
    $scope.range = function(min, max, step) {
        step = step || 1;
        var input = [];
        for (var i = min; i <= max; i += step) {
            input.push(i);
        }
        return input;
    };

    $scope.dialogTitle = "New Prescription";
    $scope.canvasEnabled = user.loggedInUser.settings.canvasEnabled;
    $scope.loadCanvas = LoadCanvas;

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

    // API exposed by WILL directive
    $scope.setDirectiveFn = function(saveImageFn, loadImageFn) {
        $scope.saveImageFn = saveImageFn;
        $scope.loadImageFn = loadImageFn;
    };

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
      var medicinesWatch = $scope.$watch(watchExpr, function(newVal, oldVal) {
        if(newVal !== undefined && oldVal !== undefined) {
          var newLen = newVal.length;
          var oldLen = oldVal.length;
          if(newLen == oldLen - 1 && Object.keys(oldVal[oldLen-1]).length == 0) {
            //Time to unbind listener
            medicinesWatch();
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
        city: "Noida", //TODO: should always be default one i.e. Eremedium Pharmacy if patient is opening app, else if Doctor is opening then should display his configured pharmacies, if not configured any then should default one i.e. Eremedium Pharmacy..
        limit: 10,
        columnsToGet: ""
      }, function (response) {
        $scope.pharmacies = response;
      });
    }

    function GetLabs() {
      $scope.labs = [
        "Apollo Labs",
        "Dr Lal Labs",
        "Super Religare Labs"
      ];
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

        //Initialize
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


        //Functions

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
function initMenu(){$("#menu ul").hide(),$("#menu ul").children(".current").parent().show(),$("#menu li a").click(function(){var e=$(this).next();return e.is("ul")&&e.is(":visible")?!1:e.is("ul")&&!e.is(":visible")?($("#menu ul:visible").slideUp("normal"),e.slideDown("normal"),!1):void 0})}!function(){"use strict";angular.module("ERemediumWebApp",["ui.router","ui.bootstrap","ngResource","ngMessages","ngDialog","ngCookies","ngTouch","cgBusy","flow","ncy-angular-breadcrumb","angularResizable","ui.select","ui.calendar","ngSanitize","frapontillo.bootstrap-switch","ERemediumWebApp.config","ERemediumWebApp.routes","ERemediumWebApp.patients","ERemediumWebApp.reportinganalytics","ERemediumWebApp.doctor","ERemediumWebApp.login","ERemediumWebApp.prescriptions","ERemediumWebApp.tasks","ERemediumWebApp.utils","ERemediumWebApp.pharmacy","ERemediumWebApp.messages","ERemediumWebApp.labs","ERemediumWebApp.appointments"]).run(function(e,t,i){e.getFullName=function(e){return angular.isUndefined(e)?void 0:(void 0==e.midlleName&&(e.midlleName=""),e.firstName+" "+e.midlleName+" "+e.lastName)},e.getFullAddress=function(e){return angular.isUndefined(e)?void 0:e.address.addressLine1+", "+e.address.addressLine2+", "+e.address.city+", "+e.address.state+", "+e.address.pincode},e.getAge=function(e){var t=new Date,i=new Date(e),n=t.getFullYear()-i.getFullYear(),r=t.getMonth()-i.getMonth();return(0>r||0===r&&t.getDate()<i.getDate())&&n--,n},e.go=function(e){t.path(e)},e.getImageURL=function(e,t,i,n){var r={user:t,sessionId:i,imgIdOfUser:n};return e+"userservice/GetImage?"+$.param(r)},e.$on("$stateChangeSuccess",function(t,n,r,s,o){e.previousState=s;var a;(a=n&&n.params&&n.params.autoActivateChild)&&i.go(a)})}),$(".sidebar-nav a").on("click",function(){$(".sidebar-nav").find(".active").removeClass("active"),$(this).parent().addClass("active")}),angular.element(document).ready(function(e){e(window).scroll(function(){e(this).scrollTop()>=50?e("#return-to-top").fadeIn(200):e("#return-to-top").fadeOut(200)}),e("#return-to-top").click(function(){e("body,html").animate({scrollTop:0},500)}),e("#menu-toggle-2").click(function(){e("body,html").animate({scrollTop:0},500)})}),angular.module("ERemediumWebApp.config",[]),angular.module("ERemediumWebApp.routes",[])}(),function(){"use strict";angular.module("ERemediumWebApp.config").config(["$httpProvider",function(e){function t(e){return angular.isUndefined(e)?e:(angular.forEach(e,function(t,i){(i.startsWith("$")||"_id"===i)&&(delete e[i],console.log(i)),!angular.isUndefined(t)&&t.$cgBusyFulfilled&&delete t.$cgBusyFulfilled,!angular.isUndefined(t)&&t._id&&delete t._id}),e)}e.defaults.transformRequest.unshift(t),e.defaults.useXDomain=!0,delete e.defaults.headers.common["X-Requested-With"]}]).config(["$compileProvider",function(e){e.aHrefSanitizationWhitelist(/^\s*(https?|file|tel|ftp|mailto|javascript|chrome-extension):|data:application\//)}])}(),function(){"use strict";angular.module("ERemediumWebApp.appointments",["ERemediumWebApp.appointments.routes","ERemediumWebApp.appointments.controllers","ERemediumWebApp.appointments.services"]),angular.module("ERemediumWebApp.appointments.routes",["ui.router"]),angular.module("ERemediumWebApp.appointments.controllers",[]),angular.module("ERemediumWebApp.appointments.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.doctor",["ERemediumWebApp.doctor.routes","ERemediumWebApp.doctor.controllers","ERemediumWebApp.doctor.services"]),angular.module("ERemediumWebApp.doctor.routes",["ui.router"]),angular.module("ERemediumWebApp.doctor.controllers",[]),angular.module("ERemediumWebApp.doctor.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.labs",["ERemediumWebApp.labs.routes","ERemediumWebApp.labs.controllers","ERemediumWebApp.labs.services"]),angular.module("ERemediumWebApp.labs.routes",["ui.router"]),angular.module("ERemediumWebApp.labs.controllers",[]),angular.module("ERemediumWebApp.labs.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.messages",["ERemediumWebApp.messages.routes","ERemediumWebApp.messages.controllers","ERemediumWebApp.messages.services"]),angular.module("ERemediumWebApp.messages.routes",["ui.router"]),angular.module("ERemediumWebApp.messages.controllers",[]),angular.module("ERemediumWebApp.messages.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.patients",["ERemediumWebApp.patients.routes","ERemediumWebApp.patients.controllers","ERemediumWebApp.patients.services"]),angular.module("ERemediumWebApp.patients.routes",["ui.router"]),angular.module("ERemediumWebApp.patients.controllers",[]),angular.module("ERemediumWebApp.patients.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.pharmacy",["ERemediumWebApp.pharmacy.routes","ERemediumWebApp.pharmacy.controllers","ERemediumWebApp.pharmacy.services"]),angular.module("ERemediumWebApp.pharmacy.routes",["ui.router"]),angular.module("ERemediumWebApp.pharmacy.controllers",[]),angular.module("ERemediumWebApp.pharmacy.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.prescriptions",["ERemediumWebApp.prescriptions.routes","ERemediumWebApp.prescriptions.controllers","ERemediumWebApp.prescriptions.services","ERemediumWebApp.prescriptions.directives"]),angular.module("ERemediumWebApp.prescriptions.routes",["ui.router"]),angular.module("ERemediumWebApp.prescriptions.controllers",[]),angular.module("ERemediumWebApp.prescriptions.services",[]),angular.module("ERemediumWebApp.prescriptions.directives",[])}(),function(){"use strict";angular.module("ERemediumWebApp.reportinganalytics",["ERemediumWebApp.reportinganalytics.routes","ERemediumWebApp.reportinganalytics.controllers","ERemediumWebApp.reportinganalytics.services"]),angular.module("ERemediumWebApp.reportinganalytics.routes",["ui.router"]),angular.module("ERemediumWebApp.reportinganalytics.controllers",[]),angular.module("ERemediumWebApp.reportinganalytics.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.tasks",["ERemediumWebApp.tasks.routes","ERemediumWebApp.tasks.controllers","ERemediumWebApp.tasks.services"]),angular.module("ERemediumWebApp.tasks.routes",["ui.router"]),angular.module("ERemediumWebApp.tasks.controllers",[]),angular.module("ERemediumWebApp.tasks.services",[])}(),function(){"use strict";angular.module("ERemediumWebApp.utils",["ERemediumWebApp.utils.directives","ERemediumWebApp.utils.filters"]),angular.module("ERemediumWebApp.utils.directives",[]),angular.module("ERemediumWebApp.utils.filters",[])}(),function(){"use strict";angular.module("ERemediumWebApp.appointments.routes").config(["$stateProvider",function(e){e.state("Appointments",{url:"/book-appointment",templateUrl:"Appointments/partials/appointments.index.html",controller:"AppointmentsIndexCtrl",ncyBreadcrumb:{label:"Appointments",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.doctor.routes").config(["$stateProvider",function(e){e.state("Doctor",{url:"/doctor",templateUrl:"Doctor/partials/doctor.index.html",controller:"DoctorIndexCtrl",ncyBreadcrumb:{label:"Doctor Profile",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.labs.routes").config(["$stateProvider",function(e){e.state("Labs",{url:"/labs",templateUrl:"Labs/partials/labs.index.html",controller:"LabsIndexCtrl",ncyBreadcrumb:{label:"Labs & Imaging",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.messages.routes").config(["$stateProvider",function(e){e.state("Messages",{url:"/messages",templateUrl:"Messages/partials/messages.index.html",controller:"MessagesIndexCtrl",ncyBreadcrumb:{label:"Messages",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.patients.routes").config(["$stateProvider",function(e){e.state("PatientsList",{url:"/patients",templateUrl:"Patients/partials/patients.list.html",controller:"PatientsListCtrl",ncyBreadcrumb:{label:"Home"}}).state("PatientVerifyOTP",{url:"/patients/verifyotp/:patientId",templateUrl:"Patients/partials/patients.verify-otp.html",controller:"PatientsVerifyOTPCtrl"}).state("PatientNewOrEdit",{url:"/patients/edit/:patientId",views:{"":{templateUrl:"Patients/partials/patients.edit.html",controller:"PatientNewOrEditCtrl"},"vitals@PatientNewOrEdit":{templateUrl:"Patients/partials/patients.vitals.html",controller:"PatientsVitalsCtrl"},"clinicalNotes@PatientNewOrEdit":{templateUrl:"Patients/partials/patients.clinical-notes.html",controller:"PatientsClinicalNotesCtrl"},"documents@PatientNewOrEdit":{templateUrl:"Patients/partials/patients.documents.html",controller:"PatientsDocumentsCtrl"}},ncyBreadcrumb:{label:"Patient Profile",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.pharmacy.routes").config(["$stateProvider",function(e){e.state("Pharmacy",{url:"/pharmacy",templateUrl:"Pharmacy/partials/pharmacy.index.html",controller:"PharmacyIndexCtrl",ncyBreadcrumb:{label:"Pharmacy",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.prescriptions.routes").config(["$stateProvider",function(e){e.state("PrescriptionIndex",{url:"/patients/:patientId/prescriptions",templateUrl:"Prescriptions/partials/prescriptions.index.html",controller:"PrescriptionIndexCtrl",params:{autoActivateChild:"PrescriptionIndex.List"}}).state("PrescriptionIndex.List",{templateUrl:"Prescriptions/partials/prescriptions.list.html",controller:"PrescriptionListCtrl",ncyBreadcrumb:{label:"Prescriptions",parent:"PatientNewOrEdit"}}).state("PrescriptionIndex.Detail",{url:"/{prescriptionId:[0-9]*}",templateUrl:"Prescriptions/partials/prescriptions.detail.html",controller:"PrescriptionDetailCtrl",ncyBreadcrumb:{label:"View",parent:"PrescriptionIndex.List"}}).state("PrescriptionNewOrEdit",{url:"/patients/:patientId/prescriptions/new",templateUrl:"Prescriptions/partials/prescriptions.edit.html",controller:"PrescriptionNewOrEditCtrl",params:{prescriptionId:null},ncyBreadcrumb:{label:"New",parent:"PrescriptionIndex.List"}}).state("PrescriptionAddMedicines",{url:"/patients/:patientId/prescriptions/new/medicines",templateUrl:"Prescriptions/partials/prescriptions.edit-medicines.html",params:{prescription:null},controller:"PrescriptionEditMedicinesCtrl",ncyBreadcrumb:{label:"Add Medicines",parent:"PrescriptionNewOrEdit"}}).state("PrescriptionOrder",{url:"/patients/:patientId/prescriptions/order/:prescriptionId",templateUrl:"Prescriptions/partials/prescriptions.order.html",controller:"PrescriptionOrderCtrl",ncyBreadcrumb:{label:"Place Order",parent:"PatientNewOrEdit"}}).state("PrescriptionOrder.PatientNewOrEditAddress",{url:"/new-address",templateUrl:"Patients/partials/patients.edit-address.html",controller:"PatientNewOrEditAddressCtrl"}).state("PrescriptionOrderStatus",{url:"/patients/:patientId/prescriptions/order/status/:prescriptionId",templateUrl:"Prescriptions/partials/prescriptions.order-status.html",controller:"PrescriptionOrderStatusCtrl",ncyBreadcrumb:{label:"Order Status",parent:"PatientNewOrEdit"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.reportinganalytics.routes").config(["$stateProvider",function(e){e.state("ReportingAnalytics",{url:"/reportinganalytics",templateUrl:"ReportingAnalytics/partials/reportinganalytics.index.html",controller:"ReportingAnalyticsIndexCtrl",ncyBreadcrumb:{label:"Reporting & Analytics",parent:"PatientsList"}})}])}(),function(){"use strict";angular.module("ERemediumWebApp.tasks.routes").config(["$stateProvider",function(e){e.state("TasksList",{url:"/tasks",templateUrl:"Tasks/partials/tasks.list.html",controller:"TasksListCtrl"})}])}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){function t(t){e.data=t,angular.isUndefined(e.data)||0==e.data.respCode?(e.showAlert=!0,e.alertMessage="Invalid Credentials, Please try again!"):(c(t),l(),i.go("PatientsList"))}e.data={};var r={mobile:e.mobileNumber,password:e.password,deviceKey:""};e.myPromise=n.login(r,t)}function a(){var t=new Date;return e.rememberMe?t.setDate(t.getDate()+7):t.setDate(t.getDate()+2),t}function c(t){e.myPromise=s.get({user:t.userId,sessionId:t.sessionId,isDoctor:!0,mobile:"",columnsToGet:"settings,userType,userId,firstName,midlleName,lastName,mobile,"},function(e){t.loggedInUser=e,n.setAuthenticatedAccount(t,a())})}function l(){t.showMenu=!0,$("#loginModal").modal("hide"),$("#registerModal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove(),$("#wrapper").removeClass("hero-unit"),d(),u()}function u(){e.messagesList=new Array,t.pendingMessagesCount=e.messagesList.length}function d(){e.taskList=new Array,t.pendingTasksCount=e.taskList.length}function p(){e.showAlert=!1,t.showMenu=!1,t.pageHeader="",e.rememberMe=!0,e.mobileNumber=7838352425,e.password="123@ivp",n.logout()}function m(e){"true"==e?($("#loginModal").modal("show"),$("#registerModal").modal("hide")):($("#registerModal").modal("show"),$("#loginModal").modal("hide"))}p(),e.signIn=o,e.toggleModal=m,m(r.signIn)}angular.module("ERemediumWebApp.login",["ui.router","ngMessages","ERemediumWebApp.login.services"]).config(["$stateProvider",function(e){e.state("login",{url:"/login/:signIn",templateUrl:"Login/partials/login.html",controller:"LoginCtrl"})}]).controller("LoginCtrl",e),angular.module("ERemediumWebApp.login.services",[]),e.$inject=["$scope","$rootScope","$state","Account","$stateParams","Patient"]}(),function(){"use strict";angular.module("ERemediumWebApp.login.services").factory("Login",["$resource",function(e){var t="",i={},n={validateCredentials:{method:"POST",url:"http://52.76.165.4/ERService/userservice/ValidateCredentials"}};return e(t,i,n)}]).factory("Account",["Login","$cookies","$rootScope",function(e,t,i){function n(t,i){return e.validateCredentials(t).$promise.then(function(e){if(1==e.respCode){delete e.response,delete e.respCode;var t=angular.forEach(e,function(t,i){i.startsWith("$")&&delete e[i]});t.baseURL="http://52.76.165.4/ERService/",a(t)}angular.isDefined(i)&&i(e)})}function r(){return s(),t.getObject("eremediumaccount")}function s(){i.showMenu=!0,$("#wrapper").removeClass("hero-unit")}function o(){return!!t.get("eremediumaccount")}function a(e,i){t.putObject("eremediumaccount",e,{expires:i})}function c(){t.remove("eremediumaccount")}return{login:n,logout:c,getAuthenticatedAccount:r,setAuthenticatedAccount:a,isAuthenticated:o}}])}(),$("#menu-toggle").click(function(e){e.preventDefault(),$("#wrapper").toggleClass("toggled")}),$("#menu-toggle-2").click(function(e){e.preventDefault(),$("#wrapper").toggleClass("toggled-2"),$("#menu ul").hide()}),$(document).ready(function(){initMenu()}),function(){"use strict";function e(e,t,i,n,r,s){function o(){n.pageHeader="Appointments"}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),o(),e.alertEventOnClick=function(e){alert("alert event on click"),console.log("event click")},e.alertOnDrop=function(){alert("alert on drop"),console.log("alert on drop")},e.alertOnResize=function(){alert("alert on resize")},e.eventSources={events:[{title:"Event1",start:"2016-04-04"},{title:"Event2",start:"2016-04-23"},{title:"Event3",start:"2016-04-23:0100",end:"2016-04-23:1200"}],color:"yellow",textColor:"black"},void(e.uiConfig={calendar:{height:"100%",editable:!0,header:{left:"month agendaWeek agendaDay bookAppointment",center:"title",right:"today prev,next"},dayClick:e.alertEventOnClick,eventDrop:e.alertOnDrop,eventResize:e.alertOnResize}})):void i.go("Appointments",{signIn:!0})}angular.module("ERemediumWebApp.appointments.controllers").controller("AppointmentsIndexCtrl",e),e.$inject=["$scope","Appointments","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";angular.module("ERemediumWebApp.appointments.services").factory("Appointments",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.showAlert=!1,n.pageHeader="Doctor Profile",c(!1),f()}function c(t){e.passwordSectionUpdate=t,e.summarySectionUpdate=t,e.clinicSectionUpdate=t,e.servicesSectionUpdate=t,e.professionalDetailsSectionUpdate=t}function l(){e.summarySectionUpdate=!0}function u(){e.summarySectionUpdate=!1}function d(){e.passwordSectionUpdate=!0}function p(){e.passwordSectionUpdate=!1}function m(n){var r={user:e.doctor.doctorId,newPassword:e.doctor.password};e.myPromise=t.changePassword(r,function(t){e.showAlert=!0,e.section=n,angular.isUndefined(t)?(e.alertMessage="Error in saving "+n+", Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage=n+" Saved Successfully!",e.alertClass="alert-success",i.go("login",{signIn:!0})):(e.alertMessage=t.response,e.alertClass="alert-danger")})}function g(n){e.doctor.userType="doctor";var r={user:e.account.userId,sessionId:e.account.sessionId,doctorId:"",patientId:"",userMap:e.doctor};e.myPromise=t.saveProfile(r,function(t){e.showAlert=!0,e.section=n,angular.isUndefined(t)?(e.alertMessage="Error in saving "+n+", Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage=n+" Saved Successfully!",e.alertClass="alert-success","Settings"==n&&i.go("login",{signIn:!0}),e.doctor=t.doctor,c(!1)):(e.alertMessage=t.response,e.alertClass="alert-danger")})}function f(){e.myPromise=t.getProfile({user:e.account.userId,sessionId:e.account.sessionId,isDoctor:!0,mobile:"",columnsToGet:""},function(t){e.doctor=t,void 0==e.doctor.settings&&(e.doctor.settings={}),void 0==e.doctor.settings.canvasEnabled&&(e.doctor.settings.canvasEnabled=!0),void 0==e.doctor.settings.twoFactorAuthentication&&(e.doctor.settings.twoFactorAuthentication=!1)})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),a(),e.upsertUser=g,e.changePassword=m,e.showSummarySection=l,e.closeSummarySection=u,e.showPasswordSection=d,e.closePasswordSection=p,e.uploader={},void(e.handleUpload=function(t,i,n){angular.forEach(n.files,function(t,i){var n=new FileReader;n.onload=function(t){var i=t.target.result;e.doctor.profileImageURL=i,g("Photo")},n.readAsDataURL(t.file)})})):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.doctor.controllers").controller("DoctorIndexCtrl",e),e.$inject=["$scope","Doctor","$state","$rootScope","Account","$stateParams","ngDialog"]}(),function(){"use strict";angular.module("ERemediumWebApp.doctor.services").factory("Doctor",["$resource",function(e){var t="",i={},n={getProfile:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserById",isArray:!1},saveProfile:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"},changePassword:{method:"POST",url:"http://52.76.165.4/ERService/userservice/SetPassword"}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){n.pageHeader="Lab & Imaging"}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),void o()):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.labs.controllers").controller("LabsIndexCtrl",e),e.$inject=["$scope","Labs","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";angular.module("ERemediumWebApp.labs.services").factory("Labs",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){n.pageHeader="Messages",e.selectedChoice="allPatients",e.patient={},e.patient.selected=void 0}function c(){e.selectedChoice="partialAll"}function l(e,t){return e.map(function(e){return e[t]}).join(",")}function u(){var i={user:e.account.userId,sessionId:e.account.sessionId,to:"partialAll"==e.selectedChoice?l(e.patient.selected,"mobile"):"",toType:e.selectedChoice,msg:e.smsText,channel:"sms"};e.myPromise=t.sendSMS(i,function(t){e.showAlert=!0,angular.isUndefined(t)?(e.alertMessage="Error in sending Message, Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage=t.response,e.alertClass="alert-success"):(e.alertMessage=t.response,e.alertClass="alert-danger")})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),a(),e.sendSMS=u,e.focusSelectPatients=c,e.patientList=o.query({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,limit:"",columnsToGet:"firstName,midlleName,lastName,mobile"},function(t){e.patientList=t}),void(e.myPromise=e.patientList.$promise)):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.messages.controllers").controller("MessagesIndexCtrl",e),e.$inject=["$scope","Messages","$state","$rootScope","Account","$stateParams","Patient"]}(),function(){"use strict";angular.module("ERemediumWebApp.messages.services").factory("Messages",["$resource",function(e){var t="",i={},n={sendSMS:{method:"POST",url:"http://52.76.165.4/ERService/communicationservice/SendSMS"},getDeliveryReport:{method:"POST",url:"http://52.76.165.4/ERService/communicationservice/GetDeliveryReport",isArray:!0}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.sortType="",e.sortReverse=!1,d()}function c(t){e.clinicalNote={},e.clinicalNote.date=new Date,e.readOnly=!1;var i=s.open({template:"Patients/partials/patients.upsert-clinical-note.html",className:"ngdialog-theme-default custom-width-1",scope:e,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PatientUpsertClinicalNotesCtrl"});i.closePromise.then(function(t){"Add"!=t.value&&"View"!=t.value||(e.account.loggedInUser.settings.canvasEnabled&&(e.clinicalNote.img=e.saveImageFn()),u("ClinicalNote","userClinicalNote"))})}function l(i){t.getPeripheralDetailsById({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:o.patientId,detailType:"userClinicalNote",did:i.did,columnsToGet:""},function(t){e.clinicalNote=t,e.readOnly=!0,s.open({template:"Patients/partials/patients.upsert-clinical-note.html",className:"ngdialog-theme-default custom-width-1",scope:e,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PatientUpsertClinicalNotesCtrl"})})}function u(i,n){if(angular.isUndefined(e.patient.patientId))return e.showAlert=!0,e.section=i,e.alertMessage="Please create Patient before saving "+i+"!",void(e.alertClass="alert-danger");var r={user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:e.patient.patientId,detailType:n,userDetail:e.clinicalNote};e.myPromise=t.upsertPeripheralDetails(r,function(t){e.showAlert=!0,e.section=i,angular.isUndefined(t)?(e.alertMessage="Error in saving Patient's "+i+", Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage="Patient's "+i+" Saved Successfully!",e.alertClass="alert-success",d()):(e.alertMessage=t.response,e.alertClass="alert-danger")})}function d(){t.getPeripheralDetails({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:o.patientId,detailType:"userClinicalNote",columnsToGet:"did,date"},function(t){e.clinicalNotesList=t})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),a(),e.upsertClinicalNotes=c,e.openClinicalNote=l,void(e.setDirectiveFn=function(t){e.saveImageFn=t})):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.patients.controllers").controller("PatientsClinicalNotesCtrl",e),e.$inject=["$scope","Patient","$state","$rootScope","Account","ngDialog","$stateParams"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.sortType="",e.sortReverse=!1,d()}function c(t){e.document={},e.document.date=new Date,e.readOnly=!1;var i=s.open({template:"Patients/partials/patients.upsert-document.html",className:"ngdialog-theme-default custom-width-1",scope:e,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PatientUpsertDocumentsCtrl"});i.closePromise.then(function(e){"Add"!=e.value&&"View"!=e.value||u("Document","userDcoument")})}function l(i){t.getDocumentById({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:o.patientId,detailType:"userDcoument",did:i.did,columnsToGet:""},function(t){e.document=t,e.readOnly=!0,s.open({template:"Patients/partials/patients.upsert-document.html",className:"ngdialog-theme-default custom-width-1",scope:e,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PatientUpsertDocumentsCtrl"})})}function u(i,n){if(angular.isUndefined(e.patient.patientId))return e.showAlert=!0,e.section=i,e.alertMessage="Please create Patient before saving "+i+"!",void(e.alertClass="alert-danger");var r={user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:e.patient.patientId,detailType:n,userDocument:e.document};e.myPromise=t.upsertDocument(r,function(t){e.showAlert=!0,e.section=i,angular.isUndefined(t)?(e.alertMessage="Error in saving Patient's "+i+", Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage="Patient's "+i+" Saved Successfully!",e.alertClass="alert-success",d()):(e.alertMessage=t.response,e.alertClass="alert-danger")})}function d(){t.getDocuments({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:o.patientId,detailType:"userDcoument",columnsToGet:"did,date,documentName,tag"},function(t){e.documentsList=t})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),a(),e.upsertDocuments=c,e.openDocument=l,void(e.uploader={})):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.patients.controllers").controller("PatientsDocumentsCtrl",e),e.$inject=["$scope","Patient","$state","$rootScope","Account","ngDialog","$stateParams"]}(),function(){"use strict";function e(e,t,i,n,r){function s(){e.$parent.order.address=e.address,e.$parent.addresses.push(e.address),e.address={},n.go("PrescriptionOrder",null,{reload:!1})}e.address={},e.save=s}angular.module("ERemediumWebApp.patients.controllers").controller("PatientNewOrEditAddressCtrl",e),e.$inject=["$scope","$stateParams","Patient","$state","$rootScope"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.showAlert=!1,e.genders=["Male","Female"],e.relationshiptypes=["None","Daughter","Son","Wife","Father","Mother","Grand Father","Grand Mother","Brother","Sister","Others"],r.pageHeader="Patient Profile",e.bloodgroups=["None","A+","A-","A Unknown","B+","B-","B Unknown","AB+","AB-","AB Unknown","O+","O-","O Unknown"],""==t.patientId?(e.patient={},e.patient.history={},e.patient.alergy={},e.patient.address={},e.patient.age={},e.patient.isUpdate=!1,e.patient.sex="Male",e.patient.relation="None",e.patient.bloodgroup="None",e.patient.hasFullAccess=!0,e.patient.password="",e.patient.parentId="",e.patient.dependants=[],e.patient.status="WaitingOTP",c(!0)):(m(),c(!1))}function c(t){e.identifyingDetailsSectionUpdate=t,e.historySectionUpdate=t,e.allergiesSectionUpdate=t}function l(t){e.patient.userType="patient",e.patient.isDependant="None"==e.patient.relation?"false":"true",e.patient.isUpdate=!0,void 0==e.patient.age&&(e.patient.age={}),e.patient.age.year=r.getAge(e.patient.dob),p(t)}function u(t,n){if(angular.isUndefined(e.patient.patientId))return e.showAlert=!0,e.section=t,e.alertMessage="Please create Patient before saving "+t+"!",void(e.alertClass="alert-danger");var r={user:I.userId,sessionId:I.sessionId,doctorId:I.userId,patientId:e.patient.patientId,detailType:n,userDetail:"userHistory"==n?e.patient.history:e.patient.alergy};e.myPromise=i.upsertPeripheralDetails(r,function(i){e.showAlert=!0,e.section=t,angular.isUndefined(i)?(e.alertMessage="Error in saving Patient's "+t+", Please try again!",e.alertClass="alert-danger"):1==i.respCode?(e.alertMessage="Patient's "+t+" Saved Successfully!",e.alertClass="alert-success",c(!1)):(e.alertMessage=i.response,e.alertClass="alert-danger")})}function d(t){return angular.isUndefined(e.patient.patientId)?(e.showAlert=!0,e.section=t,e.alertMessage="Please create Patient before saving "+t+"!",void(e.alertClass="alert-danger")):void p(t)}function p(t){var n={user:I.userId,sessionId:I.sessionId,doctorId:I.userId,patientId:e.patient.patientId,userMap:e.patient};e.myPromise=i.upsert(n,function(i){e.showAlert=!0,e.section=t,angular.isUndefined(i)?(e.alertMessage="Error in saving Patient's "+t+", Please try again!",e.alertClass="alert-danger",e.patient.isUpdate=!1):1==i.respCode?(e.alertMessage="Patient's "+t+" Saved Successfully!",e.alertClass="alert-success",e.patient=i.patient,e.patient.dob&&(e.patient.dob=new Date(e.patient.dob)),c(!1)):(e.alertMessage=i.response,e.alertClass="alert-danger",e.patient.isUpdate=!1)})}function m(){e.myPromise=i.get({user:t.patientId,sessionId:I.sessionId,isDoctor:!1,mobile:"",columnsToGet:"sex,modifiedBy,userType,patientId,parentId,hasFullAccess,dependants,bloodgroup,age,userId,midlleName,firstName,isUpdate,searchCol,lastName,status,relation,modifiedDate,creationDate,createdBy,landlineNumber,address,email,dob,isDependant,mobile,alternateMobileNumber"},function(t){e.patient=t,e.imageURL=r.getImageURL(I.baseURL,I.userId,I.sessionId,e.patient.patientId),e.patient.dob=new Date(e.patient.dob),g(),f()})}function g(){i.getPeripheralDetails({user:I.userId,sessionId:I.sessionId,doctorId:I.userId,patientId:t.patientId,detailType:"userHistory",columnsToGet:""},function(t){e.patient.history=t[t.length-1]})}function f(){i.getPeripheralDetails({user:I.userId,sessionId:I.sessionId,doctorId:I.userId,patientId:t.patientId,detailType:"userAllergy",columnsToGet:""},function(t){e.patient.alergy=t[t.length-1]})}function h(){n.go("PrescriptionIndex",{patientId:t.patientId})}function v(){n.go("PatientVerifyOTP",{patientId:t.patientId})}if(!s.isAuthenticated())return void n.go("login",{signIn:!0});var I=s.getAuthenticatedAccount();e.account=I,a(),e.savePatientProfile=l,e.savePatientPeripheralDetails=u,e.openPrescriptions=h,e.getAllPrescriptionsAccess=v,e.uploader={},e.handleUpload=function(t,i,n){angular.forEach(n.files,function(t,i){var n=new FileReader;n.onload=function(t){var i=t.target.result;e.patient.profileImageURL=i,d("Photo")},n.readAsDataURL(t.file)})}}angular.module("ERemediumWebApp.patients.controllers").controller("PatientNewOrEditCtrl",e),e.$inject=["$scope","$stateParams","Patient","$state","$rootScope","Account","ngDialog"]}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){e.showAlert=!1,n.pageHeader="Patients",e.patient={},e.patient.search="",a()}function a(){e.patientList=t.query({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,limit:50,columnsToGet:"firstName,midlleName,lastName,sex,age,mobile,email,patientId"},function(t){e.patientList=t}),e.myPromise=e.patientList.$promise}function c(){i.go("PatientNewOrEdit")}function l(){e.searchPatientResults=t.search({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,searchText:e.patient.search,limit:50,columnsToGet:"firstName,midlleName,lastName,sex,age,mobile,email,patientId"},function(t){angular.isUndefined(t)||""==t?(e.showAlert=!0,e.alertMessage="No Patient found with details: "+e.patient.search+"!"):(e.showAlert=!1,e.patientList=t)}),e.myPromise=e.searchPatientResults.$promise}function u(e){i.go("PatientNewOrEdit",{patientId:e.patientId})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),o(),e.search=l,e.createPatientProfile=c,e.openPatientProfile=u,void(e.getPatientList=a)):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.patients.controllers").controller("PatientsListCtrl",e),e.$inject=["$scope","Patient","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){e.canvasEnabled=a.loggedInUser.settings.canvasEnabled,e.clinicalNote=e.$parent.clinicalNote,e.directiveFn=e.$parent.directiveFn,e.saveBtnName=e.readOnly?"View":"Add"}if(!r.isAuthenticated())return void i.go("login",{signIn:!0});var a=r.getAuthenticatedAccount();o()}angular.module("ERemediumWebApp.patients.controllers").controller("PatientUpsertClinicalNotesCtrl",e),e.$inject=["$scope","$stateParams","$state","Patient","Account","$rootScope"]}(),function(){"use strict";
function e(e,t,i,n,r){function s(){e.document=e.$parent.document,e.saveBtnName=e.readOnly?"View":"Add"}if(!r.isAuthenticated())return void i.go("login",{signIn:!0});r.getAuthenticatedAccount();s(),e.uploader={},e.handleUpload=function(t,i,n){angular.forEach(n.files,function(t,i){var n=new FileReader;n.onload=function(t){var i=t.target.result;e.document.img=i},e.document.documentName=t.name,n.readAsDataURL(t.file)})}}angular.module("ERemediumWebApp.patients.controllers").controller("PatientUpsertDocumentsCtrl",e),e.$inject=["$scope","$stateParams","$state","Patient","Account"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.vital=e.$parent.vital,e.saveBtnName=_.isEmpty(e.vital)?"Add":"Update"}if(!s.isAuthenticated())return void n.go("login",{signIn:!0});s.getAuthenticatedAccount();a()}angular.module("ERemediumWebApp.patients.controllers").controller("PatientUpsertVitalCtrl",e),e.$inject=["$scope","$stateParams","Patient","$state","$rootScope","Account","ngDialog"]}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){n.pageHeader="",$("#verifyOTPModal").modal("show"),a()}function a(){e.myPromise=t.get({user:s.patientId,sessionId:e.account.sessionId,isDoctor:!1,mobile:"",columnsToGet:""},function(t){e.patient=t,c()})}function c(){var i={user:e.account.userId,sessionId:e.account.sessionId,otpType:"all",toType:"patient",toId:s.patientId,channel:"sms"};e.myPromise=t.generateOTP(i,function(t){angular.isUndefined(t)?(e.alertMessage="Error in generating OTP, Please refresh the page!",e.showAlert=!0):1==t.respCode?(e.showAlert=!1,e.alertMessage=t.response+" with Reference Number: "+t.refNumber+". Please enter received OTP to proceed."):(e.alertMessage=t.response,e.showAlert=!0)})}function l(){var n={user:e.account.userId,sessionId:e.account.sessionId,otp:e.otp,otpType:"all",patientId:s.patientId,doctorId:e.account.userId};e.myPromise=t.verifyOTP(n,function(t){angular.isUndefined(t)?(e.alertMessage="Error in verifying OTP, Please try again!",e.showAlert=!0):1==t.respCode?(d(),i.go("PatientNewOrEdit",{patientId:s.patientId},{reload:!0})):(e.alertMessage=t.response+". Please enter correct OTP.",e.showAlert=!0)})}function u(){d(),i.go("PatientNewOrEdit",{patientId:s.patientId},{reload:!0})}function d(){$("#verifyOTPModal").modal("hide"),$("body").removeClass("modal-open"),$(".modal-backdrop").remove()}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),o(),e.verifyOTP=l,e.close=u,void(e.generateOTP=c)):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.patients.controllers").controller("PatientsVerifyOTPCtrl",e),e.$inject=["$scope","Patient","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.sortType="",e.sortReverse=!1,u()}function c(t){e.vital=_.isUndefined(t)?{}:_.clone(e.vitalList[t]),e.vital.dateTime=new Date;var i=s.open({template:"Patients/partials/patients.upsert-vital.html",className:"ngdialog-theme-default custom-width-1",scope:e,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PatientUpsertVitalCtrl"});i.closePromise.then(function(e){"Add"!=e.value&&"Update"!=e.value||l("Vitals","userVitals")})}function l(i,n){if(angular.isUndefined(e.patient.patientId))return e.showAlert=!0,e.section=i,e.alertMessage="Please create Patient before saving "+i+"!",void(e.alertClass="alert-danger");var r={user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:e.patient.patientId,detailType:n,userDetail:e.vital};delete e.patient._id,e.myPromise=t.upsertPeripheralDetails(r,function(t){e.showAlert=!0,e.section=i,angular.isUndefined(t)?(e.alertMessage="Error in saving Patient's "+i+", Please try again!",e.alertClass="alert-danger"):1==t.respCode?(e.alertMessage="Patient's "+i+" Saved Successfully!",e.alertClass="alert-success",u()):(e.alertMessage=t.response,e.alertClass="alert-danger")})}function u(){t.getPeripheralDetails({user:e.account.userId,sessionId:e.account.sessionId,doctorId:e.account.userId,patientId:o.patientId,detailType:"userVitals",columnsToGet:""},function(t){e.vitalList=t})}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),a(),void(e.upsertVitals=c)):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.patients.controllers").controller("PatientsVitalsCtrl",e),e.$inject=["$scope","Patient","$state","$rootScope","Account","ngDialog","$stateParams"]}(),function(){"use strict";angular.module("ERemediumWebApp.patients.services").factory("Patient",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"},upsertPeripheralDetails:{method:"POST",url:"http://52.76.165.4/ERService/userservice/InsertUserHistory"},search:{method:"POST",url:"http://52.76.165.4/ERService/userservice/SearchUser",isArray:!0},get:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserById",isArray:!1},query:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUsersForDoctor",isArray:!0},getPeripheralDetails:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserHistory",isArray:!0},getPeripheralDetailsById:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserHistoryById",isArray:!1},getDocuments:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserDocument",isArray:!0},upsertDocument:{method:"POST",url:"http://52.76.165.4/ERService/userservice/InsertUserDocument"},getDocumentById:{method:"POST",url:"http://52.76.165.4:8400/ERService/userservice/GetUserDocumentById",isArray:!1},generateOTP:{method:"POST",url:"http://52.76.165.4/ERService/communicationservice/GenerateOTP",isArray:!1},verifyOTP:{method:"POST",url:"http://52.76.165.4/ERService/communicationservice/VerifyOTP",isArray:!1}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){n.pageHeader="Pharmacy"}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),void o()):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.pharmacy.controllers").controller("PharmacyIndexCtrl",e),e.$inject=["$scope","Pharmacy","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";angular.module("ERemediumWebApp.pharmacy.services").factory("Pharmacy",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"}};return e(t,i,n)}])}(),function(){"use strict";function e(e){function t(e,t,i){e.editable=!1,i.editable&&(e.editable=!0),e.type=i.type}var i={link:t,restrict:"E",templateUrl:function(e,t){return"Prescriptions/partials/prescriptions."+t.type+"s.html"},controller:"PrescriptionItemsCtrl",scope:{prescription:"=prescription"}};return i}angular.module("ERemediumWebApp.prescriptions.directives").directive("items",e),e.$inject=["$rootScope"]}(),function(){"use strict";function e(e){function t(e,t,i){}var i={link:t,restrict:"E",transclude:!0,templateUrl:function(e,t){return"Prescriptions/partials/prescriptions."+t.type+".html"}};return i}angular.module("ERemediumWebApp.prescriptions.directives").directive("navbar",e),e.$inject=["$rootScope"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.canvasEnabled=p.loggedInUser.settings.canvasEnabled,e.$parent.detailView=t.prescriptionId,e.patient={},c(),l(),u(),d()}function c(){var n={user:p.loggedInUser.mobile,sessionId:p.sessionId,pid:t.prescriptionId,columnsToGet:""};e.prescription=i.get(n),e.myPromise=e.prescription.$promise}function l(){o.getPeripheralDetails({user:p.userId,sessionId:p.sessionId,doctorId:p.userId,patientId:t.patientId,detailType:"userVitals",columnsToGet:""},function(t){e.patient.vital=t[t.length-1]})}function u(){o.getPeripheralDetails({user:p.userId,sessionId:p.sessionId,doctorId:p.userId,patientId:t.patientId,detailType:"userHistory",columnsToGet:""},function(t){e.patient.history=t[t.length-1]})}function d(){o.getPeripheralDetails({user:p.userId,sessionId:p.sessionId,doctorId:p.userId,patientId:t.patientId,detailType:"userAllergy",columnsToGet:""},function(t){e.patient.alergy=t[t.length-1]})}if(!n.isAuthenticated())return void r.go("login",{signIn:!0});var p=n.getAuthenticatedAccount();a()}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionDetailCtrl",e),e.$inject=["$scope","$stateParams","Prescription","Account","$state","$rootScope","Patient"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.templates={},e.patient={},u(),d(),p()}function c(){var n={user:m.userId,sessionId:m.sessionId,prescription:e.prescription};["medcines","advises"].forEach(function(t){var i=e.prescription[t].length;(_.isEmpty(e.prescription[t][i-1])||1==Object.keys(e.prescription[t][i-1]).length)&&e.prescription[t].pop()}),e.myPromise=t.upsert(n,function(e){_.isEqual(e.respCode,1)?s.go("PrescriptionIndex.Detail",{prescriptionId:e.pid,patientId:i.patientId}):console.log(e)})}function l(){r.open({template:"Prescriptions/partials/prescriptions.template-name-dialog.html",className:"ngdialog-theme-default",scope:e,showClose:!0,closeByEscape:!1,closeByDocument:!1,controller:function(e,t,i,n){function r(){var n={user:o.userId,sessionId:o.sessionId,isTemplate:"true",templateName:e.template_name,prescription:e.prescription};["medcines","advises"].forEach(function(t){var i=e.prescription[t].length;(_.isEmpty(e.prescription[t][i-1])||1==Object.keys(e.prescription[t][i-1]).length)&&e.prescription[t].pop()}),e.myPromise=i.upsert(n,function(i){_.isEqual(i.respCode,1)?(e.closeThisDialog({state:"saved",data:i.pid}),s.go("PrescriptionIndex.Detail",{prescriptionId:i.pid,patientId:t.patientId})):console.log(i)})}var o=n.getAuthenticatedAccount();e.saveAsTemplate=r}})}function u(){o.getPeripheralDetails({user:m.userId,sessionId:m.sessionId,doctorId:m.userId,patientId:i.patientId,detailType:"userVitals",columnsToGet:""},function(t){e.patient.vital=t[t.length-1]})}function d(){o.getPeripheralDetails({user:m.userId,sessionId:m.sessionId,doctorId:m.userId,patientId:i.patientId,detailType:"userHistory",columnsToGet:""},function(t){e.patient.history=t[t.length-1]})}function p(){o.getPeripheralDetails({user:m.userId,sessionId:m.sessionId,doctorId:m.userId,patientId:i.patientId,detailType:"userAllergy",columnsToGet:""},function(t){e.patient.alergy=t[t.length-1]})}if(e.prescription=i.prescription,!n.isAuthenticated())return void s.go("login",{signIn:!0});var m=n.getAuthenticatedAccount();a(),e.save=c,e.templateNameDialog=l;var g={user:m.loggedInUser.mobile,sessionId:m.sessionId,doctorId:m.userId,columnsToGet:"",limit:1e3};e.templateList=t.getTemplates(g,function(t){for(var i=0;i<e.templateList.length;i++)i%2==0&&(e.templateList[i].favourite=!0)}),e.getTemplateName=function(e){return e.templateName},e.templateAdded=function(t){["medcines","advises"].forEach(function(i){var n=e.prescription[i].length,r=0;for(r=0;r<t[i].length;r++)e.prescription[i][n-1+r]=t[i][r];t[i].length>0&&e.prescription[i].push({})})},e.firstLetterGroupFn=function(e){},e.templateRemoved=function(t){["medcines","advises"].forEach(function(i){var n,r;for(n=0;n<t[i].length;n++)for(r=0;r<e.prescription[i].length;r++)t[i][n]==e.prescription[i][r]&&e.prescription[i].splice(r,1)})}}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionEditMedicinesCtrl",e),e.$inject=["$scope","Prescription","$stateParams","Account","ngDialog","$state","Patient"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(e,i){if(_.isUndefined(e))if(t.prescription.images[t.canvasIdx].src=t.saveImageFn(),t.canvasIdx++,t.prescription.images.push({}),_.isUndefined(i))t.loadImageFn(t.prescription.images[t.canvasIdx].src);else{var n=new Image;n.src="img/ophthalmology.png",n.onload=function(){t.loadImageFn(n.src)}}else{if(0>e||e>t.prescription.images.length-1)return;t.prescription.images[t.canvasIdx].src=t.saveImageFn(),t.canvasIdx=e,t.loadImageFn(t.prescription.images[t.canvasIdx].src)}}function c(){t.prescription.patientId=P,t.prescription.doctorId=A.userId,t.prescription.isUpdate=!1,t.prescription.medcines=[],t.prescription.advises=[],t.prescription.images=[{}],l();var e=new Date;console.log(e),e.setDate(e.getDate()+7),t.prescription.nextVisit={},t.prescription.nextVisit.date=e,console.log(t.prescription.nextVisit.date)}function l(){["medcines","advises"].forEach(function(e){var i=t.prescription[e].length;(0==i||!_.isEmpty(t.prescription[e][i-1])&&1!==Object.keys(t.prescription[e][i-1]).length)&&t.prescription[e].push({})})}function u(){var e={user:A.loggedInUser.mobile,sessionId:A.sessionId,prescription:t.prescription};["medcines","advises"].forEach(function(e){var i=t.prescription[e].length;(_.isEmpty(t.prescription[e][i-1])||1==Object.keys(t.prescription[e][i-1]).length)&&t.prescription[e].pop()}),t.myPromise=i.upsert(e,function(e){_.isEqual(e.respCode,1)?t.closeThisDialog({state:"saved",data:e.pid}):console.log(e)})}function d(){s.open({template:"Prescriptions/partials/prescriptions.template-name-dialog.html",className:"ngdialog-theme-default",scope:t,showClose:!0,closeByEscape:!1,closeByDocument:!1,controller:"PrescriptionNewOrEditCtrl"})}function p(){var e={user:A.loggedInUser.mobile,sessionId:A.sessionId,isTemplate:"true",templateName:t.templatename,prescription:t.prescription};["medcines","advises"].forEach(function(e){var i=t.prescription[e].length;(_.isEmpty(t.prescription[e][i-1])||1==Object.keys(t.prescription[e][i-1]).length)&&t.prescription[e].pop()}),t.myPromise=i.upsert(e,function(e){_.isEqual(e.respCode,1)?t.closeThisDialog({state:"saved",data:e.pid}):console.log(e)})}function m(e,i){var n,r;t.itemStr=n=e,t.itemsStr=r=e+"s",t[n]={},t.editMode=!_.isUndefined(i),t.editMode&&angular.copy(t.prescription[r][i],t[n]);var o=s.open({template:"Prescriptions/partials/prescriptions.upsert-"+n+".html",className:"ngdialog-theme-default custom-width-2",scope:t,showClose:!1,closeByEscape:!1,closeByDocument:!1,controller:"PrescriptionUpsertItemCtrl"});o.closePromise.then(function(e){"Add"==e.value?t.prescription[r].push(t[n]):"Update"==e.value&&(t.prescription[r][i]=t[n])})}function g(){t.closeThisDialog({state:"minimized"})}function f(){t.closeThisDialog({state:"closed"})}function h(){t.canvasEditable=!1}function v(){t.canvasEnabled&&(t.prescription.images[t.canvasIdx].src=t.saveImageFn()),o.go("PrescriptionAddMedicines",{patientId:n.patientId,prescription:t.prescription})}function I(e){var n={user:A.loggedInUser.mobile,sessionId:A.sessionId,doctorId:A.userId,searchText:e,limit:5,columnsToGet:""};return t.myPromise=i.searchMed(n).$promise,i.searchMed(n).$promise}e.pageHeader="Create Prescription";var P=n.patientId;if(!r.isAuthenticated())return void o.go("login",{signIn:!0});var A=r.getAuthenticatedAccount(),y=n.prescriptionId;if(_.isEmpty(y))t.prescription=new i,c();else{var b={user:A.loggedInUser.mobile,sessionId:A.sessionId,pid:y,columnsToGet:""};t.prescription=i.get(b),t.prescription.$promise.then(function(e){delete t.prescription.pid,delete t.prescription._id,t.canvasEnabled&&t.loadImageFn&&!_.isUndefined(t.canvasIdx)&&t.prescription.images.length>t.canvasIdx&&t.loadImageFn(t.prescription.images[t.canvasIdx].src),l()})}t.canvasIdx=0,t.range=function(e,t,i){i=i||1;for(var n=[],r=e;t>=r;r+=i)n.push(r);return n},t.dialogTitle="New Prescription",t.canvasEnabled=A.loggedInUser.settings.canvasEnabled,t.loadCanvas=a,t.setDirectiveFn=function(e,i){t.saveImageFn=e,t.loadImageFn=i},t.save=u,t.close=f,t.minimize=g,t.addMedicines=v,t.saveAsTemplate=p,t.templateNameDialog=d,t.search=I,t.upsertItem=m,t.closeCanvas=h}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionNewOrEditCtrl",e),e.$inject=["$rootScope","$scope","Prescription","$stateParams","Account","ngDialog","$state"]}(),function(){"use strict";function e(e,t,i,n,r,s,o){function a(){e.prescription.patientId=u,e.prescription.doctorId=d.userId,e.prescription.isUpdate=!1,e.prescription.medcines=[],e.prescription.advises=[];var t=new Date;t.setDate(t.getDate()+7),e.prescription.nextVisit={},e.prescription.nextVisit.date=moment(t).format("DD/MM/YYYY hh:mm A")}function c(){i.go("PrescriptionNewOrEdit",{patientId:s.patientId})}function l(e){i.go("PrescriptionNewOrEdit",{patientId:s.patientId,prescriptionId:e})}t.pageHeader="Prescriptions";var u=s.patientId,d=o.getAuthenticatedAccount();e.prescription=new r,a(),e.prescriptions=[],e.create=c,e.clone=l,e.minimized=!1}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionIndexCtrl",e),e.$inject=["$scope","$rootScope","$state","ngDialog","Prescription","$stateParams","Account"]}(),function(){"use strict";function e(e,t,i,n){function r(){var t=e.type+"s";e.prescription[t].push({})}function s(i){if(void 0==i||""==i){var n={user:a.loggedInUser.mobile,sessionId:a.sessionId,doctorId:a.userId,limit:5,columnsToGet:""};return e.myPromise=t.getFavouriteMed(n).$promise,t.getFavouriteMed(n).$promise}var n={user:a.loggedInUser.mobile,sessionId:a.sessionId,doctorId:a.userId,searchText:i,limit:5,columnsToGet:""};return e.myPromise=t.searchMed(n).$promise,t.searchMed(n).$promise}function o(t){var i=e.type+"s";e.prescription[i].splice(t,1)}if(!i.isAuthenticated())return void n.go("login",{signIn:!0});var a=i.getAuthenticatedAccount();e.dispenseUnits=["Tablet","Bottle","Injection"],e.dosageUnits=["tablet","ml","mg"],e.instructions=["SOS","After Breakfast","After Defecation","After Dinner","After Lunch","After Meals","At Bed Time","Before Breakfast","Before Dinner","Before Lunch","Before Meals","In Between Food","On Empty Stomach","With Hot Water","With Milk","With Warm Water","With Water"],e.days=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],e.times=["Morning","Afternoon","Night"],e.favorites=["Crocin","Glycomed","Disprin","Combiflam","Asprin","Zandu Bam","Digene"],e.dosages=["N/A","0 - 0 - 1","0 - 0 - 2","0 - 0 - 3","0 - 1 - 0","0 - 1 - 1","0 - 2 - 2","0 - 3 - 3","1 - 0 - 0","1 - 0 - 1","1 - 1 - 0","1 - 1 - 1","1 - 1 - 1 - 1","2 - 0 - 2","2 - 2 - 0","2 - 2 - 2","2 - 2 - 2 - 2","3 - 0 - 0","3 - 0 - 3","3 - 3 - 0","3 - 3 - 3","3 - 3 - 3 - 3"],e.advises=["Absolute Eosinophil Count","ACTH Stimulation Test","Alpha Fetoprotien (Adult)","Amlicor MTB Test","Anti-LA Antibody","Anti-Double Stranded DNA AntiBody"],e["delete"]=o,e.add=r,e.search=s,e.flag=1,e.days=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],e.times=["Morning","Afternoon","Night"];var c=e.$watch("type",function(t){if(console.log("Item str: "+t),!_.isUndefined(t)){var i="prescription."+t+"s",n=e.$watch(i,function(e,t){if(void 0!==e&&void 0!==t){var i=e.length,s=t.length;if(i==s-1&&0==Object.keys(t[s-1]).length)return void n();Object.keys(e[i-1]).length>1&&r()}},!0);c()}})}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionItemsCtrl",e),e.$inject=["$scope","Prescription","Account","$state"]}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){m||(m=!0,u.limit+=d*p,e.myPromise=i.list(u,function(t){e.prescriptions=t,m=!1}).$promise,d++)}function a(t){e.prescriptions.splice(t,1)}if(!n.isAuthenticated())return void r.go("login",{signIn:!0});var c=n.getAuthenticatedAccount(),l=t.patientId;e.$parent.detailView=null,e.prescriptions=e.$parent.prescriptions,e.detail=function(e){r.go("PrescriptionIndex.Detail",{prescriptionId:e})},e.canvasEnabled=c.loggedInUser.settings.canvasEnabled,e.sortSearchResultsReverse=!1,e.sortSearchResultsType="",e.doctorName=s.getFullName(c.loggedInUser);var u={user:c.loggedInUser.mobile,sessionId:c.sessionId,doctorId:c.userId,patientId:l,columnsToGet:"pid,creationDate,patientComplaint,diagnosis,medcines,advises",limit:15};e["delete"]=a,e.load=o;var d=0,p=15,m=!1;o()}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionListCtrl",e),e.$inject=["$scope","$stateParams","Prescription","Account","$state","$rootScope"]}(),function(){"use strict";function e(e,t,i,n){return i.isAuthenticated()?(e.account=i.getAuthenticatedAccount(),void(e.patientId=t.patientId)):void n.go("login",{signIn:!0})}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionOrderStatusCtrl",e),e.$inject=["$scope","$stateParams","Account","$state"]}(),function(){"use strict";function e(e,t,i,n,r){function s(){o(),a(),c()}function o(){var t={user:d.loggedInUser.mobile,sessionId:d.sessionId,pid:i.prescriptionId,columnsToGet:""};e.prescription=n.get(t),e.myPromise=e.prescription.$promise,e.prescription.$promise.then(function(t){angular.isUndefined(e.prescription.patient.alternateAddresses)&&(e.prescription.patient.alternateAddresses=[]),e.addresses=e.prescription.patient.alternateAddresses,e.addresses.push(e.prescription.patient.address),e.order.address=e.prescription.patient.address})}function a(){n.listPharma({user:d.userId,sessionId:d.sessionId,city:"Noida",limit:10,columnsToGet:""},function(t){e.pharmacies=t})}function c(){e.labs=["Apollo Labs","Dr Lal Labs","Super Religare Labs"]}function l(){var r={user:d.userId,sessionId:d.sessionId,doctorId:d.userId,pid:i.prescriptionId,pharmaId:e.order.pharmacy.pharmaId,deliveryAddress:{addressLine1:e.order.address.addressLine1,addressLine2:e.order.address.addressLine2,city:e.order.address.city,state:e.order.address.state,pincode:e.order.address.pincode}};e.myPromise=n.placeOrder(r,function(n){e.showAlert=!0,angular.isUndefined(n)?(e.alertMessage="Error in placing Order, Please try again!",e.alertClass="alert-danger"):1==n.respCode?t.go("PrescriptionOrderStatus",{patientId:i.patientId,prescriptionId:i.prescriptionId}):(e.alertMessage=n.response,e.alertClass="alert-danger")})}function u(){t.go("PatientNewOrEdit",{patientId:i.patientId})}if(!r.isAuthenticated())return void t.go("login",{signIn:!0});var d=r.getAuthenticatedAccount();s(),e.order=l,e.close=u}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionOrderCtrl",e),e.$inject=["$scope","$state","$stateParams","Prescription","Account"]}(),function(){"use strict";function e(e,t,i,n,r){function s(){e[l]=e.$parent[l],"medcine"===l&&(e.medcine.frequency=e.medcine.frequency||{},e.medcine.frequency.freq=e.medcine.frequency.freq||e.frequencies[0],e.medcine.frequency.dType=e.medcine.frequency.dType||e.dosageUnits[0])}function o(t){var i={user:c.loggedInUser.mobile,sessionId:c.sessionId,doctorId:c.userId,searchText:t,limit:5,columnsToGet:""};return e.myPromise=n.searchMed(i).$promise,n.searchMed(i).$promise}function a(){e.$parent.prescription[u].push(e[l]),e.$parent[l]={},s()}if(!r.isAuthenticated())return void i.go("login",{signIn:!0});var c=r.getAuthenticatedAccount();e.frequencies=["Daily","Weekly","Monthly","Custom"],e.dispenseUnits=["Tablet","Bottle","Injection"],e.dosageUnits=["tablet","ml","mg"],e.instructions=["After Breakfast","After Defecation","After Dinner","After Lunch","After Meals","At Bed Time","Before Breakfast","Before Dinner","Before Lunch","Before Meals","In Between Food","On Empty Stomach","With Hot Water","With Milk","With Warm Water","With Water"],e.days=["Mon","Tue","Wed","Thur","Fri","Sat","Sun"],e.times=["Morning","Afternoon","Night"],e.favorites=["Crocin","Glycomed","Disprin","Combiflam","Asprin","Zandu Bam","Digene"],e.advises=["Absolute Eosinophil Count","ACTH Stimulation Test","Alpha Fetoprotien (Adult)","Amlicor MTB Test","Anti-LA Antibody","Anti-Double Stranded DNA AntiBody"];var l=e.$parent.itemStr,u=e.$parent.itemsStr;e.saveBtnName=_.isEmpty(e[l])?"Add":"Update",e.dialogTitle=e.saveBtnName+" "+("medcine"===l?"Medicine":"Advise"),s(),e.search=o,e.next=a}angular.module("ERemediumWebApp.prescriptions.controllers").controller("PrescriptionUpsertItemCtrl",e),e.$inject=["$scope","$stateParams","$state","Prescription","Account"]}(),function(){"use strict";angular.module("ERemediumWebApp.prescriptions.services").factory("Prescription",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/prescription/UpsertPrescription"},list:{method:"POST",url:"http://52.76.165.4/ERService/prescription/ListPrescription",isArray:!0},get:{method:"POST",url:"http://52.76.165.4/ERService/prescription/GetPrescription"},query:{method:"GET",url:"http://52.76.165.4/ERService/prescription/SearchPrescription"},searchMed:{method:"POST",url:"http://52.76.165.4/ERService/medcineservice/MedAutocomplete",isArray:!0},listPharma:{method:"POST",url:"http://52.76.165.4/ERService/pharmaservice/ListPharma",isArray:!0},placeOrder:{method:"POST",url:"http://52.76.165.4/ERService/orderservice/Order",isArray:!1},getTemplates:{method:"POST",url:"http://52.76.165.4/ERService/prescription/ListTemplate",isArray:!0},getTemplateById:{method:"POST",url:"http://52.76.165.4/ERService/prescription/GetTemplateById",isArray:!1},getFavouriteMed:{method:"POST",url:"http://52.76.165.4/ERService/medcineservice/GetFavouriteMed",isArray:!0}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r,s){function o(){n.pageHeader="Reporting & Analytics"}return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),void o()):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.reportinganalytics.controllers").controller("ReportingAnalyticsIndexCtrl",e),e.$inject=["$scope","ReportingAnalytics","$state","$rootScope","Account","$stateParams"]}(),function(){"use strict";angular.module("ERemediumWebApp.reportinganalytics.services").factory("ReportingAnalytics",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"}};return e(t,i,n)}])}(),function(){"use strict";function e(e,t,i,n,r){return r.isAuthenticated()?(e.account=r.getAuthenticatedAccount(),n.pageHeader="Tasks",void(e.buttonText=function(e){return"Refill Request"==e?"Go to Prescription":"Lab Results"==e?"View Lab Results":"Take Action"})):void i.go("login",{signIn:!0})}angular.module("ERemediumWebApp.tasks.controllers").controller("TasksListCtrl",e),e.$inject=["$scope","Task","$state","$rootScope","Account"]}(),function(){"use strict";angular.module("ERemediumWebApp.tasks.services").factory("Task",["$resource",function(e){var t="",i={},n={upsert:{method:"POST",url:"http://52.76.165.4/ERService/userservice/UpsertUser"},get:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUserById",isArray:!1},query:{method:"POST",url:"http://52.76.165.4/ERService/userservice/GetUsersForDoctor",isArray:!0}};return e(t,i,n)}])}(),function(){"use strict";function e(){return{compile:function(e,t,i){return t.ngClick="!("+t.aDisabled+") && ("+t.ngClick+")",function(e,t,i){e.$watch(i.aDisabled,function(e){void 0!==e&&t.toggleClass("disabled",e)}),t.on("click",function(t){e.$eval(i.aDisabled)&&t.preventDefault()})}}}}angular.module("ERemediumWebApp.utils.directives").directive("aDisabled",e)}(),function(){"use strict";function e(e){function t(e,t,i){var n={useCurrent:!1},r=t.find(".date");e.$watch("ngModel",function(e){_.isEmpty(r.data("DateTimePicker"))?r.datetimepicker(n):_.isEmpty(e)||r.data("DateTimePicker").date(new Date(e))}),t.find("input").attr("placeholder",i.placeholder),t.find("input").attr("ng-change",i.ngChange),t.bind("dp.change",function(t){e.ngModel=t.date})}var i={link:t,restrict:"E",templateUrl:"Utils/partials/datetimepicker.html",scope:{ngModel:"="}};return i}angular.module("ERemediumWebApp.utils.directives").directive("datetimepicker",e),e.$inject=["$rootScope"]}(),function(){"use strict";function e(){function e(e,t,i){var n=!!("ontouchstart"in window),r=n?"touchstart":"mousedown",s=n?"touchmove":"mousemove",o=n?"touchend":"mouseup",a=i.options||{},c=document.createElement("canvas");c.id=a.canvasId,c.setAttribute("resize","");var l=document.createElement("canvas");l.id=a.tmpCanvasId,l.setAttribute("resize",""),angular.element(l).css({position:"absolute",top:0,left:0}),t.find("div").append(c),t.find("div").append(l);var u=c.getContext("2d"),d=(l.getContext("2d"),{x:0,y:0});paper.remove(),paper.setup(l),c.width=l.width,c.height=l.height;var p,m=function(e){var t=0,i=0;do isNaN(e.offsetLeft)||(t+=e.offsetTop,i+=e.offsetLeft),e=e.offsetParent;while(e);return{left:i,top:t}},g=function(e,t){n?(e.x=t.changedTouches[0].pageX-m(t.target).left,e.y=t.changedTouches[0].pageY-m(t.target).top):(e.x=void 0!==t.offsetX?t.offsetX:t.layerX,e.y=void 0!==t.offsetY?t.offsetY:t.layerY)},f=function(e){var t,i=new paper.Point(d.x,d.y);if(e){if(e.preventDefault(),g(d,e),t=new paper.Point(d.x,d.y),i.equals(t))return;var n=t.subtract(i),r=n.divide(2),s=2,o=(s/r.length,r.length),a=1,c=a*(2*o/45);r=r.multiply((s-c)/o),r.angle+=90;var l=i.add(t).divide(2),u=l.add(r),m=l.subtract(r);p.add(u),p.insert(0,m),p.smooth()}},h=function(e){g(d,e),p.add(d),p.closed=!0,l.removeEventListener(s,f,!1),u.drawImage(l,0,0),paper.project.clear()},v=function(e){e.preventDefault(),l.addEventListener(s,f,!1),g(d,e),p=new paper.Path,p.fillColor="black",p.fillCap="round",p.add(d),f()},I=function(){function t(){u=!0}function i(){u=!1}function s(){document.body.removeEventListener("mousedown",t),document.body.removeEventListener("mouseup",i)}function a(e){u&&v(e)}function c(e){u&&h(e)}if(l.addEventListener(r,v,!1),l.addEventListener(o,h,!1),!n){var u;document.body.addEventListener("mousedown",t),document.body.addEventListener("mouseup",i),e.$on("$destroy",s),l.addEventListener("mouseenter",a),l.addEventListener("mouseleave",c)}},P=function(){function t(){n.scrollTop=r}function i(){if(!_.isEmpty(e.ngModel)){var t=document.createElement("img");t.src=e.ngModel,u.clearRect(0,0,c.width,c.height),u.drawImage(t,0,0)}}var n=$("body").get(0),r=n.scrollTop;n.scrollTop=0,e.$on("$destroy",t),i(),I()};P()}var t={link:e,restrict:"AE",scope:{ngModel:"="},template:'<div class="myCanvasPaint" style="position:relative"></div>'};return t}function t(e){function t(t,i,n){var r=i;i.on("touchstart touchmove",function(e){e.preventDefault()});var s=50;e.$on("canvas.write",function(e,t){var i=$(window).height(),n=i-r.height();if(50>n-t){var o=i-(t+s);r.height(o)}})}return{link:t,restrict:"AE"}}angular.module("ERemediumWebApp.utils.directives").directive("myCanvas",e),e.$inject=[],angular.module("ERemediumWebApp.utils.directives").directive("palmReject",t),t.$inject=["$rootScope"]}(),function(e){"use strict";function t(){function e(e,n,r){n.on("click",function(){var e=document.getElementById(r.printElementId);e&&(t(e),window.print())}),window.onafterprint=function(){i.innerHTML=""}}function t(e){i.innerHTML="";var t=e.cloneNode(!0);i.appendChild(t)}var i=document.getElementById("printSection");return i||(i=document.createElement("div"),i.id="printSection",document.body.appendChild(i)),{link:e,restrict:"A"}}e.module("ERemediumWebApp.utils.directives").directive("ngPrint",t)}(window.angular),function(){"use strict";function e(e){return{restrict:"A",controller:function(e){e.spies=[],this.addSpy=function(t){e.spies.push(t)}},link:function(t,i,n){var r;r=[],t.$watch("spies",function(e){var t,n,s,o;for(o=[],n=0,s=e.length;s>n;n++)t=e[n],null==r[t.id]&&o.push(r[t.id]=i.find("#"+t.id));return o}),$(e).scroll(function(){var i,n,s,o,a,c;for(i=null,c=t.spies,o=0,a=c.length;a>o;o++)s=c[o],s.out(),void 0!==r[s.id].offset()&&(n=r[s.id].offset().top)-e.scrollY<=0&&(s.pos=n,null==i&&(i=s),i.pos<s.pos&&(i=s));return $(window).scrollTop()+$(window).height()>=$(document).height()&&(s.pos=n,i=s),null!=i?i["in"]():void 0})}}}angular.module("ERemediumWebApp.utils.directives").directive("scrollSpy",e),e.$inject=["$window"]}(),function(){"use strict";function e(e,t){return{restrict:"A",require:"^scrollSpy",link:function(i,n,r,s){n.click(function(){e.hash(r.spy),t()}),s.addSpy({id:r.spy,"in":function(){n.addClass("active")},out:function(){n.removeClass("active")}})}}}angular.module("ERemediumWebApp.utils.directives").directive("spy",e),e.$inject=["$location","$anchorScroll"]}(),function(){"use strict";function e(e){return{require:"ngModel",link:function(e,t,i,n){n.$parsers.push(function(e){return""+e}),n.$formatters.push(function(e){return parseFloat(e,10)})}}}angular.module("ERemediumWebApp.utils.directives").directive("stringToNumber",e),e.$inject=["$rootScope"]}(),function(){"use strict";function e(){this.x=void 0,this.y=void 0}function t(t){function i(i,n,r){
var s=n.get(0),o=i.ngModel,i=i,a={backgroundColor:Module.Color.WHITE,color:Module.Color.BLACK,init:function(e,t,i){this.isTouch=!!("ontouchstart"in window),this.canvasEl=i,this.initInkEngine(e,t),this.initEvents(),_.isEmpty(o)||this.loadImage(o)},initInkEngine:function(e,t){this.canvas=new Module.InkCanvas(this.canvasEl,e,t),this.canvas.clear(this.backgroundColor),this.brush=new Module.DirectBrush,this.speedPathBuilder=new Module.SpeedPathBuilder,this.speedPathBuilder.setNormalizationConfig(182,3547),this.speedPathBuilder.setPropertyConfig(Module.PropertyName.Width,.5,1.2,NaN,NaN,Module.PropertyFunction.Sigmoid,.6,!0),window.PointerEvent?(this.pressurePathBuilder=new Module.PressurePathBuilder,this.pressurePathBuilder.setNormalizationConfig(.195,.88),this.pressurePathBuilder.setPropertyConfig(Module.PropertyName.Width,2.05,34.53,.72,NaN,Module.PropertyFunction.Power,1.19,!1),this.smoothener=new Module.MultiChannelSmoothener(this.pressurePathBuilder.stride)):this.smoothener=new Module.MultiChannelSmoothener(this.speedPathBuilder.stride),this.strokeRenderer=new Module.StrokeRenderer(this.canvas,this.canvas),this.strokeRenderer.configure({brush:this.brush,color:this.color})},initEvents:function(){var e=this;window.PointerEvent?(Module.canvas.addEventListener("pointerdown",function(t){e.beginStroke(t)}),Module.canvas.addEventListener("pointermove",function(t){e.moveStroke(t)}),document.addEventListener("pointerup",function(t){e.endStroke(t)})):(Module.canvas.addEventListener("mousedown",function(t){e.beginStroke(t)}),Module.canvas.addEventListener("mousemove",function(t){e.moveStroke(t)}),document.addEventListener("mouseup",function(t){e.endStroke(t)}),window.TouchEvent&&(Module.canvas.addEventListener("touchstart",function(t){e.beginStroke(t)}),Module.canvas.addEventListener("touchmove",function(t){e.moveStroke(t)}),document.addEventListener("touchend",function(t){e.endStroke(t)})))},getOffset:function(e){var t=0,i=0;do isNaN(e.offsetLeft)||(t+=e.offsetTop,i+=e.offsetLeft),e=e.offsetParent;while(e);return{left:i,top:t}},setPointFromEvent:function(e,i){window.PointerEvent&&i instanceof PointerEvent&&(console.re.log("Pointer events supported!"),i=i.originalEvent);var n;if(this.isTouch){if(i.changedTouches[0].target.id!==this.canvasEl.id)return!1;e.x=i.changedTouches[0].pageX-this.getOffset(i.target).left,e.y=i.changedTouches[0].pageY-this.getOffset(i.target).top,n=i.changedTouches[0].clientY}else e.x=void 0!==i.offsetX?i.offsetX:i.layerX,e.y=void 0!==i.offsetY?i.offsetY:i.layerY,n=i.clientY;return t.$emit("canvas.write",n),!0},getPressure:function(e){return window.PointerEvent&&e instanceof PointerEvent&&.5!==e.pressure?e.pressure:NaN},beginStroke:function(t){var i=new e;this.setPointFromEvent(i,t),i.isValid()&&(t.preventDefault(),this.inputPhase=Module.InputPhase.Begin,this.pressure=this.getPressure(t),this.pathBuilder=isNaN(this.pressure)?this.speedPathBuilder:this.pressurePathBuilder,this.buildPath(i),this.drawPath())},moveStroke:function(t){if(this.inputPhase){var i=new e;if(this.setPointFromEvent(i,t),i.isValid()&&(t.preventDefault(),this.inputPhase=Module.InputPhase.Move,this.pointerPos=i,this.pressure=this.getPressure(t),a.frameID!=a.canvas.frameID)){var n=this;a.frameID=a.canvas.requestAnimationFrame(function(){n.inputPhase&&n.inputPhase==Module.InputPhase.Move&&(n.buildPath(n.pointerPos),n.drawPath())},!0)}}},endStroke:function(t){if(this.inputPhase){var i=new e;this.setPointFromEvent(i,t),i.isValid()&&(t.preventDefault(),this.inputPhase=Module.InputPhase.End,this.pressure=this.getPressure(t),this.buildPath(i),this.drawPath(),delete this.inputPhase)}},buildPath:function(e){this.inputPhase==Module.InputPhase.Begin&&this.smoothener.reset();var t=isNaN(this.pressure)?Date.now()/1e3:this.pressure,i=this.pathBuilder.addPoint(this.inputPhase,e,t),n=this.smoothener.smooth(i,this.inputPhase==Module.InputPhase.End),r=this.pathBuilder.addPathPart(n);this.pathPart=r.getPathPart()},drawPath:function(){this.strokeRenderer.draw(this.pathPart,this.inputPhase==Module.InputPhase.End)},clear:function(){this.canvas.clear(this.backgroundColor)},saveImage:function(){var e=this.canvas.width,t=this.canvas.height,i=this.canvas.readPixels(this.canvas.bounds),n=document.createElement("canvas");n.width=e,n.height=t;var r=n.getContext("2d"),s=r.createImageData(e,t);return s.data.set(i),r.putImageData(s,0,0),n.toDataURL()},loadImage:function(e){var t=this.canvas.width,i=this.canvas.height,n=document.createElement("img");n.src=e;var r=document.createElement("canvas");r.width=t,r.height=i;var s=r.getContext("2d");s.clearRect(0,0,this.canvas.width,this.canvas.height),s.drawImage(n,0,0);var o=s.getImageData(0,0,t,i);this.canvas.writePixels(o.data,this.canvas.bounds)}};Module.InkDecoder.getStrokeBrush=function(e){return a.brush};var c=s.parentElement.offsetHeight;i.fullScreen&&(c=window.innerHeight-s.offsetTop),a.init(s.parentElement.offsetWidth,c,s),_.bindAll(a,"saveImage","loadImage"),i.setFn({saveImage:a.saveImage,loadImage:a.loadImage})}var n={link:i,restrict:"AE",scope:{setFn:"&",ngModel:"=",fullScreen:"="}};return n}angular.module("ERemediumWebApp.utils.directives").directive("willCanvas",t),t.$inject=["$rootScope"],e.prototype.isValid=function(){return!(void 0==this.x&&void 0==this.y)}}(),function(){function e(e){return function(t,i,n){if(angular.isDefined(t)){var r=new Date(t);return e("date")(r,i,n)}}}angular.module("ERemediumWebApp.utils.filters").filter("datetime",e),e.$inject=["$filter"]}();
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
