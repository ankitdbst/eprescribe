'use strict';

angular.module('ERemediumWebApp.prescription', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/prescription', {
    templateUrl: 'Prescription/prescription.html',
    controller: 'PrescriptionCtrl'
  });
}])

.controller('PrescriptionCtrl', [function() {

}]);