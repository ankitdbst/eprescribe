'use strict';

angular.module('ERemediumWebApp.patients', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider
  .state('patients.index', {
    url: '/patients',
    templateUrl: 'Patients/patient_profile.html',
    controller: 'PatientsCtrl'
  });
}])

.controller('PatientsCtrl', [function() {

}]);
