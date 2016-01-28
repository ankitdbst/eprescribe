(function () {
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
      'ERemediumWebApp.utils'
  ]);

  angular.module('ERemediumWebApp.routes', []);
  angular.module('ERemediumWebApp.config', []);

  // TODO: Move this to directive
  //For correctly applying Active Class on Side Menu
  $(".sidebar-nav a").on("click", function () {
      $(".sidebar-nav").find(".active").removeClass("active");
      $(this).parent().addClass("active");
  });
}) ();
