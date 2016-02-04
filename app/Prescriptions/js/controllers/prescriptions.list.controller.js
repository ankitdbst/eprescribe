(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
            .controller('PrescriptionListCtrl', PrescriptionListCtrl);

    PrescriptionListCtrl.$inject = ['$scope', '$state', '$stateParams', '$rootScope', 'Prescription', 'Account', 'ngDialog'];

    function PrescriptionListCtrl($scope, $state, $stateParams, $rootScope, Prescription, Account, ngDialog) {
        $scope.prescriptions = $scope.$parent.prescriptions;
    }

})();