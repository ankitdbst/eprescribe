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
    if(inputPatientObject.midlleName == undefined) {
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

  /*
   For Auto Load a Nested View. Read More
   http://stackoverflow.com/questions/26196906/ui-router-how-to-automatically-load-a-nested-view-within-the-parent-view-as-a-de
   */
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    //save the previous state in a rootScope variable so that it's accessible from everywhere
    $rootScope.previousState = fromState;
    if(fromState.name == "PrescriptionAddMedicines" && toState.name == "PrescriptionNewOrEdit") {
        //Pass on presription.imgDiagnosis so that on back event canvas image is not lost
        toParams.prescription = {};
        toParams.prescription.imgDiagnosis = fromParams.prescription.imgDiagnosis;
    }
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
