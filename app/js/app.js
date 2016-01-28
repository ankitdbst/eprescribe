'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
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

.run(function ($rootScope) {
    $rootScope.getFullName = function (inputPatientObject) {
//        alert(inputPatientObject.firstName);
        return inputPatientObject.firstName + " " + inputPatientObject.midlleName + " " + inputPatientObject.lastName;
    };

    $rootScope.getFullAddress = function (inputPatientObject) {
        return inputPatientObject.address.addressLine1 + ', ' + inputPatientObject.address.addressLine2 + ', ' + inputPatientObject.address.city + ', ' + inputPatientObject.address.state + ', ' + inputPatientObject.address.pincode;
    };
});

//For correctly applying Active Class on Side Menu
$(".sidebar-nav a").on("click", function () {
    $(".sidebar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});

angular.module('ERemediumWebApp.config', []);
angular.module('ERemediumWebApp.routes', []);