(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionOrderStatusCtrl', PrescriptionOrderStatusCtrl);

    PrescriptionOrderStatusCtrl.$inject = ['$scope', '$stateParams'];

    function PrescriptionOrderStatusCtrl($scope, $stateParams) {
        $scope.patientId = $stateParams.patientId;
    }
})();