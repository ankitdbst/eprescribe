'use strict';

// Declare app level module which depends on views, and components
angular.module('ERemediumWebApp', [
    'ui.router',
    'ui.bootstrap',
    'ngResource',
    'ngMessages',
    'ERemediumWebApp.patients',
    'ERemediumWebApp.reportinganalytics',
    'ERemediumWebApp.doctor_settings',
    'ERemediumWebApp.login',
    'ERemediumWebApp.prescriptions',
    'ERemediumWebApp.utils'
])

        .config(['$urlRouterProvider', function ($urlRouterProvider) {
                $urlRouterProvider.otherwise('/login');
            }]);

$(".sidebar-nav a").on("click", function () {
    $(".sidebar-nav").find(".active").removeClass("active");
    $(this).parent().addClass("active");
});