'use strict';

angular.module('ERemediumWebApp.doctor_settings', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/doctor_settings', {
    templateUrl: 'Doctor_Settings/doctor_settings.html',
    controller: 'DoctorSettingsCtrl'
  });
}])

.controller('DoctorSettingsCtrl', [function() {

}]);