'use strict';

angular.module('ERemediumWebApp.doctor_settings', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('doctorSettings.index', {
    url: '/doctor_settings',
    templateUrl: 'Doctor_Settings/doctor_settings.html',
    controller: 'DoctorSettingsCtrl'
  });
}])

.controller('DoctorSettingsCtrl', [function() {

}]);