'use strict';

angular.module('ERemediumWebApp.patients', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/patients', {
    templateUrl: 'Patients/patient_profile.html',
    controller: 'PatientsCtrl'
  });
}])

.controller('PatientsCtrl', [function() {

}]);
