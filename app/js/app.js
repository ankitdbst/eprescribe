'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
    'ngDialog',
    'ngCookies',
    'cgBusy',
    'ERemediumWebApp.config',
    'ERemediumWebApp.routes',
    'ERemediumWebApp.patients',
    'ERemediumWebApp.reportinganalytics',
    'ERemediumWebApp.doctor_settings',
    'ERemediumWebApp.login',
    'ERemediumWebApp.prescriptions',
    'ERemediumWebApp.tasks',
    'ERemediumWebApp.utils'
])

        .run(function ($rootScope, $location, $state) {
            $rootScope.getFullName = function (inputPatientObject) {
//        alert(inputPatientObject.firstName);
                return inputPatientObject.firstName + " " + inputPatientObject.midlleName + " " + inputPatientObject.lastName;
            };

            $rootScope.getFullAddress = function (inputPatientObject) {
                return inputPatientObject.address.addressLine1 + ', ' + inputPatientObject.address.addressLine2 + ', ' + inputPatientObject.address.city + ', ' + inputPatientObject.address.state + ', ' + inputPatientObject.address.pincode;
            };

            $rootScope.go = function (path) {
                $location.path(path);
            };

            /*
             For Auto Load a Nested View. Read More
             http://stackoverflow.com/questions/26196906/ui-router-how-to-automatically-load-a-nested-view-within-the-parent-view-as-a-de
             */
            $rootScope.$on('$stateChangeSuccess', function (event, toState) {
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


angular.module('ERemediumWebApp.config', []);
angular.module('ERemediumWebApp.routes', []);