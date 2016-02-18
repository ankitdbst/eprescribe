(function () {
    'use strict';

    angular.module('ERemediumWebApp.prescriptions.controllers')
    .controller('PrescriptionOrderCtrl', PrescriptionOrderCtrl);

    PrescriptionOrderCtrl.$inject = ['$scope', '$state', '$stateParams', 'Prescription', 'Account'];

    function PrescriptionOrderCtrl($scope, $state, $stateParams, Prescription, Account) {
        var user = Account.getAuthenticatedAccount();
        var patientId = $stateParams.patientId;
        var prescriptionId = $stateParams.prescriptionId;

        var params = {
            user: user.mobile,
            sessionId: user.sessionId,
            pid: prescriptionId,
            columnsToGet: ""
        };

        $scope.prescription = Prescription.get(params);
        $scope.myPromise = $scope.prescription.$promise;

        $scope.prescription.$promise.then(function (prescription) {
            if (angular.isUndefined($scope.prescription.patient.alternateAddresses)) {
                $scope.prescription.patient.alternateAddresses = [];
            }
            $scope.addresses = $scope.prescription.patient.alternateAddresses;
            $scope.addresses.push($scope.prescription.patient.address);
        });

        var addresses = [];

        $scope.pharmacies = [
            "Durga Pharmacy",
            "Apollo Pharmacy",
            "Neelkanth Pharmacy"
        ];

        $scope.labs = [
            "Apollo Labs",
            "Dr Lal Labs",
            "Super Religare Labs"
        ];

        $scope.order = Order;
        $scope.close = Close;

        function Order() {
            var params = {
                user: user.mobile,
                sessionId: user.sessionId,
                patientId: patientId,
                doctorId: user.userId
            };
            $state.go('PrescriptionOrderStatus', {
              patientId: patientId,
              prescriptionId: prescriptionId
            });
        }

        function Close() {
            $state.go('PatientNewOrEdit', { patientId: patientId });
        }
    }

})();