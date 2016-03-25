(function () {
    'use strict';

    angular.module('ERemediumWebApp.patients.controllers')
    .controller('PatientNewOrEditAddressCtrl', PatientNewOrEditAddressCtrl);

    PatientNewOrEditAddressCtrl.$inject = ['$scope', '$stateParams', 'Patient', '$state', '$rootScope'];

    function PatientNewOrEditAddressCtrl($scope, $stateParams, Patient, $state, $rootScope) {
      $scope.address = {};
      $scope.save = SaveAddress;

      function SaveAddress() {
        $scope.$parent.addresses.push($scope.address);
        // TODO: save to backednd
        $scope.address = {};
        $state.go('PrescriptionOrder', null, { reload: false });
      }
    }

})();